import React, { FC, ReactNode } from "react";

const Modal: FC<{ children: ReactNode; onClose: any }> = ({
  children,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white p-4 rounded shadow-lg z-10">
        <button className="absolute top-2 right-2" onClick={onClose}>
          ✖️
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
