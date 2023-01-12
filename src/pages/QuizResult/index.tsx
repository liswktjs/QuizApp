import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';

import Chart from '../../components/Chart/Chart';
import Button from '../../components/@common/Button/Button';

import { gameReportAtom } from '../../store';

import { UserAnswerItemType } from '../../types/quiz';

import * as S from './index.styles';

const QuizResult = () => {
	const navigate = useNavigate();
	const userQuizInfo: UserAnswerItemType[] = useAtomValue(gameReportAtom);

	const getAnswerCount = (isRight: boolean) => {
		let result = 0;
		if (userQuizInfo.length >= 1) {
			if (isRight) {
				result = userQuizInfo.reduce(
					(prev, cur) => (cur.isCorrect ? prev + 1 : prev),
					0,
				);
			}
			if (!isRight) {
				result = userQuizInfo.reduce(
					(prev, cur) => (!cur.isCorrect ? prev + 1 : prev),
					0,
				);
			}
		}
		return result;
	};
	const rightCount = getAnswerCount(true);
	const wrongCount = getAnswerCount(false);

	const onWrongAnswerNoteButtonClick = () => {
		navigate('/wrong-answer-note');
	};

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
