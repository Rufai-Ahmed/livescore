import React, { FC, ReactNode } from "react";

export interface iCard {
  icon?: ReactNode;
  lgTxt?: string;
  smTxt?: string;
  btnColour?: boolean;
}

const Card: FC<iCard> = ({ icon, btnColour, lgTxt, smTxt }) => {
  return (
    <div className="flex p-5 bg-white items-center justify-center rounded-lg gap-5 shadow-md">
      <div className="w-[60px] h-[60px] rounded-full bg-[#e5a5b1] text-[#a72036] flex items-center justify-center">
        {icon}
      </div>
      <div className="space-y-">
        <h1 className="font-bold text-[30px]">{lgTxt}</h1>
        <p>{smTxt}</p>

        <div className="flex items-center gap-2 mt-2">
          <div
            className={`w-2 h-2 rounded-full  border-[6px] border-green-300 ${
              btnColour ? "bg-[#96db12]" : "bg-red-300"
            }`}
          />

          <p>4%</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
