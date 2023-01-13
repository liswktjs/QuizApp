import QuizItem from '../../components/QuizItem/QuizItem';
import Button from '../../components/@common/Button/Button';

import useWorkbookState from './hooks/useWorkbookState';

import * as S from './index.styles';

const Workbook = () => {
	const {
		id,
		problemList,
		question,
		selectedQuizItem,
		isSelected,
		isNextExist,
		onQuizItemClick,
		onNextQuizButtonClick,
		onFinalQuizButtonClick,
	} = useWorkbookState();

	return (
		<div>
			{problemList && (
				<S.Container>
					<S.QuizContentContainer>
						<QuizItem
							id={id}
							question={question}
							problemList={problemList}
							selectedQuizItem={selectedQuizItem}
							onQuizItemClick={onQuizItemClick}
						/>
						<S.ButtonContainer>
							{isSelected && isNextExist && (
								<Button
									testName={'next-quiz-button'}
									onClick={onNextQuizButtonClick}
								>
									다음 문제
								</Button>
							)}
							{isSelected && !isNextExist && (
								<Button
									testName={'final-quiz-button'}
									onClick={onFinalQuizButtonClick}
								>
									결과 보기
								</Button>
							)}
						</S.ButtonContainer>
					</S.QuizContentContainer>
				</S.Container>
			)}
		</div>
	);
};

export default Workbook;
