import ContentTable, { iContent } from "@/app/components/ContentCard";
import { useSelector } from "react-redux";

interface ContentDataProps {
  data: iContent[];
  currentPage: number;
  itemsPerPage: number;
}

const ContentData: React.FC<ContentDataProps> = ({
  data,
  currentPage,
  itemsPerPage,
}) => {
  const category = useSelector((state: any) => state.auth.category);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData =
    data && data?.slice(startIndex, startIndex + itemsPerPage);

  console.log(paginatedData);

  return (
    <div className="w-full mt-10">
      <h2 className="font-bold text-[24px] mb-5">
        {category !== "all" ? category : "All Dishes"}{" "}
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th>Food and Category</th>
            <th>Price</th>
            <th>Plan</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody className="border-[3px]">
          {paginatedData &&
            paginatedData?.map((el: iContent, i: number) => (
              <ContentTable key={i} {...el} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContentData;
