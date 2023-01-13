import Button from '../../components/@common/Button/Button';
import useHomeState from './hooks/useHomeState';

import * as S from './index.styles';

const Home = () => {
	const { onGameStartButtonClick } = useHomeState();
	return (
		<S.Container>
			<S.Title>클래스팅- Quiz App</S.Title>
			<S.ButtonContainer>
				<Button testName={'start-quiz-button'} onClick={onGameStartButtonClick}>
					퀴즈풀기
				</Button>
			</S.ButtonContainer>
		</S.Container>
	);
};

export default Home;
