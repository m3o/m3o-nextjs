import React, { ReactElement } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { FormInput } from '../../../ui/components/FormInput'

interface UserEmailFieldProps {
  defaultValue?: string
  label?: string
  placeholder?: string
  validationErrorMessage?: string
}

enum UserEmailDefaultValues {
  Label = 'Email',
  Placeholder = 'Please provide your email address',
  ValidationErrorMessage = 'Please provide a valid email address'
}

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export function UserEmailField({
  defaultValue = '',
  label = UserEmailDefaultValues.Label,
  placeholder = UserEmailDefaultValues.Placeholder,
  validationErrorMessage = UserEmailDefaultValues.ValidationErrorMessage
}: UserEmailFieldProps): ReactElement {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name="email"
      rules={{
        required: {
          value: true,
          message: validationErrorMessage
        },
        pattern: {
          value: EMAIL_REGEX,
          message: validationErrorMessage
        }
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
