import React, { FC, FormEvent } from "react";

const DeleteModal: FC<{ _id?: string }> = ({ _id }) => {
  const handleDelete = () =>
    (
      document.getElementById(`prod_delete_${_id}`) as HTMLDialogElement
    ).close();
  const closeModal = () =>
    (
      document.getElementById(`prod_delete_${_id}`) as HTMLDialogElement
    ).close();

  const handleClick = (e: FormEvent<HTMLFormElement>) => {};

  return (
    <dialog id={`prod_delete_${_id}`} className="modal">
      <div className="modal-box">
        <form onSubmit={handleClick}>
          <button
            onClick={() =>
              document?.getElementById(`prod_delete_${_id}`)?.close()!
            }
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <main>
            <div>
              <p className="text-[19px]">
                Are you sure you want to <b>delete</b>?
              </p>

              <div className="flex items-center mt-5 text-white gap-5 justify-center">
                <button
                  onClick={handleDelete}
                  className="btn btn-error w-[45%] text-white"
                >
                  Yes
                </button>
                <button
                  onClick={closeModal}
                  className="btn btn-success w-[45%] text-white"
                >
                  No
                </button>
              </div>
            </div>
          </main>
        </form>
      </div>
    </dialog>
  );
};

export default DeleteModal;
