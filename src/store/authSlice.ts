const authSlice = (set: any) => ({
  isLoggedIn: false,
  token: "",
  profile: {
    id: "",
    nama: "",
  },
  setLoggedIn: (payload: boolean) => {
    set((state: any) => ({ isLoggedIn: payload }));
  },
  setToken: (payload: string) => {
    set((state: any) => ({ token: payload }));
  },
  setProfile: (payload: any) => {
    console.log(typeof payload);
    set((state: any) => ({ profile: payload }));
  },
});

export default authSlice;
