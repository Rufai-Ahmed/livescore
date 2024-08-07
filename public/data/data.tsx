import { iCategoryCard } from "@/app/components/CategoryCard";
import { CiBurger } from "react-icons/ci";
import { FaCakeCandles } from "react-icons/fa6";
import { MdEmojiFoodBeverage } from "react-icons/md";
import { PiBowlFood } from "react-icons/pi";
import { iCategory, iInput } from "../../interfaces";
import { iMealRow, iSideData, iStaffRow, iTableRow } from "./types";

export const tableData: iTableRow[] = [
  {
    orderID: 1,
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTS71lSgpbDona4u2ocmyQJuD0D0R0Gv1iKsuoYrT8GA&s",
    food: "Hamburger",
    location: "Lagos",
    userName: "John Doe",
    time: "3:00 PM",
    status: "pending",
  },
  {
    orderID: 12,
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/6/60/Sushi_platter.jpg",
    food: "Sushi",
    location: "Abuja",
    userName: "Brice Swyre",
    time: "12:00 PM",
    status: "delivered",
  },
  {
    orderID: 11,
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2KVCprJoRYEYm5nBnb7qaHteG71rHkLB_AzAVgH5JeA&s",
    food: "Borscht",
    location: "Kano",
    userName: "Marjy Ferencz",
    time: "5:00 PM",
  },
  {
    orderID: 31,
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzyKl0G31NJjsdJjjTOyrUdpRQd3shF5otAkQja-U_IQ&s",
    food: "Feijoada",
    location: "Enugu",
    userName: "Yancy Tear",
    time: "6:00 PM",
    status: "pending",
  },
];

export const mealData: iMealRow[] = [
  {
    user: "Topkem",
    type: "Weekly",
    date: "10th July - 17th July",
    mealsLeft: "4",
  },
  {
    user: "Weebly",
    type: "Monthly",
    date: "10th July - 10th August",
    mealsLeft: "14",
  },
  {
    user: "Topkem",
    type: "Weekly",
    date: "10th July - 17th July",
    mealsLeft: "4",
  },
  {
    user: "Weebly",
    type: "Monthly",
    date: "10th July - 10th August",
    mealsLeft: "14",
  },
  {
    user: "Topkem",
    type: "Weekly",
    date: "10th July - 17th July",
    mealsLeft: "4",
  },
  {
    user: "Weebly",
    type: "Monthly",
    date: "10th July - 10th August",
    mealsLeft: "14",
  },
];
// export const staffData: iStaffRow[] = [
//   {
//     staffName: "Brother John",
//     PIN: "",
//     email: "abbeyrufa39@gmail.com",
//     number: "080742563829",
//     status: true,
//   },
//   {
//     staffName: "",
//     PIN: "jkhkjkjj",
//     email: "ekenetopper@gmail.com",
//     number: "",
//     status: false,
//   },
// ];

export const sideData: iSideData[] = [
  {
    name: "Home",
    route: "/",
  },
  {
    name: "product",
  },
  {
    name: "category",
  },
  {
    name: "order",
  },
  {
    name: "organization",
  },
  {
    name: "Meal-Plan",
    route: "/meal-plan",
  },
  {
    name: "staff",
  },
];

export const inputs: iInput[] = [
  {
    name: "firstName",
    placeholder: "First Name*",
    type: "text",
  },
  {
    name: "lastName",
    placeholder: "Last Name*",
    type: "text",
  },
  {
    name: "email",
    placeholder: "Email*",
    type: "email",
  },
  {
    name: "password",
    placeholder: "Password*",
    type: "password",
  },
];
export const loginInputs: iInput[] = [
  {
    name: "email",
    placeholder: "Email*",
    type: "email",
  },
  {
    name: "password",
    placeholder: "Password*",
    type: "password",
  },
];

export const categoryData: iCategoryCard[] = [
  {
    icon: <CiBurger size={20} />,
    text: "All Dishes",
  },
  {
    icon: <CiBurger size={20} />,
    text: "Snacks",
  },
  {
    icon: <FaCakeCandles size={20} />,
    text: "Cakes",
  },
  {
    icon: <MdEmojiFoodBeverage size={20} />,
    text: "Beverages",
  },
  {
    icon: <PiBowlFood size={20} />,
    text: "Native Cuisines",
  },
];

export const categoryData2: iCategory[] = [
  {
    _id: "1",
    image: "/assets/next.svg",
    type: "Snack",
  },
];
