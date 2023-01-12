import styled from '@emotion/styled';

export interface WrongAnswerQuizItemProps {
	difficulty: 'easy' | 'medium' | 'hard';
	question: string;
	answer: string;
	userChoice: string;
	incorrect_answers: string[];
}

const WrongAnswerQuizItem = ({
	difficulty,
	question,
	answer,
	userChoice,
	incorrect_answers,
}: WrongAnswerQuizItemProps) => {
	const filterUserChoice = () => {
		return incorrect_answers.filter((item) => item !== userChoice);
	};
	return (
		<Container>
			<Question>{question}</Question>
			<Difficulty>
				<span>난이도</span>
				{difficulty}
			</Difficulty>
			<RightAnswer>
				<span>문제 정답 👉</span>
				<div>{answer}</div>
			</RightAnswer>
			<UserChoice>
				<span>선택한 답 👉</span>
				<div>{userChoice}</div>
			</UserChoice>
			<WrongAnswerList>
				<div>이외의 문제 보기들</div>
				{filterUserChoice().map((item, index) => (
					<WrongAnswerItem key={index}>{item}</WrongAnswerItem>
				))}
			</WrongAnswerList>
		</Container>
	);
};

const Container = styled.section`
	${({ theme }) => `
		border: 1px solid ${theme.colors.BLACK};
	`}
	display: flex;
	flex-direction: column;
	border-radius: 4px;

	padding: 10px;
`;

const Question = styled.title`
	display: block;

	font-size: 1.1rem;
	line-height: 1.5;
	margin: 10px 0;
`;

const Difficulty = styled.div`
	font-size: 0.9rem;
	span {
		margin-right: 5px;
	}
`;

const RightAnswer = styled.div`
	span {
		margin-right: 5px;
		border-bottom: none;
		padding: 5px;
	}
	div {
		padding: 5px;
	}
	display: flex;
	margin-top: 10px;
`;

const UserChoice = styled.div`
	display: flex;
	margin-top: 10px;
	span {
		display: block;
		margin-right: 5px;
		padding: 5px;
	}
	div {
		padding: 5px;
	}
`;

const WrongAnswerList = styled.ul`
	margin-top: 20px;
`;

const WrongAnswerItem = styled.li`
	${({ theme }) => `
		
		background-color: ${theme.colors.WHITE};
		border: 1px solid ${theme.colors.BLACK};
	`}
	display: block;
	border-radius: 2px;
	padding: 10px;
	margin: 15px 0;
`;

export default WrongAnswerQuizItem;
