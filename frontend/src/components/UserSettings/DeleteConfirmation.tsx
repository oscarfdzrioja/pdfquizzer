import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import React from "react"
import { useForm } from "react-hook-form"

import { type ApiError, UsersService } from "../../client"
import useAuth from "../../hooks/useAuth"
import useCustomToast from "../../hooks/useCustomToast"
import { handleError } from "../../utils"

interface DeleteProps {
  isOpen: boolean
  onClose: () => void
}

const DeleteConfirmation = ({ isOpen, onClose }: DeleteProps) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const cancelRef = React.useRef<HTMLButtonElement | null>(null)
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()
  const { logout } = useAuth()

  const mutation = useMutation({
    mutationFn: () => UsersService.deleteUserMe(),
    onSuccess: () => {
      showToast(
        "Success",
        "Your account has been successfully deleted.",
        "success",
      )
      logout()
      onClose()
    },
    onError: (err: ApiError) => {
      handleError(err, showToast)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] })
    },
  })

  const onSubmit = async () => {
    mutation.mutate()
  }

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
        size={{ base: "sm", md: "md" }}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent as="form" onSubmit={handleSubmit(onSubmit)}>
            <AlertDialogHeader>Se requiere confirmación</AlertDialogHeader>

            <AlertDialogBody>
              Todos los datos de tu cuenta serán{" "}
              <strong>borrados de forma permanente.</strong> Si estas seguro por favor
              haga clic en <strong>"Confirmar"</strong> para proceder. Esta acción no puede ser revertida.
            </AlertDialogBody>

            <AlertDialogFooter gap={3}>
              <Button variant="danger" type="submit" isLoading={isSubmitting}>
                Confirmar
              </Button>
              <Button
                ref={cancelRef}
                onClick={onClose}
                isDisabled={isSubmitting}
              >
                Cancelar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default DeleteConfirmation
