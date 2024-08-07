import { HTMLAttributes } from "react";

export interface iSideData {
  name?: string;
  route?: string;
}

export interface iTableRow extends HTMLAttributes<HTMLElement> {
  orderID?: string | number;
  food?: string;
  imgSrc?: string;
  location?: string;
  userName?: string;
  i?: number | null;
  jobTitle?: string;
  status?: "pending" | "delivered" | "pending";
  time?: string;
}
export interface iMealRow extends HTMLAttributes<HTMLElement> {
  user?: string;
  type?: string;
  date?: string;
  i?: number;
  mealsLeft?: string;
}

export interface iStaffRow extends HTMLAttributes<HTMLElement> {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  uniqueCode?: string;
  accessCode?: string;
  status?: boolean;
  i?: number;
}
