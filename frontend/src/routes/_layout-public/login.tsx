import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import {
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useBoolean,
} from "@chakra-ui/react"
import {
  Link as RouterLink,
  createFileRoute,
  redirect,
} from "@tanstack/react-router"
import { type SubmitHandler, useForm } from "react-hook-form"

import type { Body_login_login_access_token as AccessToken } from "../../client"
import useAuth, { isLoggedIn } from "../../hooks/useAuth"
import { emailPattern } from "../../utils"

export const Route = createFileRoute("/_layout-public/login")({
  component: Login,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      })
    }
  },
})

function Login() {
  const [show, setShow] = useBoolean()
  const { loginMutation, error, resetError } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccessToken>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<AccessToken> = async (data) => {
    if (isSubmitting) return

    resetError()

    try {
      await loginMutation.mutateAsync(data)
    } catch {
      // error is handled by useAuth hook
    }
  }

  return (
    <>  
      <Heading size="xl" color="ui.main" textAlign="center" mb={2}>
        PDFQuizzer
      </Heading>
      <FormControl id="username" isInvalid={!!errors.username || !!error}>
        <Input
          id="username"
          {...register("username", {
            required: "Usuario es requerido",
            pattern: emailPattern,
          })}
          placeholder="Email"
          type="email"
          required
        />
        {errors.username && (
          <FormErrorMessage>{errors.username.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl id="password" isInvalid={!!error}>
        <InputGroup>
          <Input
            {...register("password", {
              required: "Password es requerido",
            })}
            type={show ? "text" : "password"}
            placeholder="Password"
            required
          />
          <InputRightElement
            color="ui.dim"
            _hover={{
              cursor: "pointer",
            }}
          >
            <Icon
              as={show ? ViewOffIcon : ViewIcon}
              onClick={setShow.toggle}
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <ViewOffIcon /> : <ViewIcon />}
            </Icon>
          </InputRightElement>
        </InputGroup>
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
      <Link as={RouterLink} to="/recover-password" color="blue.500">
        ¿Olvidaste tu password?
      </Link>
      <Button onClick={handleSubmit(onSubmit)}  variant="primary" type="submit" isLoading={isSubmitting}>
        Log In
      </Button>
      <Text>
        ¿No tienes una cuenta?{" "}
        <Link as={RouterLink} to="/signup" color="blue.500">
          Sign up
        </Link>
      </Text>     
    </>
  )
}
