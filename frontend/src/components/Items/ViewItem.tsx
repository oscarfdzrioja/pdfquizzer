import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"

import {
  type ItemPublic,
} from "../../client"

import SurveyComponent from "../dashboard/SurveyComponent"

interface ViewItemProps {
  item: ItemPublic
  isOpen: boolean
  onClose: () => void
}

const ViewItem = ({ item, isOpen, onClose }: ViewItemProps) => {

  const onCancel = () => {    
    onClose()
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "sm", md: "lg" }}
        isCentered        
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Consultar Quiz</ModalHeader>
          <ModalCloseButton />
          <ModalBody  pb={6}>
            <div style={{"minHeight": "500px"}}>
              <SurveyComponent json={item?.description} />
            </div>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button onClick={onCancel}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ViewItem
