import { create } from "zustand";
import authSlice from "./authSlice";

const useMainStore = create((set) => ({
  ...authSlice(set),
}));

export default useMainStore;
