const colors = {
	GREEN_500: '#00c896',
	BLUE_500: '#53BBE4',
	RED_500: '#EF7676',
	WHITE: '#ffffff',
	BLACK: '#111111',
};

const zIndex = {
	SNACK_BAR: 10,
	TIMER_BACKGROUND: -2,
	TIMER: -1,
};

const theme = {
	colors,
	zIndex,
} as const;

export default theme;
