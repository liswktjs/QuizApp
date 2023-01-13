import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react-hooks';
import { fireEvent, render, screen } from '@testing-library/react';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';

import { setupServer } from 'msw/node';
import { QuizHandler } from '../mock';

import useHandleQuizState from '../hooks/useHandleQuizState';
import useGetQuizzes from '../hooks/useGetQuizzes';

import theme from '../styles/theme';

import App from '../App';

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
				retry: 2,
				retryDelay: 2,
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

	beforeAll(() => {
		server.listen();
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

	test('Workbook 페이지에 문제들이 렌더링 되었는지 확인한다', async () => {
		render(<App />, { wrapper });
		const { result: quizResult, waitFor: waitGetQuizFor } = renderHook(
			() => useGetQuizzes(),
			{
				wrapper,
			},
		);
		await waitGetQuizFor(() => quizResult.current.isSuccess);
		const startQuizButton = screen.getByTestId('start-quiz-button');
		fireEvent.click(startQuizButton);

		const { result: quizState, waitFor } = renderHook(
			() => useHandleQuizState(1),
			{ wrapper },
		);
		await waitFor(() => quizState.current.problemList.length >= 1);

		const questionIndex = screen.getByTestId('question-index');
		const selectorList = screen.getAllByTestId('quiz-item');
		expect(questionIndex.textContent).toEqual('문제 1');
		expect(selectorList.length).toEqual(4);
	});
});
