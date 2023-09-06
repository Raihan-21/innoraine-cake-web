import axiosInstance from "@/axios";
import { Box, Button, Flex, Image, Img, Text } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import { ProductType } from "../../types/data";
import CartItem from "@/components/organisms/CartItem";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // const res = await axiosInstance.get()
  const profile = JSON.parse(context.req.cookies.innoraine_profile || "{}");
  console.log(profile.id);
  try {
    const res = await axiosInstance.get(`/api/cart/${profile.id}`);
    console.log(res.data.body);
    return {
      props: {
        cart: res.data.body,
      },
    };
  } catch (error) {
    throw error;
  }
};

const keranjang = ({ cart }: { cart: any }) => {
  return (
    <Box paddingX={5}>
      {cart.data.length &&
        cart.data.map((item: any, i: number) => (
          <CartItem key={i} data={item} />
        ))}
    </Box>
  );
};

export default keranjang;
