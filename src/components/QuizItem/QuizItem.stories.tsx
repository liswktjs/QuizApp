import { Meta, Story } from '@storybook/react';
import QuizItem, { QuizItemProps } from './QuizItem';

export default {
	title: 'QuizItem',
	component: QuizItem,
} as Meta;

const Template: Story<QuizItemProps> = (args) => <QuizItem {...args} />;

export const DefaultQuizItem = Template.bind({});

DefaultQuizItem.args = {
	id: '1',
	question:
		'In what Disney movie can you spot the character Pac-Man in if you look closely enough in some scenes?',
	problemList: [
		'문제가 매우 길어졌을 때에 어떻게 처리를 할지 고려하는 예시 문장입니다 문제의 보기가 두 문장이상일 만큼 길 때에는  어떻게 처리할 것인지 예상 문장입니다',
		'3',
		'5',
		'4',
	],
	selectedQuizItem: '5',
	onQuizItemClick: (quizItem = '5') => {
		console.log('quiz click');
	},
};
