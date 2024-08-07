import { iCategoryCard, CategoryCard } from "@/app/components/CategoryCard";
import { categoryData } from "@/public/data/data";
import React from "react";
import { FaAngleRight } from "react-icons/fa6";

interface CategoryDataProps {
  handleCategoryClick: (selectedCategory: string) => void;
}

const CategoryData: React.FC<CategoryDataProps> = ({ handleCategoryClick }) => {
  return (
    <div className="w-full mt-10">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-[24px] mb-5">Category</h2>
        <p className="flex items-center gap-4 text-[#a72036]">
          View all <FaAngleRight />
        </p>
      </div>
      <div className="flex justify-start gap-5 w-full overflow-x-auto pb-5">
        {categoryData.map((el: iCategoryCard, i: number) => (
          <CategoryCard
            key={i}
            text={el.text}
            icon={el.icon}
            onClick={() => handleCategoryClick(el.text!)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryData;
