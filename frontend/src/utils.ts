import type { ApiError } from "./client"

export const emailPattern = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  message: "Email incorrecto",
}

export const namePattern = {
  value: /^[A-Za-z\s\u00C0-\u017F]{1,30}$/,
  message: "Nombre incorrecto",
}

export const passwordRules = (isRequired = true) => {
  const rules: any = {
    minLength: {
      value: 8,
      message: "El password debe tener al menos 8 caracteres",
    },
  }

  if (isRequired) {
    rules.required = "Password es obligatorio"
  }

  return rules
}

export const confirmPasswordRules = (
  getValues: () => any,
  isRequired = true,
) => {
  const rules: any = {
    validate: (value: string) => {
      const password = getValues().password || getValues().new_password
      return value === password ? true : "Los passwords no coinciden"
    },
  }

  if (isRequired) {
    rules.required = "Confirmar password es obligatorio"
  }

  return rules
}

export const handleError = (err: ApiError, showToast: any) => {
  const errDetail = (err.body as any)?.detail
  let errorMessage = errDetail || "Algo fue mal."
  if (Array.isArray(errDetail) && errDetail.length > 0) {
    errorMessage = errDetail[0].msg
  }
  showToast("Error", errorMessage, "error")
}
