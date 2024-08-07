"use client";
import { FC, HTMLAttributes } from "react";
import { iTableRow } from "../../public/data/types";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { RiDeleteBin2Fill, RiDeleteBin7Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import DeleteModal from "../product/__components/DeleteModal";

export interface iContent {
	img?: StaticImport | string | undefined;
	thumbnail?: StaticImport | string | undefined;
	stars?: number;
	price?: number;
	name?: string;
	_id?: string;
	category?: { name: string; description?: string };
}

const ContentTable: FC<iContent> = ({
	_id,
	thumbnail,
	name,
	category,
	price,
	...props
}) => {
	const handleClick = () => {
		(
			document.getElementById(`my_modal_${_id}`) as HTMLDialogElement
		).showModal();
	};
	const handleDelete = () => {
		(
			document.getElementById(
				`prod_delete_${_id}`
			) as HTMLDialogElement
		).showModal();
	};

	return (
		<>
			<DeleteModal _id={_id!} />

			<tr
				{...props}
				className="border-y border-[3px] cursor-pointer"
			>
				<td className="border-y-[3px] ">
					<div className="flex items-center gap-3">
						<div className="avatar">
							<div className="mask mask-squircle w-12 h-12">
								<img
									width={100}
									height={100}
									src="fh"
									alt={`Avatar of ${name}`}
								/>
							</div>
						</div>
						<div>
							<div className="font-bold">{name}</div>
							<div className="text-sm opacity-50">
								{category?.name}
							</div>
						</div>
					</div>
				</td>
				<td className="font-medium border-y-[3px] ">₦{price}</td>
				<td className="border-y-[3px] ">
					<label>
						<input
							type="checkbox"
							className="checkbox"
						/>
					</label>
				</td>
				<td className="border-y-[3px] ">
					<button
						onClick={handleClick}
						className="btn bg-[#a82036] text-white hover:bg-[#be2d45]"
					>
						<BiEdit size={20} />
					</button>
				</td>
				<th className="border-y-[3px] ">
					<button
						onClick={handleDelete}
						className="btn bg-[#a82036] text-white hover:bg-[#be2d45]"
					>
						<RiDeleteBin7Line size={20} />
					</button>
				</th>
			</tr>
		</>
	);
};

export default ContentTable;
