import styled from '@emotion/styled';

export const Container = styled.article`
	display: flex;
	flex-direction: column;

	justify-content: center;
	align-items: center;

	width: 100%;
`;

export const ProblemContainer = styled.div`
	width: 500px;
	margin-top: 40px;
`;

export const ButtonContainer = styled.div`
	position: relative;
	width: 500px;

	margin-top: 20px;
`;

export const PrevButtonContainer = styled.div`
	position: absolute;

	width: 100px;
	left: 0;
`;

export const NextButtonContainer = styled.div`
	position: absolute;
	width: 100px;
	right: 0;
`;

export const FinalButtonContainer = styled.div`
	position: absolute;
	width: fit-content;
	right: 0;
`;
