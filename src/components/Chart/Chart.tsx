import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import styles from './chartAnimation.module.css';

export interface ChartProps {
	totalCount: number;
	wrongCount: number;
	rightCount: number;
}

const Chart = ({ totalCount, wrongCount, rightCount }: ChartProps) => {
	const [chartClassName, setChartClassName] = useState(styles.isInActive);

	const getRightPercent = () => {
		return (rightCount / totalCount) * 100;
	};

	const getWrongPercent = () => {
		return (wrongCount / totalCount) * 100;
	};

	useEffect(() => {
		setTimeout(() => {
			setChartClassName(styles.isActive);
		}, 1000);
	}, []);

	return (
		<Container>
			<h2 hidden>유저의 오답 비율을 보여주는 차트</h2>
			<StickContainer>
				<p>{getRightPercent()}%</p>
				<Stick percent={getRightPercent()}>
					<StickContent className={chartClassName} isAnswer={true} />
				</Stick>
				<p>정답률</p>
			</StickContainer>
			<StickContainer>
				<p>{getWrongPercent()}%</p>
				<Stick percent={getWrongPercent()}>
					<StickContent className={chartClassName} isAnswer={false} />
				</Stick>
				<p>오답률</p>
			</StickContainer>
		</Container>
	);
};

const Container = styled.section`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-around;
`;

const StickContainer = styled.div`
	width: 100px;
	height: 500px;

	display: flex;
	flex-direction: column;
	justify-content: flex-end;

	p {
		width: 100%;
		display: block;
		text-align: center;
		margin: 20px 0;
	}
`;

const Stick = styled.div<{ percent: number }>`
	display: flex;
	align-items: flex-end;
	${({ percent }) => `
    height: ${percent}%;
    width: 100px;
   
  `}
`;

const StickContent = styled.div<{ isAnswer: boolean }>`
	width: 100%;
	${({ isAnswer, theme }) => `
     background-color: ${
				isAnswer ? theme.colors.BLUE_500 : theme.colors.RED_500
			};
  `}
`;

export default Chart;
