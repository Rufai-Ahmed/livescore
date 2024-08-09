// TeamModal.tsx

import React from "react";

interface ModalProps {
	onClose: () => void;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
			<div className="bg-white p-6 rounded shadow-lg">
				<button
					onClick={onClose}
					className="absolute top-2 right-2 text-gray-500"
				>
					&times;
				</button>
				{children}
			</div>
		</div>
	);
};

export default Modal;
