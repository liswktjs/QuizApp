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

export const changeCodeToString = (content: string) => {
	content = content.replaceAll('<br>', '\n');
	content = content.replaceAll('&gt;', '>');
	content = content.replaceAll('&lt;', '<');
	content = content.replaceAll('&quot;', '');
	content = content.replaceAll('&nbsp;', ' ');
	content = content.replaceAll('&amp;', '&');
	content = content.replaceAll('&ograve;', 'O');
	content = content.replaceAll('&#039;', `'`);
	content = content.replaceAll('&Uuml;', 'U');
	content = content.replaceAll('&eacute;', 'é');
	return content;
};
