import { useGetOrganizationQuery } from "@/public/utils/organizationApi";
import React, { FC, use } from "react";

const MemberModal: FC<iOrganization> = ({ _id }) => {
  const { data: getOrganizations, isLoading } = useGetOrganizationQuery();

  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="loading loading-spinner" />
      </div>
    );

  const getData: iOrganization | undefined = getOrganizations?.find(
    (el: iOrganization) => el._id === _id
  );

  return (
    <>
      <dialog id={`orgModal${_id}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div>
            <h1 className="font-bold mb-5 text-[1.5vw] ">
              Organization Name: {getData?.name}
            </h1>

            <h1 className="font-bold mb-5 text-[30px] ">
              Members:{" "}
              <span className="text-[19px]">
                {!getData?.members! ||
                  (getData?.members.length === 0 && "No member added")}{" "}
              </span>
            </h1>

            {getData?.members?.map((el: iOrganization, i: number) => (
              <p key={i}>
                <span className="font-bold">{i + 1}.</span> {el.name} - _id:{" "}
                {el?._id}
              </p>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
};

export default MemberModal;
