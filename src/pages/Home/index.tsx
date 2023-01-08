import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/@common/Button/Button';

import useGetQuizzes from '../../hooks/useGetQuizzes';

import { gameStateAtom } from '../../store';

import * as S from './index.styles';

const Home = () => {
	const navigate = useNavigate();
	const {
		isSuccess: isFetchQuizSuccess,
		isError: isFetchQuizError,
		refetch,
	} = useGetQuizzes();
	const [_, setGameState] = useAtom(gameStateAtom);

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

	return (
		<S.Container>
			<S.Title>클래스팅- Quiz App</S.Title>
			<S.ButtonContainer>
				<Button onClick={onGameStartButtonClick}>퀴즈풀기</Button>
			</S.ButtonContainer>
		</S.Container>
	);
};

export default Home;
