import Chart from '../../components/Chart/Chart';
import Button from '../../components/@common/Button/Button';

import useQuizResultState from './hooks/useQuizResultState';

import * as S from './index.styles';

const QuizResult = () => {
	const { takingTime, rightCount, wrongCount, onWrongAnswerNoteButtonClick } =
		useQuizResultState();

	return (
		<S.Container>
			<S.Title>풀이 결과</S.Title>
			<S.Report>
				<div>정답 : {rightCount}개</div>
				<div>오답 : {wrongCount}개</div>
				<div>총 소요 시간: {takingTime}</div>
			</S.Report>
			<S.ChartContainer>
				<Chart
					totalCount={rightCount + wrongCount}
					rightCount={rightCount}
					wrongCount={wrongCount}
				/>
			</S.ChartContainer>
			<S.ButtonContainer>
				<Button onClick={onWrongAnswerNoteButtonClick}>오답 노트</Button>
			</S.ButtonContainer>
		</S.Container>
	);
};

export default QuizResult;
