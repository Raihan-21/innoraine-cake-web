import axiosInstance from "@/axios";
import { Box } from "@chakra-ui/react";
import React from "react";

export const getServerSideProps = async (context: any) => {
  try {
    const profile = JSON.parse(context.req.cookies.innoraine_profile);
    const res = await axiosInstance.get(`/api/order?id_user=${profile.id}`);
    console.log(res);
    return {
      props: {
        invoices: [],
      },
    };
  } catch (error) {
    throw error;
  }
};
const invoice = () => {
  return <Box>invoice</Box>;
};

export default invoice;
