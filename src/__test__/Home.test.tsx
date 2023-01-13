import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';

import Home from '../pages/Home';
import theme from '../styles/theme';

describe('Home 관련 테스트', () => {
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
		<React.StrictMode>
			<ThemeProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<BrowserRouter>{children}</BrowserRouter>
				</QueryClientProvider>
			</ThemeProvider>
		</React.StrictMode>
	);

	test('홈 화면에 문제 풀기 버튼이 있는지 확인합니다', async () => {
		render(<Home />, { wrapper });

		const startButtonQuizButton = screen.getByTestId('start-quiz-button');
		expect(startButtonQuizButton.textContent).toEqual('퀴즈풀기');
	});
});
