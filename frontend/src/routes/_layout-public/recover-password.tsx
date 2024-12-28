import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute, redirect } from "@tanstack/react-router"
import { type SubmitHandler, useForm } from "react-hook-form"

import { type ApiError, LoginService } from "../../client"
import { isLoggedIn } from "../../hooks/useAuth"
import useCustomToast from "../../hooks/useCustomToast"
import { emailPattern, handleError } from "../../utils"

interface FormData {
  email: string
}

export const Route = createFileRoute("/_layout-public/recover-password")({
  component: RecoverPassword,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      })
    }
  },
})

function RecoverPassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()
  const showToast = useCustomToast()

  const recoverPassword = async (data: FormData) => {
    await LoginService.recoverPassword({
      email: data.email,
    })
  }

  const mutation = useMutation({
    mutationFn: recoverPassword,
    onSuccess: () => {
      showToast(
        "Email sent.",
        "We sent an email with a link to get back into your account.",
        "success",
      )
      reset()
    },
    onError: (err: ApiError) => {
      handleError(err, showToast)
    },
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    alert("onSubmit")
    mutation.mutate(data)
  }

  return (
    <>
      <Heading size="xl" color="ui.main" textAlign="center" mb={2}>
        Recuperar contraseña
      </Heading>
      <Text align="center">
        Se enviará un correo electrónico de recuperación de contraseña a la cuenta registrada.
      </Text>
      <FormControl isInvalid={!!errors.email}>
        <Input
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: emailPattern,
          })}
          placeholder="Email"
          type="email"
        />
        {errors.email && (
          <FormErrorMessage>{errors.email.message}</FormErrorMessage>
        )}
      </FormControl>
      <Button onClick={handleSubmit(onSubmit)} variant="primary" type="submit" isLoading={isSubmitting}>
        Continuar
      </Button> 
    </>
  )
}
