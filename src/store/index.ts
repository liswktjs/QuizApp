import { atom } from 'jotai';

const snackBarStateAtom = atom({
	isActive: false,
	message: '',
});

export { snackBarStateAtom };
