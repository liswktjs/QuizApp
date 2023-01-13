import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { renderHook } from '@testing-library/react-hooks';

import { QuizHandler } from '../mock';
import { ThemeProvider } from '@emotion/react';

import useGetQuizzes from '../hooks/useGetQuizzes';

import theme from '../styles/theme';

const server = setupServer(...QuizHandler);

describe('quiz api관련 테스트를 진행합니다', () => {
	const queryClient = new QueryClient();
	const wrapper = ({ children }: { children: React.ReactNode }) => (
		<React.StrictMode>
			<ThemeProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<BrowserRouter>{children}</BrowserRouter>
				</QueryClientProvider>
			</ThemeProvider>
		</React.StrictMode>
	);

	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	test('퀴즈 조회 결과 문항에 대한 답안이 4개인지 확인합니다', async () => {
		const { result, waitFor } = renderHook(() => useGetQuizzes(), { wrapper });
		await waitFor(() => result.current.isSuccess);
		const { data } = result.current;

		if (typeof data === 'undefined') {
			return;
		}

		expect(data.results[0].type).toEqual('multiple');
		expect(data.results[0].incorrect_answers.length + 1).toEqual(4);
	});

	test('퀴즈 조회를 할 때에 사전에 기대한 항목들이 모두 존재하는지 확인합니다', async () => {
		const { result, waitFor } = renderHook(() => useGetQuizzes(), { wrapper });
		await waitFor(() => result.current.isSuccess);
		const { data } = result.current;

		if (typeof data === 'undefined') {
			return;
		}
		const quiz = data.results[0];
		const isDifficultyCheck = () => {
			if (
				quiz.difficulty === 'easy' ||
				quiz.difficulty === 'medium' ||
				quiz.difficulty === 'hard'
			) {
				return true;
			}
			return false;
		};

		expect(quiz.category.length >= 1).toEqual(true);
		expect(isDifficultyCheck()).toEqual(true);
		expect(quiz.type).toEqual('multiple');
		expect(quiz.question.length >= 1).toEqual(true);
		expect(typeof quiz.correct_answer === 'string').toEqual(true);
		expect(Array.isArray(quiz.incorrect_answers)).toEqual(true);
		expect(Number.isInteger(data.response_code)).toEqual(true);
	});
});
