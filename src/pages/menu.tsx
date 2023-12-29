import axiosInstance from "@/axios";
import { Box, Button, Flex, Grid, GridItem, Img, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { ProductType } from "../../types/data";
import Slider from "react-slick";
import Card from "@/components/molecules/Card";
import Link from "next/link";
import useMainStore from "@/store";
import { useRouter } from "next/router";
import axios from "axios";
import ProductCard from "@/components/organisms/ProductCard";

const carouselSetting = {
  dots: true,
};
export const getServerSideProps = async () => {
  const res = await axiosInstance.get(`/api/products`);
  return {
    props: {
      products: res.data.body,
    },
  };
};

const Produk = ({ products }: { products: ProductType[] }) => {
  const isLoggedIn = useMainStore((state: any) => state.isLoggedIn);
  const profile = useMainStore((state: any) => state.profile);
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState<ProductType[]>([]);
  const addToCart = useCallback(
    async (product: ProductType) => {
      if (!isLoggedIn) router.push("/login");
      setSelectedMenu([...selectedMenu, product]);
      // const res = await axiosInstance.post("/api/cart", {
      //   id_user: profile.id,
      //   id_produk: product.id,
      //   jumlah: 1,
      //   harga: product.harga,
      // });
    },
    [isLoggedIn]
  );

  const incrementProduct = useCallback(
    async (id: number) => {
      console.log(selectedMenu);
      setSelectedMenu(
        selectedMenu.map((menu) => {
          if (menu.id == id) {
            return { ...menu, jumlah: menu.jumlah + 1 };
          }
          return { ...menu };
        })
      );
      // console.log(selectedMenu);
    },
    [selectedMenu]
  );
  const decrementProduct = useCallback(
    async (id: number) => {
      setSelectedMenu(
        selectedMenu.map((menu) => {
          if (menu.id === id) {
            return { ...menu, jumlah: menu.jumlah - 1 };
          }
          return { ...menu };
        })
      );
    },
    [selectedMenu]
  );

  return (
    <Box
      backgroundColor={"primary"}
      padding={20}
      minHeight={"calc(100vh - 80px)"}
    >
      <Grid
        columnGap={10}
        rowGap={10}
        templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(4, 1fr)"]}
      >
        {products.length &&
          products.map((product, i) => (
            <GridItem key={i}>
              <ProductCard data={product} />
            </GridItem>
          ))}
      </Grid>
    </Box>
  );
};

export default Produk;
