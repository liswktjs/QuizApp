export const preventRefresh = (e: BeforeUnloadEvent) => {
	e.preventDefault();
	e.returnValue = '';
};
