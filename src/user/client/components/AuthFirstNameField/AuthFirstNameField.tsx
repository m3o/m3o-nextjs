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
  Label = 'First Name',
  Placeholder = 'Please provide your first name',
  ValidationErrorMessage = 'Please provide a valid first name'
}

export function AuthFirstNameField({
  defaultValue = '',
  label = AuthEmailDefaultValues.Label,
  placeholder = AuthEmailDefaultValues.Placeholder,
  validationErrorMessage = AuthEmailDefaultValues.ValidationErrorMessage
}: AuthEmailFieldProps): ReactElement {
  const { control } = useFormContext()

  const schema = yup.object().shape({
    firstName: yup.string().required(validationErrorMessage).lowercase()
  })

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name="profile.firstName"
      rules={{
        validate: firstName =>
          schema.validate({ firstName }).catch(e => e.message)
      }}
      render={({ field, fieldState }) => (
        <FormInput
          {...field}
          label={label}
          placeholder={placeholder}
          error={fieldState.error?.message}
        />
      )}
    />
  )
}
