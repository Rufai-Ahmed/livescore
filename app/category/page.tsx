import React from "react";
import CategoryModal from "./__components/CategoryModal";
import { iCategory } from "@/interfaces";
import Modal from "./__components/Modal";
import TableRow from "./__components/TableRow";
import { categoryData2 } from "@/public/data/data";

const page = () => {
  return (
    <div className="">
      <Modal />

      <table className="table mt-10">
        <thead>
          <tr>
            <th>Category</th>
            <th>Length of Food In Category</th>
            <th>ID</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody className="border-[5px]">
          {categoryData2 &&
            categoryData2?.map((row: iCategory, i: number) => (
              <TableRow key={i} {...row} />
            ))}
        </tbody>

        {categoryData2 &&
          categoryData2?.map((el: iCategory, i: number) => (
            <CategoryModal key={i} {...el} />
          ))}
      </table>
    </div>
  );
};

export default page;
