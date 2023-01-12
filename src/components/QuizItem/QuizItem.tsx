import styled from '@emotion/styled';

export interface QuizItemProps {
	id: string | undefined;
	question: string;
	problemList: string[];
	selectedQuizItem: string | null;
	onQuizItemClick: (quizItem: string) => void;
}

const QuizItem = ({
	id,
	question,
	problemList,
	selectedQuizItem,
	onQuizItemClick,
}: QuizItemProps) => {
	return (
		<Container>
			<Question>
				<div>문제 {id}</div>
				{question}
			</Question>
			<QuizList>
				{problemList.map((item, index) => (
					<QuizContent
						key={index}
						isSelected={item === selectedQuizItem}
						onClick={() => onQuizItemClick(item)}
					>
						{item}
					</QuizContent>
				))}
			</QuizList>
		</Container>
	);
};

const Container = styled.div`
	width: 700px;
`;

const Question = styled.h2`
	font-size: 1.1rem;
	line-height: 1.5;

	div {
		font-size: 1rem;
		margin-bottom: 10px;
	}
`;

const QuizList = styled.ul`
	display: flex;
	flex-direction: column;
	margin-top: 20px;
`;

const QuizContent = styled.li<{ isSelected: boolean }>`
	display: flex;
	min-width: 80%;

	line-height: 1.5;

	border-radius: 4px;
	padding: 15px;

	margin: 20px 0;

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

export default QuizItem;
