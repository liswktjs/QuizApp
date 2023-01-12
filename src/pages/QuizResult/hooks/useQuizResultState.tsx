import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { gameReportAtom, gameTakingTime } from '../../../store';

import { UserAnswerItemType } from '../../../types/quiz';

const useQuizResultState = () => {
	const navigate = useNavigate();
	const userQuizInfo: UserAnswerItemType[] = useAtomValue(gameReportAtom);
	const { min, sec } = useAtomValue(gameTakingTime);

	const [takingTime, setTakingTime] = useState('');

	useEffect(() => {
		setTakingTime(`${min}분 ${sec}초`);
	}, [min, sec]);

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

	const onHomeButtonClick = () => {
		navigate('/');
	};

	return {
		takingTime,
		rightCount: getAnswerCount(true),
		wrongCount: getAnswerCount(false),
		onWrongAnswerNoteButtonClick,
		onHomeButtonClick,
	};
};

export default useQuizResultState;
