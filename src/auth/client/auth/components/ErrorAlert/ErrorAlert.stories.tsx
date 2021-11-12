import React from 'react'
import { Meta, Story } from '@storybook/react'
import { ErrorAlert, ErrorAlertProps } from './ErrorAlert'

export default {
  title: 'Components/ErrorAlert',
  component: ErrorAlert
} as Meta

const Template: Story<ErrorAlertProps> = args => <ErrorAlert {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'This is an alert'
}
