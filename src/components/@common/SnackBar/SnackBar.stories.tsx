import { Meta, Story } from '@storybook/react';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';

import { snackBarStateAtom } from '../../../store';
import SnackBar from './SnackBar';

export default {
	title: 'SnackBar',
	component: SnackBar,
} as Meta;

const snackBarElement = document.createElement('div');
snackBarElement.setAttribute('id', 'snack-bar');
document.body.append(snackBarElement);

const MockSnackBar = () => {
	const setSnackBarState = useSetAtom(snackBarStateAtom);

	useEffect(() => {
		setSnackBarState({
			isActive: true,
			message: '정답입니다',
		});
		let timer = setTimeout(() => {
			setSnackBarState({
				isActive: false,
				message: '',
			});
		}, 1000);
		return () => {
			clearTimeout(timer);
		};
	}, [setSnackBarState]);

	return <SnackBar />;
};

const Template: Story = () => <MockSnackBar />;

export const DefaultSnackBar = Template.bind({});
