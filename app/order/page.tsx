"use client";
import TableRow from "../components/TableRow";
import OrderModal from "../components/OrderModal";
import { tableData } from "../../public/data/data";
import { iTableRow } from "../../public/data/types";

const Page = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Food</th>
            <th>User Name</th>
            <th>Time</th>
            <th>Order ID</th>
            <th>Order Status</th>
          </tr>
        </thead>

        <tbody className="border-[5px]">
          {tableData.map((row: iTableRow, i: number) => (
            <TableRow i={i} key={i} {...row} />
          ))}
        </tbody>
      </table>

      {tableData.map((_, i) => (
        <OrderModal i={i} key={i} />
      ))}
    </div>
  );
};

export default Page;
