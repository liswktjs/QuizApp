import { PropsWithChildren } from 'react';
import * as ReactDOM from 'react-dom';

interface CreatePortalProps {
	modalId: 'timer' | 'snack-bar';
}

const CreatePortal = ({
	modalId,
	children,
}: PropsWithChildren<CreatePortalProps>) => {
	const modalElement = document.getElementById(modalId);
	if (modalElement === null) {
		throw new Error('모달을 찾을 수 없습니다');
	}
	return ReactDOM.createPortal(children, modalElement);
};

export default CreatePortal;
