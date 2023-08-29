const authSlice = (set: any) => ({
  isLoggedIn: false,
  setLoggedIn: (payload: boolean) => {
    set((state: any) => ({ isLoggedIn: payload }));
  },
});

export default authSlice;
