import { rest } from 'msw';
import { QuizResponseType } from '../types/quiz';

import mockQuizList from './quizList.json';

export const QuizHandler = [
	rest.get<QuizResponseType>(
		'https://opentdb.com/api.php?amount=10&type=multiple',
		(req, res, ctx) => {
			return res(ctx.status(200), ctx.json(mockQuizList));
		},
	),
];
