import styled from '@emotion/styled';

export const Container = styled.article`
	display: flex;
	flex-direction: column;

	justify-content: center;
	align-items: center;
`;

export const QuizContentContainer = styled.div`
	margin-top: 20px;
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	margin-top: 20px;

	button {
		width: 200px;
	}
`;
