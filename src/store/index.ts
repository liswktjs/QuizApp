import { atom } from 'jotai';
import { UserAnswerItemType } from '../types/quiz';

const snackBarStateAtom = atom({
	isActive: false,
	message: '',
});

const gameStateAtom = atom({
	isProgress: false,
});

const gameReportAtom = atom<UserAnswerItemType[]>([]);

export { snackBarStateAtom, gameStateAtom, gameReportAtom };
