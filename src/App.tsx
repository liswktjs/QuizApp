import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from '@emotion/styled';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Workbook from './pages/Workbook/ index';

import { preventRefresh } from './utils';

const App = () => {
	useEffect(() => {
		(() => {
			window.addEventListener('beforeunload', preventRefresh);
		})();

		return () => {
			window.removeEventListener('beforeunload', preventRefresh);
		};
	}, []);

	return (
		<Layout>
			<Routes>
				<Route path={'/'} element={<Home />} />
				<Route path={'/workbook/:id'} element={<Workbook />} />
				<Route path={'/*'} element={<NotFound />} />
			</Routes>
		</Layout>
	);
};

const Layout = styled.div`
	min-width: 800px;
`;

export default App;
