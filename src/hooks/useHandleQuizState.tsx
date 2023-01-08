import { useMemo } from 'react';
import { queryClient } from '../';

import { QuizResponseType } from '../types/quiz';

import { makeRandomQuizList } from '../utils';

const useHandleQuizState = (currentId: number) => {
	const quizList: QuizResponseType | undefined = queryClient.getQueryData([
		'quiz',
	]);

	if (typeof quizList === 'undefined') {
		throw new Error('퀴즈가 존재하지 않습니다');
	}
	if (currentId > quizList.results.length) {
		throw new Error('퀴즈 Id를 다시 확인해주세요');
	}

	const quiz = quizList.results[currentId - 1];

	const problemList = useMemo(
		() =>
			makeRandomQuizList({
				correctAnswer: quiz.correct_answer,
				inCorrectAnswer: quiz.incorrect_answers,
			}),
		[currentId],
	);

	return {
		answer: quiz.correct_answer,
		question: quiz.question,
		problemList,
		isNextExist: currentId === quizList.results.length ? false : true,
	};
};

export default useHandleQuizState;
