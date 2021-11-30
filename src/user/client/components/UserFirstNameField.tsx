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
  Label = 'First Name',
  Placeholder = 'Please provide your first name',
  ValidationErrorMessage = 'Please provide a valid first name'
}

export function UserFirstNameField({
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
      name="profile.firstName"
      rules={{
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
          errorTestId="first-name-error"
        />
      )}
    />
  )
}
