import {
  Button,
  Container,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react"

import DeleteConfirmation from "./DeleteConfirmation"

const DeleteAccount = () => {
  const confirmationModal = useDisclosure()

  return (
    <>
      <Container maxW="full">
        <Heading size="lg" py={4}>
          Eliminar mi cuenta
        </Heading>
        <Text>
          Elimina permanentemente tus datos y todo lo asociado a tu cuenta.
        </Text>
        <Button variant="danger" mt={4} onClick={confirmationModal.onOpen}>
          Borrar
        </Button>
        <DeleteConfirmation
          isOpen={confirmationModal.isOpen}
          onClose={confirmationModal.onClose}
        />
      </Container>
    </>
  )
}
export default DeleteAccount
