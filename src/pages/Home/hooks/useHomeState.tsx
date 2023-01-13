import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useGetQuizzes from '../../../hooks/useGetQuizzes';

import { gameReportAtom, gameStateAtom, gameTakingTime } from '../../../store';

const useHomeState = () => {
	const navigate = useNavigate();
	const {
		isSuccess: isFetchQuizSuccess,
		isError: isFetchQuizError,
		refetch,
	} = useGetQuizzes();
	const setGameState = useSetAtom(gameStateAtom);
	const setGameReportState = useSetAtom(gameReportAtom);
	const setGameTakingTime = useSetAtom(gameTakingTime);

	useEffect(() => {
		setGameReportState([]);
		setGameTakingTime({ min: 0, sec: 0 });
	}, []);

	const onGameStartButtonClick = () => {
		if (isFetchQuizSuccess) {
			setGameState({ isProgress: true, isEnd: false });
			navigate('/workbook/1');
		}
		if (isFetchQuizError) {
			window.alert('잠시후 다시 시도해주세요');
			refetch();
		}
	};
	return {
		onGameStartButtonClick,
	};
};

export default useHomeState;
