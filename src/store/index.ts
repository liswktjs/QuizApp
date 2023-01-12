import { atom } from 'jotai';
import { UserAnswerItemType } from '../types/quiz';

const snackBarStateAtom = atom({
	isActive: false,
	message: '',
});

const timerStateAtom = atom({
	isToggle: false,
});

const gameStateAtom = atom({
	isProgress: false,
	isEnd: false,
});

const gameReportAtom = atom<UserAnswerItemType[]>([]);

const gameTakingTime = atom({
	min: 0,
	sec: 0,
});

export {
	snackBarStateAtom,
	timerStateAtom,
	gameStateAtom,
	gameReportAtom,
	gameTakingTime,
};
