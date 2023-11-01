import axiosInstance from "@/axios";
import {
  Box,
  Flex,
  Grid,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

export const getServerSideProps = async (context: any) => {
  const { id } = context.params;
  console.log(context.params);
  try {
    const res = await axiosInstance.get(`/api/order/${id}`);
    return {
      props: {
        items: res.data.body.items,
        invoice: res.data.body.detail,
      },
    };
  } catch (error) {
    throw error;
  }
};

const InvoiceDetail = ({ items, invoice }: { items: any; invoice: any }) => {
  return (
    <Box
      padding={10}
      backgroundColor={"primary"}
      minHeight={"calc(100vh - 76px)"}
    >
      <Box
        padding={10}
        boxShadow={"0px 0px 5px 1px  gray"}
        backgroundColor={"white"}
        borderRadius={10}
      >
        <Flex justifyContent={"space-between"} marginBottom={5}>
          <Text fontSize={"3xl"} fontWeight={"bold"}>
            Invoice
          </Text>
          <Text>{new Date(invoice.created_at).toLocaleString()}</Text>
        </Flex>
        <Table>
          <Thead>
            <Tr>
              <Th>Barang</Th>
              <Th>Jumlah</Th>
              <Th>Harga</Th>
              <Th>Subtotal</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.length &&
              items.map((item: any, i: number) => (
                <Tr key={i}>
                  <Td>{item.produk.nama_produk}</Td>
                  <Td>{item.jumlah}</Td>
                  <Td>
                    {new Intl.NumberFormat("id-UD", {
                      style: "currency",
                      currency: "IDR",
                    }).format(item.harga)}
                  </Td>
                  <Td>
                    {new Intl.NumberFormat("id-UD", {
                      style: "currency",
                      currency: "IDR",
                    }).format(Number(item.harga) * Number(item.jumlah))}
                  </Td>
                </Tr>
              ))}
            <Tr>
              <Td colSpan={3} fontWeight={"bold"}>
                Total
              </Td>
              <Td fontWeight={"bold"}>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(invoice.total_harga)}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default InvoiceDetail;
