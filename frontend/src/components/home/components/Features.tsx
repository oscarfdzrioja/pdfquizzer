import { Box, Container, Flex, Grid, GridItem, Heading, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { FaQuoteLeft } from 'react-icons/fa'

interface FeaturesContentTypes {
    title: string
    content: string
}
const featuresContent: Array<FeaturesContentTypes> = [
    {
        title: 'EduTech Solutions',
        content: "PDFQuizeer nos ha revolucionado la manera de crear material interactivo para nuestros cursos. Lo que antes nos tomaba horas, ahora lo hacemos en minutos con resultados increíbles."
    },
    {
        title: 'Innovate Learn Co.',
        content: "Transformar manuales y guías en quizzes efectivos nunca fue tan fácil. PDFQuizeer es una herramienta imprescindible para nuestra capacitación empresarial."
    },
    {
        title: 'María López, Profesora Universitaria',
        content: "Gracias a PDFQuizeer puedo convertir mis apuntes y lecturas en evaluaciones personalizadas para mis estudiantes. Es intuitivo y ahorra muchísimo tiempo."
    },
    {
        title: 'NextLevel Training',
        content: "Usamos PDFQuizeer para nuestros programas de formación y hemos visto un aumento significativo en la participación y comprensión de los empleados."
    },
    {
        title: 'Carlos Méndez, Desarrollador',
        content: "Integrar PDFQuizeer en nuestras plataformas educativas fue un acierto. La IA hace un trabajo increíble generando quizzes precisos a partir de documentos complejos."
    }
]

export default function Features () {
    return (
        <Box as="section" py="12">
            <Container maxW="7xl">
                {/* <Heading as="h2" textAlign="center">Features</Heading> */}
                <VStack mb={5} mx="auto" justify="center" align="center" w={{ base: '100%', md: '80%', lg: '70%', xl: '80%' }}>
                    <Box  fontWeight="medium" bg={useColorModeValue('white', 'gray.600')} color="white.500" px='6' py="2" rounded="full">¿Quien usa PDFQuizzer?</Box>
                </VStack>
                <Text textAlign="center" w={{ base: '100%',  md: '80%', lg: '70%', xl: '60%' }} mx="auto">Educadores, empresas, y desarrolladores que necesitan transformar PDFs en quizzes interactivos de forma rápida y sencilla. Es ideal para evaluar conocimientos, diseñar capacitaciones, y automatizar la creación de contenido educativo con IA.</Text>
                <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={3} py='8'>
                    {
                        featuresContent.map((feature, index) => {
                            // return (
                            //     <GridItem>
                            //         <FeatureCard feature={feature} />
                            //     </GridItem>
                            // )
                            return (
                            <GridItem key={index}>
                            <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
                                <Heading fontSize="xl" mb={4}>
                                    {feature.title}
                                </Heading>
                                <Flex align="center">
                                    <FaQuoteLeft size="64px" color={useColorModeValue('gray.600', 'gray.300')} />
                                    <Text ml={3}>{feature.content}</Text>
                                </Flex>
                            </Box>
                            </GridItem> )
                        })
                    }
                </Grid>
            </Container>
        </Box>
    )
}

const FeatureCard = ({ feature: { title, content } }: { feature: FeaturesContentTypes } ) => {
    return (
        <VStack h='full' align="start" border="1px" p="5" borderColor='gray.200' rounded="md">
            <Heading as="h3" fontSize="2xl">{title}</Heading>
            <Text>{content}</Text>
        </VStack>
    )
}
