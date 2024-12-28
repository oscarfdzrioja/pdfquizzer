import { Box, Button, Center, Checkbox, Container, Divider, Flex, FormControl, FormLabel, Input, Select, SimpleGrid, Spinner, Switch, Text, Tooltip, useDisclosure } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import useAuth from "../../hooks/useAuth"
import Header from "../../components/dashboard/Header"
import DropzoneFileUpload from "../../components/dashboard/file-upload"
import SurveyComponent from '../../components/dashboard/SurveyComponent';
import { useEffect, useRef, useState } from "react"
import { FiRefreshCw, FiSave, FiCode, FiPlay, FiCopy } from "react-icons/fi";
import { JSONEditor } from 'reactjs-json-editor';
import { GptService, QuizzService } from "../../client"
import { json } from "../../components/dashboard/data/quizz-guerra-civil-json";
import './reactjs-json-editor.css';
import {
  SkeletonText,
  Skeleton,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type ApiError, type ItemCreate, ItemsService } from "../../client"
import useCustomToast from "../../hooks/useCustomToast"
import { handleError } from "../../utils"
import { QuizzMonacoEditor } from "../../components/dashboard/quizzMonacoEditor"
import { DrawerQuizzer } from "../../components/dashboard/drawer"
import { set } from "react-hook-form"


export const Route = createFileRoute("/_layout-dashboard/surveys")({
  component: Surveys,
})


function Surveys() {
  const { user: currentUser } = useAuth()
  const [surveyKey, setSurveyKey] = useState(0);
  const [quizzJson, setQuizzJson] = useState({});
  const [isNewQuizzSaved, setisNewQuizzSaved] = useState(false);
  // const [quizzJson, setQuizzJson] = useState(json);
  const titleRef = useRef(null)
  const [newQuizItemId, setNewQuizItemId] = useState(null)
  const questionsNumberRef = useRef(null)
  const publicQuizRef = useRef(null)
  const homeQuizRef = useRef(null)
  const [quizzGenerating, setQuizzGenerating] = useState(false);
  const [showJsonEditor, setJsonEditor] = useState(true);
  const showToast = useCustomToast()
  const queryClient = useQueryClient()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()


  const reloadSurveyComponent = () => {
    setSurveyKey(prevKey => prevKey + 1);
  };

  const mutation = useMutation({
    mutationFn: (data: ItemCreate) => 
      ItemsService.createItem({ requestBody: data }),      
    onSuccess: (data) => {
      showToast("Generador de Quizzes!", "Quiz guardado con exito", "success")
      setisNewQuizzSaved(true);      
      setNewQuizItemId(data.id)
    },
    onError: (err: ApiError) => {
      handleError(err, showToast)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] })
    },
  })

  const handleSubmit = async (e) => {      
    e.preventDefault();                                     
    const formData = new FormData(e.currentTarget);
    const file = formData.get("my-file") as File;

    if (!file) {
      showToast("Error!", "No hay ningun archivo seleccionado", "error")
      return;
    }

    try{
      setQuizzGenerating(true);
      const response = await QuizzService.getQuizz({ file: file, title: titleRef.current.value, questions: questionsNumberRef.current.value  })       
      const { message, quizz } = response
      showToast("Quiz creada mediante IA!", "Ya puedes probar y modificar el Quiz antes de guardarlo", "success")
      setQuizzJson(quizz);
    }catch(err){      
      showToast("Error!", "Error al generar el quizz", "error")
    }finally{
      setQuizzGenerating(false);
    }
  }

  const handleSaveQuiz = () => {    
    if(Object.keys(quizzJson).length === 0 ) { 
      showToast("Error!", "No hay ningun quiz generado", "error")
      return
    }
    const data = {      
      title: titleRef.current.value,
      description:  JSON.stringify(quizzJson),
      public: publicQuizRef.current.checked,
      public_home: homeQuizRef.current.checked
    }    
    mutation.mutate(data)
  }

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      showToast(
        "URL Copiada",
        "URL copiada al portapapeles.",
        "success",

      );
    });
  };


  return (
    <>
      <Container maxW="full">
        <Box pt={0} m={0}>
          <Flex w="100%"  h="auto"  justify="center" align="center" mb={20}>
            <Flex w="100%" h="auto" flexDir="column">
              <Header title={"Generador de Quizzes"} imgSrc="/assets/images/pdfquizzer.png" />
              <Divider mb={0} />
              <SimpleGrid columns={{ md: 1, lg: 2 }}  spacing={0}>
                <Box   bg="" height={{ sm:"auto", md:"auto" }} borderRight={{ sm:"0px solid #2E3039",  lg: "2px solid #2E3039" }}>
                  {/* <Flex w="100%" mt={10}  justify="center" > */}
                  <Flex  justifyContent={'start'} pr={5}  mt={10}  mb={10}   ml={4} >
                      <form style={{ overflow:"hidden", background:"#1A202C", width:"100%", padding:"25px", border: "1px solid #2E3039" }}  onSubmit={handleSubmit}>
                          <FormControl mb={5} isRequired >                            
                            <FormLabel htmlFor="title">Titulo del Quiz</FormLabel>
                            <Input
                              id="title"
                              name='title'
                              placeholder="Titulo"
                              type="text"
                              ref={titleRef}
                            />
                          </FormControl>
                          <Flex gap={"4"} flexDirection={{base:'column',lg:'column', xl:'row' }}>
                            <DropzoneFileUpload name ="my-file" required />    
                            <Flex gap={"4"} flexDirection={{base:'column' }}>
                              <FormControl mb={1} isRequired >
                                <FormLabel htmlFor="questionsNumber">¿Cuantas preguntas quieres?</FormLabel>
                                <Select  ref={questionsNumberRef}  colorScheme="green" id="numberSelect" name="numberSelect">
                                  <option selected value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                  <option value="10">10</option>
                                </Select>                           
                              </FormControl>
                              <FormControl mb={1} isRequired >
                                <FormLabel htmlFor="publicQuiz">¿Publicar Quiz No/Si?</FormLabel>
                                <Switch isRequired={false} ref={publicQuizRef} defaultChecked id='publicQuiz'  colorScheme='green' size='lg' />
                              </FormControl>
                              <FormControl mb={5} isRequired >
                                <FormLabel htmlFor="homeQuiz">¿Ver Quiz en Home No/Si?</FormLabel>
                                <Switch isRequired={false} ref={homeQuizRef} defaultChecked id='homeQuiz'  colorScheme='green' size='lg' />
                              </FormControl>
                            </Flex>
                          </Flex> 
                          <Button leftIcon={<FiPlay />} mt={5} mb={"2"} textAlign={'center'}  color="white" type="submit">
                            Generar Quizz
                          </Button>
                          {/* <Divider mt={5} mb={4} color={'white'}  /> */}
                      </form>
                  </Flex>
                  <Flex  gap={2} m={5} ml={0}  flexDir={
                    { base: "column", xl: "row" }
                  } >
                    <Button borderRadius="full"  style={{maxWidth:"495px"}} leftIcon={<FiRefreshCw />} colorScheme={"gray"} bg={"gray.600"}   onClick={reloadSurveyComponent}   color="white" ml={4}>
                          Recargar Quizz
                    </Button>
                    {/* <Button onClick={()=> setJsonEditor( prev => !prev ) } leftIcon={<FiCode />}  colorScheme={"gray"} bg={"gray.600"}   disabled={true}   color="white" ml={4}> */}
                    <Button borderRadius="full" style={{maxWidth:"495px"}} ref={btnRef} onClick={onOpen} leftIcon={<FiCode />}  colorScheme={"gray"} bg={"gray.600"}   disabled={true}   color="white" ml={4}>
                          {/* {
                            showJsonEditor ? "Ocultar JSON" : "Ver JSON Quiz"
                          } */}
                          Editar JSON
                    </Button>
                    <Tooltip isDisabled={!isNewQuizzSaved} color={'white'} hasArrow label='Ya has guardado este Quiz' bg='red.600'>                      
                      <Button isDisabled={isNewQuizzSaved} borderRadius="full" style={{maxWidth:"495px"}} onClick={handleSaveQuiz}  leftIcon={<FiSave />} colorScheme={"gray"} bg={"gray.600"}    color="white" ml={4}>
                            Guardar 
                      </Button>
                    </Tooltip>
                  </Flex>
                  <Flex
                    display={showJsonEditor ? "flex" : "none"}
                    m={4}
                    mt={5} 
                    style={{maxWidth:"490px"}}
                    flexDir={{ base: "column", md: "row" }} >
                    <JSONEditor
                        collapse={2}
                        allowEditValue={true}
                        value={quizzJson}                     
                    />
                  </Flex>
 
                  <Button
                    isDisabled={!newQuizItemId}
                    ml={5}
                    mb={5}
                    leftIcon={<FiCopy />}
                    size="sm"
                    onClick={() => handleCopy(`${window.location.origin}/quiz?item=${newQuizItemId}`)}
                  >
                    Copiar URL del Quiz
                  </Button>

                  <DrawerQuizzer  isOpen={isOpen}  onClose={onClose} finalFocusRef={btnRef} >
                    <QuizzMonacoEditor callback={onClose} quizzJson={quizzJson} setQuizzJson={setQuizzJson} />
                  </DrawerQuizzer>
                </Box>

                <Box  p={{base:"5",sm:"4", md:"10" }}>    
                  {
                    !quizzGenerating && (                                            
                      <SurveyComponent json={quizzJson} key={surveyKey} />
                    )
                  } 
                  {
                    quizzGenerating && ( 
                      <>
                      <Center>
                        <Text color={"green.500"} fontSize="xl" fontWeight="bold">
                          <Spinner me={2}  color='green.500' />
                          Generando Quizz...
                        </Text>
                      </Center>                     
                      <Skeleton height="70vh" />            
                      </>
                    )
                  }
                </Box>
              </SimpleGrid>
            </Flex>          
          </Flex>
        </Box>
      </Container>
    </>
  );
}