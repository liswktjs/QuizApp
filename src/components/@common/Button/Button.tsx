import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

export interface ButtonProps {
	onClick: () => void;
	testName?: string;
}

const Button = ({
	onClick,
	testName,
	children,
}: PropsWithChildren<ButtonProps>) => {
	return (
		<Container data-testid={testName} onClick={onClick}>
			{children}
		</Container>
	);
};

const Container = styled.button`
	${({ theme }) => `
    background: ${theme.colors.GREEN_500};
    color: ${theme.colors.WHITE};
  `}
	border: none;
	border-radius: 4px;

	width: 100%;
	height: fit-content;

	padding: 1rem;

	&:hover,
	&:active {
		opacity: 0.7;
	}
`;

export default Button;
