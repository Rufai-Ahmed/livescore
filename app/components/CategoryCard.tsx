import { ReactNode, FC } from "react";
import { useDispatch } from "react-redux";
import { setCategory } from "../../public/utils/slice";

export interface iCategoryCard {
  text?: string;
  icon?: ReactNode;
  onClick?: () => void;
}

export const CategoryCard: FC<iCategoryCard> = ({ icon, text }) => {
  const dispatch = useDispatch();

  const dispatchCategory = () =>
    dispatch(setCategory(text === "All Dishes" ? "all" : text));

  return (
    <div
      onClick={dispatchCategory}
      className="p-7 rounded-md flex gap-4 flex-col items-center bg-white cursor-pointer shadow-md text-[30px]"
    >
      {icon}
      <p className="text-[#a72036] font-medium text-[20px] capitalize">
        {text}
      </p>
    </div>
  );
};
