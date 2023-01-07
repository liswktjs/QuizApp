import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';

import App from './App';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLDivElement,
);

export const queryClient = new QueryClient();

root.render(
	<QueryClientProvider client={queryClient}>
		<Provider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</QueryClientProvider>,
);
