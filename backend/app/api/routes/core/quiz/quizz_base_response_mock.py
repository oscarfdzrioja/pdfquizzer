def quizz_base_response_mock(title,pages):
    return f'''
    {{
        "title": "{title}",
        "showProgressBar": "bottom",
        "showTimer": true,
        "timeLimitPerPage": 10,
        "timeLimit": 25,
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