import { useQuery } from '@tanstack/react-query';
import { getQuizzes } from '../api/quiz';
import { QuizResponseType } from '../types/quiz';

const useGetQuizzes = () => {
	const { data, isLoading, isSuccess, isError, refetch } =
		useQuery<QuizResponseType>(['quiz'], getQuizzes);

	return {
		data,
		isSuccess,
		isLoading,
		isError,
		refetch,
	};
};

export default useGetQuizzes;
