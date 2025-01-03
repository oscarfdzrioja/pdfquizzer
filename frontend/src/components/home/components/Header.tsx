import { Box, Container, HStack, Heading, Text, VStack, Image, useColorModeValue } from '@chakra-ui/react'

// import { ChakraUiIcon, ReactIcon, TypescriptIcon, ViteJsIcon } from '@assets/images'

export default function Header () {
    return (
        <Box as='header' py='10' bg={useColorModeValue('gray.50', 'gray.900')}>
            <Container maxW='7xl'>
                <VStack mx="auto" justify="center" align="center" w={{ base: '100%', md: '80%', lg: '70%', xl: '80%' }}>
                    <Box fontWeight="medium" bg={useColorModeValue('white', 'gray.800')} color="green.500" px='6' py="2" rounded="full">¿Que hace PDFQuizzer?</Box>
                    <Heading as="h1" textAlign="center" size="2xl" py="3">PDFQuizeer es la Herramienta Definitiva para Generar Encuestas Tipo Quiz con IA</Heading>
                    <Text textAlign="center" fontSize="lg">PDFQuizeer convierte cualquier PDF en encuestas tipo quiz de forma automática utilizando inteligencia artificial. Sube tu documento, genera las preguntas, y personaliza fácilmente los quizzes para tus usuarios.
                         Ideal para simplificar la creación de contenido dinámico y educativo,
                         con herramientas intuitivas para todos los niveles.</Text>
                    <HStack spacing="4" pt='5'>
                        {/* <Image w='10' h="10" src={ChakraUiIcon} alt='chakra-ui logo'  />
                        <Image w='10' h="10" src={ReactIcon} alt='reactjs logo'  />
                        <Image w='10' h="10" src={TypescriptIcon} alt='typescript logo'  />
                        <Image w='10' h="10" src={ViteJsIcon} alt='vitejs logo'  /> */}
                    </HStack>
                </VStack>
            </Container>
        </Box>
    )
}
