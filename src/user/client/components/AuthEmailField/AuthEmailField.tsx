import React, { ReactElement } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { FormInput } from '../../../../ui/components/FormInput'

interface AuthEmailFieldProps {
  defaultValue?: string
  label?: string
  placeholder?: string
  validationErrorMessage?: string
}

enum AuthEmailDefaultValues {
  Label = 'Email',
  Placeholder = 'Please provide your email address',
  ValidationErrorMessage = 'Please provide a valid email address'
}

export function AuthEmailField({
  defaultValue = '',
  label = AuthEmailDefaultValues.Label,
  placeholder = AuthEmailDefaultValues.Placeholder,
  validationErrorMessage = AuthEmailDefaultValues.ValidationErrorMessage
}: AuthEmailFieldProps): ReactElement {
  const { control } = useFormContext()

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(validationErrorMessage)
      .required(validationErrorMessage)
      .lowercase()
  })

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name="email"
      rules={{
        validate: email => schema.validate({ email }).catch(e => e.message)
      }}
      render={({ field, fieldState }) => (
        <FormInput
          {...field}
          label={label}
          placeholder={placeholder}
          error={fieldState.error?.message}
          errorTestId="email-error"
        />
      )}
    />
  )
}
