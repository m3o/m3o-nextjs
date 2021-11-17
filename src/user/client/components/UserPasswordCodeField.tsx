import React, { ReactElement } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { FormInput } from '../../../ui/components/FormInput'

interface UserPasswordCodeFieldProps {
  defaultValue?: string
  label?: string
  placeholder?: string
  validationErrorMessage?: string
}

enum UserPasswordCodeFieldDefaultValues {
  Label = 'Code',
  Placeholder = 'Please provide your code',
  ValidationErrorMessage = 'Please provide the code sent to your email address'
}

export function UserPasswordCodeField({
  defaultValue = '',
  label = UserPasswordCodeFieldDefaultValues.Label,
  placeholder = UserPasswordCodeFieldDefaultValues.Placeholder,
  validationErrorMessage = UserPasswordCodeFieldDefaultValues.ValidationErrorMessage
}: UserPasswordCodeFieldProps): ReactElement {
  const { control } = useFormContext()

  const schema = yup.object().shape({
    code: yup.string().required(validationErrorMessage)
  })

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name="code"
      rules={{
        validate: code => schema.validate({ code }).catch(e => e.message)
      }}
      render={({ field, fieldState }) => (
        <FormInput
          {...field}
          label={label}
          placeholder={placeholder}
          error={fieldState.error?.message}
          type="code"
          errorTestId="code-error"
        />
      )}
    />
  )
}
