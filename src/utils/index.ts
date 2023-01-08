export const preventRefresh = (e: BeforeUnloadEvent) => {
	e.preventDefault();
	e.returnValue = '';
};

export const makeRandomQuizList = ({
	correctAnswer,
	inCorrectAnswer,
}: {
	correctAnswer: string;
	inCorrectAnswer: string[];
}) => {
	const questionList = [...inCorrectAnswer, correctAnswer];
	questionList.sort(() => Math.random() - 0.5);
	return questionList;
};
