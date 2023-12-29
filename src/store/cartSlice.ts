const cartSlice = (set: any) => ({
  cart: {
    totalItem: 0,
    setTotalItem(amount: number) {
      set((state: any) => ({ cart: { ...state.cart, totalItem: amount } }));
    },
  },
});

export default cartSlice;
