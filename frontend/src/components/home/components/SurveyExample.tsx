import { Box, Container, Flex, Grid, GridItem, Heading, Image, VStack, useColorModeValue } from "@chakra-ui/react"
import SurveyComponent from "../../dashboard/SurveyComponent"
import { RefObject } from "react";


interface Props { 
    surveyRef?: RefObject<HTMLDivElement>;
    handleGoToRef?: (ref: RefObject<HTMLDivElement>) => void;
}

export default function SurveyExample( {surveyRef, handleGoToRef}: Props) {
    return (
        <Box ref={surveyRef} as="section" py="12" bg={useColorModeValue('gray.50', 'gray.900')}>
            <Container maxW="7xl">                
                <VStack mb={5} mx="auto" justify="center" align="center" w={{ base: '100%', md: '80%', lg: '70%', xl: '80%' }}>
                    <Box  fontWeight="medium" bg={useColorModeValue('white', 'gray.800')} color="green.500" px='6' py="2" rounded="full">Quizz demo</Box>
                </VStack>
                <Flex 
                  justifyContent="center"
                  direction={'column'}
                  alignItems="center"
                  w={{ base: '100%', lg: '100%' }} >
                  <Box>
                    <SurveyComponent theme={"dark"} />
                  </Box>                 
                </Flex>
            </Container>
        </Box>
    )
}


