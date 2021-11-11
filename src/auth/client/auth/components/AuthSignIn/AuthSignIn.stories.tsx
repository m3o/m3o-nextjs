import React from 'react'
import { Meta, Story } from '@storybook/react'
import { AuthSignIn, AuthSignInProps } from './AuthSignIn'

export default {
  title: 'Components/AuthSignIn',
  component: AuthSignIn
} as Meta

const Template: Story<AuthSignInProps> = args => <AuthSignIn {...args} />

export const Default = Template.bind({})
Template.args = {
  title: 'Test'
}
