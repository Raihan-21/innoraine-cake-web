const authSlice = (set: any) => ({
  isLoggedIn: false,
  token: "",
  setLoggedIn: (payload: boolean) => {
    set((state: any) => ({ isLoggedIn: payload }));
  },
  setToken: (payload: string) => {
    set((state: any) => ({ token: payload }));
  },
});

export default authSlice;
