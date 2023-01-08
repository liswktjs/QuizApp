import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import CreatePortal from '../@helper/CreatePortal';

import { gameStateAtom } from '../../store';

const Timer = () => {
	const { isProgress, isEnd } = useAtomValue(gameStateAtom);
	const [timer, setTimer] = useState(0);
	const [min, setMin] = useState(0);
	const [sec, setSec] = useState(0);

	useEffect(() => {
		let timerId: null | ReturnType<typeof setTimeout> = null;

		if (isProgress && !isEnd) {
			timerId = setInterval(() => {
				setTimer((prev) => prev + 1);
			}, 1000);
		}
		if (!isProgress && isEnd && timerId) {
			clearInterval(timerId);
			timerId = null;
		}
		return () => {
			if (timerId) {
				clearInterval(timerId);
			}
		};
	}, [isProgress, isEnd]);

	useEffect(() => {
		if (timer >= 60) {
			const min = Math.floor(timer / 60);
			const sec = timer - min * 60;
			setMin(min);
			setSec(sec);
		}
		if (timer < 60) {
			setSec(timer);
		}
	}, [timer]);

	return (
		<CreatePortal modalId="timer">
			<Container>
				<TimerBox>
					<div>{min}분</div>
					<div>{sec}초</div>
				</TimerBox>
			</Container>
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

	${({ theme }) => `
		z-index: ${theme.zIndex.TIMER_BACKGROUND};
	`}
`;

const TimerBox = styled.div`
	${({ theme }) => `
    background: ${theme.colors.GREEN_500};
    z-index: ${theme.zIndex.TIMER};
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

export default Timer;
