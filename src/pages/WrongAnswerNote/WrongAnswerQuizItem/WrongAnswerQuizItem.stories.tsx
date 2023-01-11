import { Meta, Story } from '@storybook/react';
import WrongAnswerQuizItem, {
	WrongAnswerQuizItemProps,
} from './WrongAnswerQuizItem';

export default {
	title: 'WrongAnswerQuizItem',
	component: WrongAnswerQuizItem,
} as Meta;

const Template: Story<WrongAnswerQuizItemProps> = (args) => (
	<WrongAnswerQuizItem {...args} />
);

export const DefaultWrongAnswerQuizItem = Template.bind({});

DefaultWrongAnswerQuizItem.args = {
	difficulty: 'easy',
	question: '문제의 질문이 보여질 공간입니다',
	answer: '정답예시',
	userChoice: '잘못된 답',
	incorrect_answers: ['잘못된 답', '잘못된 답1', '잘못된 답2'],
};
