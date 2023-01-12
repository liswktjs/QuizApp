import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import CreatePortal from '../@helper/CreatePortal';

import { gameTakingTime, gameStateAtom, timerStateAtom } from '../../store';

import { AiOutlineRight } from 'react-icons/ai';
import styles from './timerAnimation.module.css';

const Timer = () => {
	const { isProgress, isEnd } = useAtomValue(gameStateAtom);
	const [timerState, setTimerState] = useAtom(timerStateAtom);
	const setTakingTime = useSetAtom(gameTakingTime);

	const [timerClassName, setTimerClassName] = useState(styles.isNoShow);
	const [timer, setTimer] = useState(0);
	const [min, setMin] = useState(0);
	const [sec, setSec] = useState(0);

	useEffect(() => {
		let timerId: null | ReturnType<typeof setTimeout> = null;

		if (isProgress && !isEnd) {
			setTimerClassName(styles.isClosed);
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
		if (isEnd) {
			setTakingTime({ min, sec });
			setTimerClassName(styles.isNoShow);
		}
	}, [isEnd]);

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

	useEffect(() => {
		const name = isProgress
			? timerState.isToggle
				? styles.isActive
				: styles.isClosed
			: styles.isNoShow;
		setTimerClassName(name);
	}, [timerState]);

	const onToggleButtonClick = () => {
		setTimerState({
			isToggle: !timerState.isToggle,
		});
	};

	return (
		<CreatePortal modalId="timer">
			<Container>
				<TimerBox className={timerClassName}>
					<ToggleButton onClick={onToggleButtonClick}>
						<ToggleIcon isToggle={timerState.isToggle} />
					</ToggleButton>
					<div>타이머 </div>
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
	align-items: flex-end;

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
	position: relative;
	justify-content: center;
	font-size: 1rem;
	padding: 20px;

	width: 50%;
	border-radius: 4px;
	margin-bottom: 1.25rem;

	word-break: keep-all;
`;

const ToggleButton = styled.button`
	position: absolute;
	left: 10px;
	top: 13px;

	background: transparent;
	border: none;
	padding: none;
`;

const ToggleIcon = styled(AiOutlineRight)<{ isToggle: boolean }>`
	font-size: 1.5rem;
	padding: none;
	margin: none;

	${({ theme }) => `
		color: ${theme.colors.WHITE};
		&:hover,
		&:active {
			color: ${theme.colors.BLACK};
		}
	`}

	${({ isToggle }) => !isToggle && 'transform: rotate(-0.5turn)'};
`;

export default Timer;
