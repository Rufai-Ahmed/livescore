import { store } from "@/public/utils/store";
export const getToken = () => {
  const state: any = store.getState();
  return state.auth.refresh;
};
