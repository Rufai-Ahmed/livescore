"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BiSearch } from "react-icons/bi";
import { FaAngleRight } from "react-icons/fa6";
import Modal from "../components/Modal";
import { setCategory } from "../../public/utils/slice";
import CategoryData from "./__components/CategoryData";
import ContentData from "./__components/ContentData";
import Pagination from "./__components/Pagination";
import {
  useGetFoodByCategoryQuery,
  useGetAllfoodQuery,
} from "@/public/utils/foodApi";

const Page: FC = () => {
  const dispatch = useDispatch();
  const category = useSelector((state: any) => state.auth.category);
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: all,
    error: err,
    isLoading: isLoad,
    refetch: refetchAll,
  }: any = useGetAllfoodQuery();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(setCategory("all"));
    if (category === "all") {
      refetchAll();
    }
  }, [category, refetchAll]);

  if (isLoad) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="loading loading-spinner" />
      </div>
    );
  }

  console.log(all);

  const dataToDisplay = all?.foods;
  const totalPages = Math.ceil((dataToDisplay?.length || 0) / itemsPerPage);

  return (
    <main className="w-full min-h-screen">
      <div className="w-full flex justify-between text-black">
        <div>
          <Modal />
        </div>

        <div className="bg-white gap-2 pl-3 w-[400px] py-2 rounded-md flex items-center">
          <BiSearch
            size={20}
            className="mr-0 text-emerald-600 cursor-pointer"
          />
          <input
            type="text"
            placeholder="What do you want to eat today..."
            className="border-none w-full h-full bg-transparent outline-none flex-1 placeholder:text-[14px]"
          />
        </div>
      </div>

      {/* <CategoryData handleCategoryClick={handleCategoryClick} /> */}

      <ContentData
        data={dataToDisplay}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
};

export default Page;
