import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import styled from '@emotion/styled';

import CreatePortal from '../../../components/@helper/CreatePortal';

import { snackBarStateAtom } from '../../../store';

import styles from './snackBarAnimation.module.css';

const SnackBar = () => {
	const snackBarState = useAtomValue(snackBarStateAtom);
	const [snackBarClassName, setSnackBarClassName] = useState('');

	useEffect(() => {
		const name = snackBarState.isActive ? styles.isOpen : styles.isClose;
		setSnackBarClassName(name);
	}, [snackBarState]);

	return (
		<CreatePortal modalId="snack-bar">
			{snackBarState.isActive && (
				<Container>
					<MessageBox className={snackBarClassName}>
						{snackBarState.message}
					</MessageBox>
				</Container>
			)}
		</CreatePortal>
	);
};

const Container = styled.section`
	display: flex;
	position: fixed;
	background: transparent;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;

	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
`;
const MessageBox = styled.div`
	${({ theme }) => `
    background: ${theme.colors.GREEN_500};
    z-index: ${theme.zIndex.SNACK_BAR};
		color: ${theme.colors.WHITE};
  `}
	display: flex;
	justify-content: center;
	font-size: 1rem;
	padding: 10px;

	width: 80%;
	border-radius: 4px;
	margin-bottom: 1.25rem;

	word-break: keep-all;
`;

export default SnackBar;
