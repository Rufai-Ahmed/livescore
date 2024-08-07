import React, { FormEvent, useState } from "react";

import { toast } from "react-toastify";
import { categoryData } from "@/public/data/data";
import { iCategoryCard } from "./CategoryCard";
import { useAddFoodMutation } from "@/public/utils/foodApi";

const Modal = () => {
  const [img, setImg] = useState<string | undefined>(undefined);
  const [addFood, { isLoading }] = useAddFoodMutation();

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const uri = URL.createObjectURL(file);
      setImg(uri);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const image = formData.get("img") as File;

    const foodData = new FormData();
    foodData.append("name", name);
    foodData.append("price", price.toString());
    foodData.append("category", category);
    foodData.append("description", description);
    foodData.append("images", image);

    try {
      await addFood(foodData).unwrap();
      toast.success("Food added successfully");
      document?.getElementById("food_modal3")?.close();
    } catch (error: any) {
      toast.error(`Failed to add food ${error.data.message}`);
      console.error("Error uploading food:", error);
    }
  };

  return (
    <>
      <button
        className="btn bg-white text-[#a72036] border border-gray-50 shadow-md"
        onClick={() => document?.getElementById("food_modal3")?.showModal()!}
      >
        Add Dish
      </button>
      <dialog id="food_modal3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <button
              onClick={() => document?.getElementById("food_modal3")?.close()!}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>

            <div>
              <div className="label-text text-[16px] font-semibold">Name</div>
              <input
                placeholder="Name"
                type="text"
                className="input border input-bordered h-[40px] w-full mt-2"
                name="name"
              />
            </div>

            <div>
              <div className="label-text text-[16px] font-semibold mt-5">
                Price
              </div>
              <input
                placeholder="Price"
                type="text"
                className="input h-[40px] border input-bordered w-full my-2"
                name="price"
              />
            </div>

            <div>
              <div className="label-text text-[16px] font-semibold mt-5">
                Category
              </div>
              <select
                name="category"
                defaultValue={"Snacks"}
                className="input h-[40px] border input-bordered w-full my-2"
              >
                {categoryData
                  .filter(
                    (el: iCategoryCard, i: number) => el.text !== "All Dishes"
                  )
                  .map((el: iCategoryCard, i: number) => (
                    <option key={i} value={el.text}>
                      {el.text}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <div className="label-text text-[16px] font-semibold mt-5">
                Description
              </div>
              <input
                placeholder="Description"
                type="text"
                className="input h-[40px] border input-bordered w-full my-2"
                name="description"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="label-text text-[16px] font-semibold mt-5">
                Upload Image
              </div>
              <input
                onChange={addImage}
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                name="img"
                id="img"
              />
              <label htmlFor="img" className="btn h-[40px]">
                Upload
              </label>
            </div>
            {img && (
              <div className="mt-4">
                <img src={img} alt="Uploaded image" width={500} height={500} />
              </div>
            )}

            <div className="w-full flex justify-end mt-5">
              <button type="submit" className="btn">
                {isLoading ? "Uploading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
