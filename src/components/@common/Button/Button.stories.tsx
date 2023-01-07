import { Meta, Story } from '@storybook/react';
import { PropsWithChildren } from 'react';

import Button, { ButtonProps } from './Button';

export default {
	title: 'Button',
	component: Button,
} as Meta;

const Template: Story<PropsWithChildren<ButtonProps>> = (args) => (
	<Button {...args} />
);

export const DefaultButton = Template.bind({});
DefaultButton.args = {
	onClick: () => {
		console.log('button click');
	},
	children: '버튼',
};
