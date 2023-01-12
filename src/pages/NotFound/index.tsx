import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import Button from '../../components/@common/Button/Button';

const NotFound = () => {
	const navigate = useNavigate();

	const onHomeButtonClick = () => {
		navigate('/');
	};
	return (
		<Container>
			<Title>404</Title>
			<Content>잘못된 경로로 접근하셨습니다</Content>
			<ButtonContainer>
				<Button onClick={onHomeButtonClick}>홈으로 이동하기</Button>
			</ButtonContainer>
		</Container>
	);
};

const Container = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: auto;
	width: 100%;
	height: 100vh;
`;

const Title = styled.h2`
	margin-bottom: 20px;
`;

const Content = styled.div`
	margin-bottom: 80px;
`;

const ButtonContainer = styled.div`
	width: 200px;
`;

export default NotFound;
