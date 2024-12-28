import tempfile
import shutil
import json
from typing import Any, Dict
from fastapi import UploadFile
import PyPDF2
from .quiz_response_mock_simple import quiz_response_mock_simple
from abc import ABC, abstractmethod
from openai import OpenAI
from .quizz_example import quizz_example as quizz_example_tempalate
import os


class QuizStrategy(ABC): 

    @abstractmethod
    def generate_quiz(self, text: str, title: str, questions:int) -> Dict[str, Any]:        
        pass

    def get_initial_question(self, questions:int)->list[dict]:                  
        initial_question = [ {
                    "elements": [
                        {
                            "type": "html",
                            "html": f"Estás a punto de comenzar un cuestionario tipo Quiz. <br>Tendrás 20 segundos por cada pregunta y {int( 20* questions)} segundos para completar el cuestionario.<br>Introduce tu nombre abajo y haz clic en <b>Comenzar cuestionario</b> para empezar."
                        },
                        {
                            "type": "text",
                            "name": "nombreUsuario",
                            "titleLocation": "hidden",
                            "isRequired": f"{'true'}",
                            "maxLength": 25
                        }
                    ]
                }
        ]

        return initial_question
   
    def get_list_questions_json(self, input_string:str, questions:int)->list[dict]:
        """
            Processes a string containing a JSON and returns a list of JSON objects with the required structure,
            where each element of the 'elements' array is encapsulated under an 'elements' key.
            
            Args:
                input_string (str): A string containing a valid JSON.

            Returns:
                list: A list of JSON objects with the specified structure.
        """
        try:      
            data = json.loads(input_string)
                    
            if "elements" not in data:
                raise ValueError("El JSON no contiene la clave 'elements'.")
                
            result = self.get_initial_question(questions) + [{"elements": element} for element in data["elements"]]
            
            return result
        
        except json.JSONDecodeError as e:
            raise ValueError(f"El string proporcionado no es un JSON válido: {e}")
    
    def quizz_base_response_mock(self,title:str,pages:str,questions:int)->str:
        return f'''
        {{
            "title": "{title}",
            "showProgressBar": "bottom",
            "showTimer": true,
            "timeLimitPerPage": 20,
            "timeLimit": {int(20*questions)},
            "firstPageIsStarted": true,
            "startSurveyText": "Comenzar cuestionario",
            "pages": {pages},
            "completedHtml": "<h4>Has acertado <b>{{correctAnswers}}</b> de <b>{{questionCount}}</b> preguntas.</h4>",
            "completedHtmlOnCondition": [
                {{
                    "expression": "{{correctAnswers}} == 0",
                    "html": "<h4>Desafortunadamente, no has acertado ninguna respuesta. Inténtalo de nuevo.</h4>"
                }},
                {{
                    "expression": "{{correctAnswers}} == {{questionCount}}",
                    "html": "<h4>¡Felicidades! Has respondido correctamente a todas las preguntas.</h4>"
                }}
            ]
        }}'''


class QuizService:
    
    def __init__(self, file: UploadFile, title: str, questions:int , strategy: QuizStrategy):
        self.file = file
        self.title = title
        self.temp_file_path = None
        self.message = 'Esta seria la respuesta de GPT-3.5 Turbo FAKE'        
        self.strategy = strategy
        self.questions = questions

    def save_file_to_temp(self) -> str:        
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            shutil.copyfileobj(self.file.file, temp_file)
            self.temp_file_path = temp_file.name

        return self.temp_file_path

    def extract_text_from_pdf(self) -> str:        
        if not self.temp_file_path:
            raise ValueError("El archivo temporal no está disponible.")
        
        with open(self.temp_file_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            num_pages = len( reader.pages)
            print(f'The document has {num_pages} pages.')
            text = ''.join(page.extract_text().strip() for page in reader.pages[:5])

        return text

    def process(self) -> Dict[str, Any]:       
        try:           
            self.save_file_to_temp()
            print(f"Archivo guardado temporalmente en: {self.temp_file_path}")
                
            text = self.extract_text_from_pdf()
            print(f"Texto extraído del PDF: {text}")
        
            [self.message,quizz_json] = self.strategy.generate_quiz(text, self.title, self.questions)

            print(f"Cuestionario generado: {quizz_json}")

            return {
                "message": self.message,
                "quizz": quizz_json
            }
        except Exception as e:
            raise Exception(f"Error al procesar el archivo: {e}")




class GPTQuizStrategy(QuizStrategy):
    client = OpenAI(
        api_key =  os.environ.get("OPENAI_API_KEY", "sk-*****************"),        
    )
    quizz_example= quizz_example_tempalate

    def split_text(self,text:str, max_length:int=8000):
        words = text.split()
        chunks = []
        current_chunk = []

        for word in words:
            if len(' '.join(current_chunk)) + len(word) + 1 <= max_length:
                current_chunk.append(word)
            else:
                chunks.append(' '.join(current_chunk))
                current_chunk = [word]

        if current_chunk:
            chunks.append(' '.join(current_chunk))

        return chunks
    
    def generate_questions_from_text(self,pdf_text:str,title:str, num_questions:int=5):
        models = {
            "gpt-3.5": "gpt-3.5",
            "gpt-3.5-turbo": "gpt-3.5-turbo",
            "gpt-3.5-turbo-16k": "gpt-3.5-turbo-16k",        
            "gpt-4": "gpt-4",
        }
        fragments = self.split_text(pdf_text)
        questions_json = {
            "title": "Cuestionario generado a partir del PDF",
            "pages": []
        }

        for i, fragment in enumerate(fragments):
            prompt = f"""
                A continuación, te proporciono el contenido de un documento junto con un ejemplo del formato esperado. 
                Quiero que generes un cuestionario con {num_questions} preguntas basadas en el contenido del fragmento del documento.
                Tu tarea es devolver un JSON estructurado de forma idéntica al ejemplo proporcionado. 
                Instrucciones:
                - Cada pregunta debe ser un "element" dentro del JSON bajo la clave "elements", por lo que el JSON de respuesta tendra {num_questions} keys "elements".
                - El JSON generado debe contener exactamente {num_questions} preguntas.
                - Las preguntas deben ser relevantes al contenido proporcionado, en español, con múltiples opciones y solo una respuesta correcta.
                - Los nombres de las claves, las estructuras y los formatos deben coincidir estrictamente con el ejemplo.
                - En tu respuesta, **solo devuelve el JSON**. No añadas explicaciones ni texto adicional.
                Fragmento del documento:
                {fragment}
                Ejemplo de formato esperado:
                {GPTQuizStrategy.quizz_example}"""
            
            print(f"Procesando fragmento {i + 1} de {len(fragments)}...")
            print(f"quizz_example: {GPTQuizStrategy.quizz_example}")
            print(f"prompt: {prompt}")                   

            response = GPTQuizStrategy.client.chat.completions.create(
                model=models["gpt-3.5-turbo"],
                messages=[{"role": "system", "content": "Eres un experto en creación de cuestionarios."},
                        {"role": "user", "content": prompt}],
                temperature=0.7
            )
            try:
                questions_json = response.choices[0].message.content
            except json.JSONDecodeError:
                print(f"Error al procesar el fragmento {i + 1}. Revisa el contenido generado.")
            print(response)

        return [questions_json , prompt]
    
    def generate_quiz(self, text: str, title: str, questions: int) -> Dict[str, Any]:               
        quizz_json, prompt = self.generate_questions_from_text(text,title, questions)
        gpt_quizz_json = quizz_json    
        quizz_json = {}    
        quizz_json["pages"] = self.get_list_questions_json(gpt_quizz_json,questions)
        quizz_json= json.dumps(quizz_json)    
        quizz_json = json.loads(quizz_json)          
        base_quizz_json = self.quizz_base_response_mock(title,json.dumps(quizz_json['pages']),questions)        
        base_quizz_json = json.loads(base_quizz_json)
        base_quizz_json = json.dumps(base_quizz_json)
        base_quizz_json = json.loads(base_quizz_json)        
        quizz_json = base_quizz_json
        # self.description = prompt
        
        return [prompt, quizz_json]


class MockQuizStrategy(QuizStrategy):
    def generate_quiz(self, text: str, title: str, questions: int) -> Dict[str, Any]:        
        quizz_json = {"pages": self.get_list_questions_json(quiz_response_mock_simple,questions)}  
        base_quizz_json = self.quizz_base_response_mock(title, json.dumps(quizz_json['pages']),questions)
        
        return ["Encuesta MOCK", json.loads(base_quizz_json) ]