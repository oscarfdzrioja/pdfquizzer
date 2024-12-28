import React, { useRef, useState } from 'react'
import MonacoEditor, { monaco } from "@monaco-editor/react";
import { Box, Button } from '@chakra-ui/react';
import { FiRefreshCw, } from 'react-icons/fi';
import useCustomToast from '../../hooks/useCustomToast';

export const QuizzMonacoEditor = ({quizzJson, setQuizzJson, callback }) => {

    const [isEditorReady, setIsEditorReady] = useState(false);
    const valueGetter = useRef();
    const showToast = useCustomToast()
  
    function handleEditorDidMount(_valueGetter) {
      setIsEditorReady(true);
      valueGetter.current = _valueGetter;
    }
  
    function handleShowValue() {      
      if (!valueGetter.current) {
        showToast("No hay cambios", "No has realizado ningun cambio", "error")
        return         
      }
      const quizz = JSON.parse(valueGetter.current)
      showToast("JSON actualizado", "Quiz actualizada, comprueba los cambios ", "success")
      setQuizzJson(quizz.quizzJson)
      callback()
    }
    
    return (
        <>
            <MonacoEditor
                height="80vh"
                language="json"
                value={JSON.stringify(
                {
                    quizzJson
                },
                null,
                2
                )}
                onChange={handleEditorDidMount}
            />
            <Box mt={5}>
                <Button leftIcon={<FiRefreshCw />} onClick={handleShowValue}  colorScheme='gray'>
                    Actualizar JSON
                </Button>
                <Button variant='outline' ml={3} onClick={callback}>
                    Cancelar
                </Button>
            </Box>
        </>
    )
}
