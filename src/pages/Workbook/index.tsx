import Button from '../../components/@common/Button/Button';

import useWorkbookState from './useWorkbookState';

import * as S from './index.styles';

const Workbook = () => {
	const {
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
					<S.Question>{question}</S.Question>
					<S.QuizList>
						{problemList.map((item, index) => (
							<S.QuizItem
								key={index}
								isSelected={item === selectedQuizItem}
								onClick={() => onQuizItemClick(item)}
							>
								{item}
							</S.QuizItem>
						))}
					</S.QuizList>
					<S.ButtonContainer>
						{isSelected && isNextExist && (
							<Button onClick={onNextQuizButtonClick}>다음 문제</Button>
						)}
						{isSelected && !isNextExist && (
							<Button onClick={onFinalQuizButtonClick}>결과 보기</Button>
						)}
					</S.ButtonContainer>
				</S.Container>
			)}
		</div>
	);
};

export default Workbook;
