import Chart from '../../components/Chart/Chart';
import Button from '../../components/@common/Button/Button';

import useQuizResultState from './hooks/useQuizResultState';

import * as S from './index.styles';

const QuizResult = () => {
	const { rightCount, wrongCount, onWrongAnswerNoteButtonClick } =
		useQuizResultState();

	return (
		<S.Container>
			<S.Title>풀이 결과</S.Title>
			<S.Report>
				<div>정답 개수: {rightCount}</div>
				<div>오답 개수: {wrongCount} </div>
			</S.Report>
			<S.Chart>
				<Chart
					totalCount={rightCount + wrongCount}
					rightCount={rightCount}
					wrongCount={wrongCount}
				/>
			</S.Chart>
			<S.ButtonContainer>
				<Button onClick={onWrongAnswerNoteButtonClick}>오답 노트</Button>
			</S.ButtonContainer>
		</S.Container>
	);
};

export default QuizResult;
