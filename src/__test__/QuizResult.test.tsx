import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';

import theme from '../styles/theme';

import QuizResult from '../pages/QuizResult';

describe('QuizResult 관련 테스트', () => {
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

	test('문제 풀이 결과에 대해 안내하는 곳이 존재하는지 확인한다', async () => {
		render(<QuizResult />, { wrapper });

		const answerCount = screen.getByTestId('answer-count');
		const wrongAnswerCount = screen.getByTestId('wrong-answer-count');
		const totalCount = screen.getByTestId('total-count');

		expect(answerCount.textContent).toContain('정답');
		expect(wrongAnswerCount.textContent).toContain('오답');
		expect(totalCount.textContent).toContain('총 소요');
	});
});
