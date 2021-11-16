import React, { ReactElement } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { FormInput } from '../../../ui/components/FormInput'

interface UserPasswordFieldProps {
  defaultValue?: string
  label?: string
  placeholder?: string
  validationErrorMessage?: string
}

enum UserPasswordFieldDefaultValues {
  Label = 'Password',
  Placeholder = 'Please provide your password',
  ValidationErrorMessage = 'Please provide your password'
}

export function UserPasswordField({
  defaultValue = '',
  label = UserPasswordFieldDefaultValues.Label,
  placeholder = UserPasswordFieldDefaultValues.Placeholder,
  validationErrorMessage = UserPasswordFieldDefaultValues.ValidationErrorMessage
}: UserPasswordFieldProps): ReactElement {
  const { control } = useFormContext()

  const schema = yup.object().shape({
    password: yup
      .string()
      .min(8, 'Please provide a password with a minimum of 8 characters')
      .required(validationErrorMessage)
  })

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name="password"
      rules={{
        validate: password =>
          schema.validate({ password }).catch(e => e.message)
      }}
      render={({ field, fieldState }) => (
        <FormInput
          {...field}
          label={label}
          placeholder={placeholder}
          error={fieldState.error?.message}
          type="password"
          errorTestId="password-error"
        />
      )}
    />
  )
}
