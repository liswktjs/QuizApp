import styled from '@emotion/styled';

export const Container = styled.article``;

export const Question = styled.h2``;

export const QuizList = styled.ul`
	display: flex;
`;

export const QuizItem = styled.li<{ isSelected: boolean }>`
	display: flex;
	width: 100%;

	border-radius: 4px;
	padding: 10px;

	${({ theme, isSelected }) => `
    background: ${isSelected ? theme.colors.GREEN_500 : theme.colors.WHITE};
    border: 1px solid ${
			isSelected ? theme.colors.GREEN_500 : theme.colors.BLACK
		};
    color: ${isSelected ? theme.colors.WHITE : theme.colors.BLACK};

    &:hover, 
    &:active {
      background: ${theme.colors.GREEN_500};
      border: ${theme.colors.GREEN_500};
      color: ${theme.colors.WHITE};
      cursor: pointer;
	  }
  `}
`;

export const ButtonContainer = styled.div``;
