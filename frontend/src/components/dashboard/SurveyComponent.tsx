import React, { memo } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
// import * as SurveyTheme from "survey-core/themes";
import * as SurveyTheme from "./themes/threedimensional";
import * as SurveyThemeDark from "./themes/threedimensional-dark";
// import "./index.css";
import { json as jsonDefault } from "./data/quizz-guerra-civil-json";
import "survey-core/survey.i18n";
import { RepliesService, ReplyItemCreate } from "../../client";
import useCustomToast from "../../hooks/useCustomToast"

interface Props { 
    theme?: 'light' | 'dark' ;
    json?: any;
    itemId?: string | null;
    currentUser?: string | null;
}

const  SurveyComponent = memo( ({ theme = "light", json = jsonDefault,itemId=null, currentUser=null }: Props) => {
    console.log('SurveyComponent');
    const survey = new Model(json);
    const showToast = useCustomToast()
    if (theme === "dark") {
        survey.applyTheme(SurveyThemeDark.DefaultLightPanelless);
    } else {
        survey.applyTheme(SurveyTheme.DefaultLightPanelless);
    }
    
    const questionName =  survey.getQuestionByName('nombreUsuario');
    if(currentUser && questionName ){           
        questionName.value = currentUser;
        questionName.readOnly = true;
    }

    survey.onComplete.add(async (sender, options) => {
        if (!itemId) return 
        const data: ReplyItemCreate = {
            item_id: itemId,
            description: JSON.stringify(sender.data, null, 3),
            score: survey.getCorrectedAnswerCount(),
        }
        console.log(JSON.stringify(sender.data, null, 3));
        console.log(survey.getCorrectedAnswerCount());
        const response = await RepliesService.createReplyItem({ requestBody: data });
        console.log(response);
        showToast("Enhorabuena", "Tu respuesta se ha sido guardada", "success")
    });
    survey.locale = 'es'
    return (
        <>
            <Survey model={survey} />
        </>
    );
},(prevProps, nextProps) => {
    // Solo re-renderizar si las props `theme` o `json` cambian
    return prevProps.theme === nextProps.theme && prevProps.json === nextProps.json;
}
)

export default SurveyComponent;