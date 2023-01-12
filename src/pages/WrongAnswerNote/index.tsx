import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '../../';

import Button from '../../components/@common/Button/Button';
import WrongAnswerQuizItem from './WrongAnswerQuizItem/WrongAnswerQuizItem';

import { gameReportAtom } from '../../store';
import {
	QuizResponseType,
	UserAnswerItemType,
	UserWrongAnswerItemType,
} from '../../types/quiz';

import * as S from './index.styles';

const WrongAnswerNote = () => {
	const userQuizInfo: UserAnswerItemType[] = useAtomValue(gameReportAtom);
	const quizList: QuizResponseType | undefined = queryClient.getQueryData([
		'quiz',
	]);
	const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
	const navigate = useNavigate();

	const generateWrongAnswerList = () => {
		if (typeof quizList !== 'undefined' && userQuizInfo.length >= 1) {
			const wrongAnswerQuiz = quizList.results.map((item, index) => {
				if (!userQuizInfo[index].isCorrect) {
					return {
						difficulty: item.difficulty,
						question: item.question,
						answer: item.correct_answer,
						userChoice: userQuizInfo[index].userChoice,
						incorrect_answers: item.incorrect_answers,
					};
				}
			});
			return wrongAnswerQuiz as UserWrongAnswerItemType[];
		}
	};

	const onPrevButtonClick = () => {
		setCurrentQuizIndex((prev) => prev - 1);
	};

	const onNextButtonClick = () => {
		setCurrentQuizIndex((prev) => prev + 1);
	};

	const onFinalButtonClick = () => {
		navigate('/');
	};

	const wrongAnswerQuizItem = generateWrongAnswerList();

	return (
		<S.Container>
			<S.ProblemContainer>
				{wrongAnswerQuizItem && (
					<WrongAnswerQuizItem {...wrongAnswerQuizItem[currentQuizIndex]} />
				)}
			</S.ProblemContainer>
			<S.ButtonContainer>
				{wrongAnswerQuizItem &&
					currentQuizIndex < wrongAnswerQuizItem.length - 1 &&
					currentQuizIndex >= 1 && (
						<Button onClick={onPrevButtonClick}>이전 문제</Button>
					)}
				{wrongAnswerQuizItem &&
				currentQuizIndex < wrongAnswerQuizItem.length - 1 ? (
					<Button onClick={onNextButtonClick}>다음문제</Button>
				) : (
					<Button onClick={onFinalButtonClick}>
						마지막 문제입니다 홈으로 돌아가기
					</Button>
				)}
			</S.ButtonContainer>
		</S.Container>
	);
};

export default WrongAnswerNote;
