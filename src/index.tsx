import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';
import { Global, ThemeProvider } from '@emotion/react';

import App from './App';
import theme from './styles/theme';
import { reset } from './styles/reset';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLDivElement,
);

export const queryClient = new QueryClient();

root.render(
	<ThemeProvider theme={theme}>
		<Global styles={reset} />
		<QueryClientProvider client={queryClient}>
			<Provider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		</QueryClientProvider>
	</ThemeProvider>,
);
