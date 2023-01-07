import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';
import { Global, ThemeProvider } from '@emotion/react';

import theme from '../src/styles/theme.ts';
import { reset } from '../src/styles/reset.tsx';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};

const queryClient = new QueryClient();

export const decorators = [
	(Story) => (
		<ThemeProvider theme={theme}>
			<Global styles={reset} />
			<Provider>
				<QueryClientProvider client={queryClient}>
					<Story />
				</QueryClientProvider>
			</Provider>
		</ThemeProvider>
	),
];
