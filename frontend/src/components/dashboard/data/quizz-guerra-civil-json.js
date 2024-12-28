export const json = { 
    "title": "Historia de la Guerra Civil Española",
    "showProgressBar": "bottom",
    "showTimer": true,
    "timeLimitPerPage": 10,
    "timeLimit": 25,
    "firstPageIsStarted": true,
    "startSurveyText": "Comenzar Quiz",
    "pages": [
      {
        "elements": [
          {
            "type": "html",
            "html": "Estás a punto de comenzar un quiz sobre la Guerra Civil Española. <br>Tendrás 10 segundos por cada pregunta y 25 segundos para completar el quiz.<br>Introduce tu nombre abajo y haz clic en <b>Comenzar Quiz</b> para empezar."
          },
          {
            "type": "text",
            "name": "nombreUsuario",
            "titleLocation": "hidden",
            "isRequired": true,
            "maxLength": 25
          }
        ]
      },
      {
        "elements": [
          {
            "type": "radiogroup",
            "name": "inicioGuerra",
            "title": "¿En qué año comenzó la Guerra Civil Española?",
            "choices": [
              "1930",
              "1936",
              "1942",
              "1945"
            ],
            "correctAnswer": "1936"
          }
        ]
      },
      {
        "elements": [
          {
            "type": "radiogroup",
            "name": "bandos",
            "title": "¿Qué bandos se enfrentaron en la Guerra Civil Española?",
            "choicesOrder": "random",
            "choices": [
              "Rebeldes y monárquicos",
              "Republicanos y nacionales",
              "Comunistas y capitalistas",
              "Conservadores y liberales"
            ],
            "correctAnswer": "Republicanos y nacionales"
          }
        ]
      },
      {
        "elements": [
          {
            "type": "radiogroup",
            "name": "liderNacional",
            "title": "¿Quién fue el líder del bando nacional?",
            "choicesOrder": "random",
            "choices": [
              "Francisco Franco",
              "Manuel Azaña",
              "Felipe González",
              "José Antonio Primo de Rivera"
            ],
            "correctAnswer": "Francisco Franco"
          }
        ]
      },
      {
        "elements": [
          {
            "type": "radiogroup",
            "name": "apoyoExterno",
            "title": "¿Qué país apoyó al bando nacional durante la Guerra Civil Española?",
            "choicesOrder": "random",
            "choices": [
              "Italia",
              "Reino Unido",
              "Unión Soviética",
              "Estados Unidos"
            ],
            "correctAnswer": "Italia"
          }
        ]
      },
      {
        "elements": [
          {
            "type": "radiogroup",
            "name": "finGuerra",
            "title": "¿En qué año terminó la Guerra Civil Española?",
            "choices": [
              "1937",
              "1938",
              "1939",
              "1940"
            ],
            "correctAnswer": "1939"
          }
        ]
      }
    ],
    "completedHtml": "<h4>Has acertado <b>{correctAnswers}</b> de <b>{questionCount}</b> preguntas.</h4>",
    "completedHtmlOnCondition": [
      {
        "expression": "{correctAnswers} == 0",
        "html": "<h4>Desafortunadamente, no has acertado ninguna respuesta. Inténtalo de nuevo.</h4>"
      },
      {
        "expression": "{correctAnswers} == {questionCount}",
        "html": "<h4>¡Felicidades! Has respondido correctamente a todas las preguntas.</h4>"
      }
    ]
};
