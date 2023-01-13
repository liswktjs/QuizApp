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
		const modal = document.createElement('div');
		modal.className = modalId;
		document.body.appendChild(modal);

		return ReactDOM.createPortal(children, modal);
	}
	return ReactDOM.createPortal(children, modalElement);
};

export default CreatePortal;
