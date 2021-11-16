import React from 'react'
import { Meta, Story } from '@storybook/react'
import { UserSignIn, UserSignInProps } from '../UserSignIn'

export default {
  title: 'Components/UserSignIn',
  component: UserSignIn
} as Meta

const Template: Story<UserSignInProps> = args => <UserSignIn {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Test'
}
