import React from "react";
import { mealData } from "@/public/data/data";
import { iMealRow } from "@/public/data/types";
import TableRow from "./__components/TableRows";

const page = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Plan Type</th>
            <th> Date </th>
            <th>Meals Left</th>
          </tr>
        </thead>

        <tbody className="border-[5px]">
          {mealData.map((row: iMealRow, i: number) => (
            <TableRow i={i} key={i} {...row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default page;
