import axios from 'axios';
import { QuizResponseType } from 'src/types/quiz';

export const getQuizzes = async () => {
	const { data } = await axios.get<QuizResponseType>(
		'https://opentdb.com/api.php?amount=10',
	);
	return data;
};
