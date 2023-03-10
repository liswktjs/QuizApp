export interface QuizResponseType {
	response_code: number;
	results: QuizItemType[];
}

export interface QuizItemType {
	category: string;
	type: 'multiple';
	difficulty: 'easy' | 'medium' | 'hard';
	question: string;
	correct_answer: string;
	incorrect_answers: string[];
}

export interface UserAnswerItemType {
	isCorrect: boolean;
	answer: string;
	userChoice: string;
	quizIndex: number;
}

export interface UserWrongAnswerItemType {
	difficulty: 'easy' | 'medium' | 'hard';
	question: string;
	answer: string;
	userChoice: string;
	incorrect_answers: string[];
}
