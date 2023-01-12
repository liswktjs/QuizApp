import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';

import { gameReportAtom } from '../../../store';

import { UserAnswerItemType } from '../../../types/quiz';

const useQuizResultState = () => {
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

	const onWrongAnswerNoteButtonClick = () => {
		navigate('/wrong-answer-note');
	};

	return {
		rightCount: getAnswerCount(true),
		wrongCount: getAnswerCount(false),
		onWrongAnswerNoteButtonClick,
	};
};

export default useQuizResultState;
