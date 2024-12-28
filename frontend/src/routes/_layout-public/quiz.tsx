import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Heading,
  Link,
  Skeleton,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import {
  createFileRoute,
  redirect,
  Link as RouterLink,
} from "@tanstack/react-router"
import { FaHome } from 'react-icons/fa'

import { ItemsService, type Body_login_login_access_token as AccessToken } from "../../client"
import SurveyComponent from "../../components/dashboard/SurveyComponent"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import useAuth, { isLoggedIn } from "../../hooks/useAuth"
import "./quiz.css"

export const Route = createFileRoute("/_layout-public/quiz")({
  component: Quiz,
  beforeLoad: async () => {
    return 
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      })
    }
  },
})

function getItemsQueryOptions({ id }: { id: string }) {
  return {
    queryFn: () =>
      ItemsService.readPublicItem({ id: id }),
    queryKey: ["itemPublicRestricted",{ id }],
  }
}

const AlertMessage  = () => {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true })
  const { user: currentUser } = useAuth()
  
  if (isVisible && !isLoggedIn()) { 
    return (
      <Alert p={5} mt={2} status='error'>
        <AlertIcon />
        <Box >
          <AlertTitle>¡Usuario no registrado!</AlertTitle>
          <AlertDescription > 
            Para poder guardar tu respuesta, por favor <Button mb={2} as={RouterLink} to="/login"   variant='link' colorScheme='green' >inicia sesión</Button>
            <p>
              Si continuas como usuario anónimo, tu respuesta no se guardará, pero podrás ver el resultado y completar el Quiz las veces que quieras.
            </p>
          </AlertDescription>
        </Box>
        <CloseButton
          alignSelf='flex-start'
          position='relative'
          right={-1}
          top={-1}
          onClick={onClose}
        />
      </Alert>
    )  
  }

  if (isVisible && isLoggedIn()) { 
    return (
      <Alert mt={2} p={5} status='success'>
        <AlertIcon />
        <Box>
          <AlertTitle>¡Bienvenido, {currentUser?.email}!</AlertTitle>
          <AlertDescription > 
            Si es la primera vez que completas este Quiz, tu respuesta se guardará automáticamente.
            Si ya has completado este Quiz, tu respuesta se actualizara.
          </AlertDescription>
        </Box>
        <CloseButton
          alignSelf='flex-start'
          position='relative'
          right={-1}
          top={-1}
          onClick={onClose}
        />
      </Alert>
    )  
  }
}

function Quiz() {  
  const { item } = Route.useSearch()
  const queryClient = useQueryClient()
  const { user: currentUser } = useAuth()

  const {
    data:quiz,
    isPending,
    isPlaceholderData,
  } = useQuery({
    ...getItemsQueryOptions({ id: item }),
    placeholderData: (prevData) => undefined,
  })

  return (
    <>
      <VStack mb={5} mx="auto" justify="center" align="center" w={{ base: '100%' }}>
        <Box  fontWeight="medium" bg={useColorModeValue('white', 'green.600')} color="white.500" px='6' py="2" rounded="full">
          <Heading as="h2" size="lg" textAlign="center">PDFQuizzer ✅</Heading>
        </Box>
      <AlertMessage />
      </VStack>
      {
        isPending  && <Skeleton noOfLines={1} height="800px" />
       
      }    
      {
        !isPending && !quiz?.description && (
          <Heading textAlign="center" as="h3" size="md" color="gray.500" >🔎 Quiz no encontrada 😪</Heading>
        )
      }
      {
        !isPending && quiz?.description && (
          <SurveyComponent json={quiz?.description} itemId={quiz.id} theme="dark" currentUser={currentUser?.email ?? null} />
        )
      }
      <Button leftIcon={<FaHome />}  as={RouterLink} to="/home#layoutQuizzesPage" colorScheme="green" variant="link" size="sm" mt={5} >Volver a la página principal</Button>
    </>
  )
}
