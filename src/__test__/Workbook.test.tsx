import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import * as router from 'react-router';
import theme from '../styles/theme';

import { QuizHandler } from '../mock';
import { setupServer } from 'msw/node';

import useHandleQuizState from '../hooks/useHandleQuizState';

import useGetQuizzes from '../hooks/useGetQuizzes';

const server = setupServer(...QuizHandler);

describe('Workbook 관련 테스트', () => {
	const root = document.createElement('div');
	const snackBar = document.createElement('div');
	snackBar.className = 'snack-bar';
	const timer = document.createElement('div');
	timer.className = 'timer';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: 1,
				retryDelay: 1,
			},
		},
	});
	document.body.appendChild(root);
	document.body.appendChild(timer);
	document.body.appendChild(snackBar);

	const wrapper = ({ children }: { children: React.ReactNode }) => (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>{children}</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
	const navigate = jest.fn();

	beforeAll(() => {
		server.listen();
		jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
	});
	afterEach(() => {
		server.resetHandlers();
		queryClient.clear();
	});
	afterAll(() => server.close());

	test('useHandleQuizState를 통해 값이 제대로 전달되고 있는지 확인한다', async () => {
		const { result: quizResult, waitFor: waitGetQuizFor } = renderHook(
			() => useGetQuizzes(),
			{
				wrapper,
			},
		);
		await waitGetQuizFor(() => quizResult.current.isSuccess);
		const { result: quizState, waitFor } = renderHook(
			() => useHandleQuizState(1),
			{ wrapper },
		);
		await waitFor(() => quizState.current.isNextExist);
		expect(quizState.current.isNextExist).toEqual(true);
		expect(quizState.current.question).toEqual(
			'What is the powerhouse of the cell?',
		);
		expect(quizState.current.answer).toEqual('Mitochondria');
		expect(quizState.current.problemList.length).toEqual(4);
	});
});
