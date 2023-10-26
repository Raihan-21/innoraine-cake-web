import { create } from "zustand";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";

const useMainStore = create((set) => ({
  ...authSlice(set),
  ...cartSlice(set),
}));

export default useMainStore;
