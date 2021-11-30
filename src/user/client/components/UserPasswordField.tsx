import React, { ReactElement } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { FormInput } from '../../../ui/components/FormInput'

interface UserPasswordFieldProps {
  defaultValue?: string
  label?: string
  name?: string
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
  name = 'password',
  placeholder = UserPasswordFieldDefaultValues.Placeholder,
  validationErrorMessage = UserPasswordFieldDefaultValues.ValidationErrorMessage
}: UserPasswordFieldProps): ReactElement {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      rules={{
        min: {
          value: 8,
          message: 'Please provide a password with a minimum of 8 characters'
        },
        required: {
          value: true,
          message: validationErrorMessage
        }
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
