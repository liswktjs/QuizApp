import { Meta, Story } from '@storybook/react';

import Chart, { ChartProps } from './Chart';

export default {
	title: 'Chart',
	component: Chart,
} as Meta;

const Template: Story<ChartProps> = (args) => <Chart {...args} />;

export const DefaultChart = Template.bind({});
DefaultChart.args = {
	totalCount: 10,
	wrongCount: 4,
	rightCount: 6,
};
