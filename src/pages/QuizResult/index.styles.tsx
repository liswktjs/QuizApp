import styled from '@emotion/styled';

export const Container = styled.article`
	display: flex;
	flex-direction: column;

	align-items: center;
	justify-content: center;
`;

export const Title = styled.h2`
	font-size: 1.1rem;
	margin-top: 20px;
`;

export const Report = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;

	width: 300px;
	height: 100px;

	border-radius: 10px;
	margin-top: 20px;

	${({ theme }) => `
		border: 1px solid ${theme.colors.BLACK};
	`}

	div {
		font-size: 17px;
	}
`;

export const ChartContainer = styled.section`
	width: 500px;
	height: 50%;
`;

export const ButtonContainer = styled.div`
	width: 500px;
	button {
	}
`;
