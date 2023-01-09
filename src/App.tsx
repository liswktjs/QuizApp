import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from '@emotion/styled';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Workbook from './pages/Workbook/index';
import QuizResult from './pages/QuizResult';
import WrongAnswerNote from './pages/WrongAnswerNote';

import SnackBar from './components/@common/SnackBar/SnackBar';
import Timer from './components/Timer/Timer';

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
				<Route path={'/quiz-result'} element={<QuizResult />} />
				<Route path={'/wrong-answer-note'} element={<WrongAnswerNote />} />
				<Route path={'/*'} element={<NotFound />} />
			</Routes>
			<SnackBar />
			<Timer />
		</Layout>
	);
};

const Layout = styled.div`
	min-width: 800px;
`;

export default App;
