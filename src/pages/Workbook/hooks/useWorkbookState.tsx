import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai';

import useHandleQuizState from '../../../hooks/useHandleQuizState';
import useSnackBar from '../../../hooks/useSnackBar';

import { gameReportAtom, gameStateAtom } from '../../../store';

const useWorkbookState = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { answer, question, problemList, isNextExist } = useHandleQuizState(
		Number(id),
	);
	const [isSelected, setIsSelected] = useState(false);
	const [selectedQuizItem, setSelectedQuizItem] = useState<string | null>(null);

	const setGameState = useSetAtom(gameStateAtom);
	const [gameReport, setGameReport] = useAtom(gameReportAtom);

	const { showSnackBar } = useSnackBar();

	useEffect(() => {
		setSelectedQuizItem(null);
		setIsSelected(false);
	}, [id]);

	const onQuizItemClick = (quizItem: string) => {
		if (typeof id === 'undefined') {
			return;
		}
		if (isSelected) {
			showSnackBar('이미 답을 선택하셨습니다 다음 문제를 풀어주세요');
			return;
		}
		setIsSelected(true);
		setSelectedQuizItem(quizItem);

		setGameReport([
			...gameReport,
			{
				isCorrect: quizItem === answer,
				answer: answer,
				userChoice: quizItem,
				quizIndex: Number(id),
			},
		]);

		if (quizItem === answer) {
			showSnackBar('정답입니다');
		}
		if (quizItem !== answer) {
			showSnackBar('오답입니다');
		}
	};

	const onNextQuizButtonClick = () => {
		navigate(`/workbook/${Number(id) + 1}`);
	};
	const onFinalQuizButtonClick = () => {
		setGameState({ isProgress: false, isEnd: true });
		navigate('/quiz-result');
	};

	return {
		id,
		problemList,
		question,
		selectedQuizItem,
		isSelected,
		isNextExist,
		onQuizItemClick,
		onNextQuizButtonClick,
		onFinalQuizButtonClick,
	};
};

export default useWorkbookState;
