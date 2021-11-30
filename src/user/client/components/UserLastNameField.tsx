import React, { ReactElement } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { FormInput } from '../../../ui/components/FormInput'

interface UserLastNameFieldProps {
  defaultValue?: string
  label?: string
  placeholder?: string
  validationErrorMessage?: string
}

enum UserLastNameFieldDefaultValues {
  Label = 'Last Name',
  Placeholder = 'Please provide your last name',
  ValidationErrorMessage = 'Please provide a valid last name'
}

export function UserLastNameField({
  defaultValue = '',
  label = UserLastNameFieldDefaultValues.Label,
  placeholder = UserLastNameFieldDefaultValues.Placeholder,
  validationErrorMessage = UserLastNameFieldDefaultValues.ValidationErrorMessage
}: UserLastNameFieldProps): ReactElement {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name="profile.lastName"
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
          errorTestId="last-name-error"
        />
      )}
    />
  )
}
