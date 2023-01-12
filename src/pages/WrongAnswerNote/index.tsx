import Button from '../../components/@common/Button/Button';
import WrongAnswerQuizItem from './WrongAnswerQuizItem/WrongAnswerQuizItem';

import useWrongAnswerNoteState from './hooks/useWrongAnswerNoteState';

import * as S from './index.styles';

const WrongAnswerNote = () => {
	const {
		wrongAnswerQuizList,
		currentQuizIndex,
		onPrevButtonClick,
		onNextButtonClick,
		onFinalButtonClick,
	} = useWrongAnswerNoteState();

	return (
		<S.Container>
			<S.ProblemContainer>
				{wrongAnswerQuizList && (
					<WrongAnswerQuizItem {...wrongAnswerQuizList[currentQuizIndex]} />
				)}
			</S.ProblemContainer>
			<S.ButtonContainer>
				{wrongAnswerQuizList && currentQuizIndex >= 1 && (
					<S.PrevButtonContainer>
						<Button onClick={onPrevButtonClick}>이전 문제</Button>
					</S.PrevButtonContainer>
				)}
				{wrongAnswerQuizList &&
					wrongAnswerQuizList.length - 1 > currentQuizIndex && (
						<S.NextButtonContainer>
							<Button onClick={onNextButtonClick}>다음문제</Button>
						</S.NextButtonContainer>
					)}
				{wrongAnswerQuizList &&
					currentQuizIndex === wrongAnswerQuizList.length - 1 && (
						<S.FinalButtonContainer>
							<Button onClick={onFinalButtonClick}>
								마지막 문제입니다 홈으로 돌아가기
							</Button>
						</S.FinalButtonContainer>
					)}
			</S.ButtonContainer>
		</S.Container>
	);
};

export default WrongAnswerNote;
