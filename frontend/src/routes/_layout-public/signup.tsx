import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Text,
} from "@chakra-ui/react"
import {
  Link as RouterLink,
  createFileRoute,
  redirect,
} from "@tanstack/react-router"
import { type SubmitHandler, useForm } from "react-hook-form"

import Logo from "/assets/images/fastapi-logo.svg"
import type { UserRegister } from "../../client"
import useAuth, { isLoggedIn } from "../../hooks/useAuth"
import { confirmPasswordRules, emailPattern, passwordRules } from "../../utils"

export const Route = createFileRoute("/_layout-public/signup")({
  component: SignUp,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      })
    }
  },
})

interface UserRegisterForm extends UserRegister {
  confirm_password: string
}

function SignUp() {
  const { signUpMutation } = useAuth()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<UserRegisterForm>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      email: "",
      full_name: "",
      password: "",
      confirm_password: "",
    },
  })

  const onSubmit: SubmitHandler<UserRegisterForm> = (data) => {
    signUpMutation.mutate(data)
  }

  return (
    <>
      <Heading size="xl" color="ui.main" textAlign="center" mb={2}>
        Registro PDFQuizzer 
      </Heading>
      <FormControl id="full_name" isInvalid={!!errors.full_name}>
        <FormLabel htmlFor="full_name" srOnly>
          Nombre completo
        </FormLabel>
        <Input
          id="full_name"
          minLength={3}
          {...register("full_name", { required: "Nombre completo es requerido" })}
          placeholder="Nombre completo"
          type="text"
        />
        {errors.full_name && (
          <FormErrorMessage>{errors.full_name.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl id="email" isInvalid={!!errors.email}>
        <FormLabel htmlFor="username" srOnly>
          Email
        </FormLabel>
        <Input
          id="email"
          {...register("email", {
            required: "Email es requerido",
            pattern: emailPattern,
          })}
          placeholder="Email"
          type="email"
        />
        {errors.email && (
          <FormErrorMessage>{errors.email.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl id="password" isInvalid={!!errors.password}>
        <FormLabel htmlFor="password" srOnly>
          Password
        </FormLabel>
        <Input
          id="password"
          {...register("password", passwordRules())}
          placeholder="Password"
          type="password"
        />
        {errors.password && (
          <FormErrorMessage>{errors.password.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl
        id="confirm_password"
        isInvalid={!!errors.confirm_password}
      >
        <FormLabel htmlFor="confirm_password" srOnly>
          Confirmar Password
        </FormLabel>

        <Input
          id="confirm_password"
          {...register("confirm_password", confirmPasswordRules(getValues))}
          placeholder="Confirmar Password"
          type="password"
        />
        {errors.confirm_password && (
          <FormErrorMessage>
            {errors.confirm_password.message}
          </FormErrorMessage>
        )}
      </FormControl>
      <Button onClick={handleSubmit(onSubmit)} variant="primary" type="submit" isLoading={isSubmitting}>
        Sign Up
      </Button>
      <Text>
        ¿Ya tienes una cuenta?{" "}
        <Link as={RouterLink} to="/login" color="blue.500">
          Log In
        </Link>
      </Text>

    </>
  )
}

export default SignUp
