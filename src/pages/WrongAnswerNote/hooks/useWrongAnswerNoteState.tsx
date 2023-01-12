import { useAtomValue } from 'jotai';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '../../../';

import { gameReportAtom } from '../../../store';
import {
	QuizResponseType,
	UserAnswerItemType,
	UserWrongAnswerItemType,
} from '../../../types/quiz';

import { changeCodeToString } from '../../../utils';

const useWrongAnswerNoteState = () => {
	const navigate = useNavigate();
	const quizList: QuizResponseType | undefined = queryClient.getQueryData([
		'quiz',
	]);
	const userQuizInfo: UserAnswerItemType[] = useAtomValue(gameReportAtom);

	const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

	const wrongAnswerQuizList = useMemo(() => {
		if (typeof quizList !== 'undefined' && userQuizInfo.length >= 1) {
			const list = quizList.results
				.map((item, index) => {
					if (!userQuizInfo[index].isCorrect) {
						return {
							difficulty: item.difficulty,
							question: changeCodeToString(item.question),
							answer: changeCodeToString(item.correct_answer),
							userChoice: changeCodeToString(userQuizInfo[index].userChoice),
							incorrect_answers: item.incorrect_answers.map((item) =>
								changeCodeToString(item),
							),
						};
					}
					return;
				})
				.filter((item) => typeof item !== 'undefined');
			return list as UserWrongAnswerItemType[];
		}
	}, [quizList, userQuizInfo]);

	const onPrevButtonClick = () => {
		setCurrentQuizIndex((prev) => prev - 1);
	};

	const onNextButtonClick = () => {
		setCurrentQuizIndex((prev) => prev + 1);
	};

	const onFinalButtonClick = () => {
		navigate('/');
	};

	return {
		wrongAnswerQuizList,
		currentQuizIndex,
		onPrevButtonClick,
		onNextButtonClick,
		onFinalButtonClick,
	};
};

export default useWrongAnswerNoteState;
