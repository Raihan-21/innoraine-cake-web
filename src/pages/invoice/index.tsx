import axiosInstance from "@/axios";
import Pills from "@/components/molecules/Pills";
import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export const getServerSideProps = async (context: any) => {
  try {
    const profile = JSON.parse(context.req.cookies.innoraine_profile);
    const res = await axiosInstance.get(`/api/order?id_user=${profile.id}`);
    return {
      props: {
        invoices: res.data.body,
      },
    };
  } catch (error) {
    throw error;
  }
};
const invoice = ({ invoices }: { invoices: any }) => {
  return (
    <Box
      minHeight={"calc(100vh - 76px)"}
      padding={10}
      backgroundColor={"primary"}
    >
      <Box backgroundColor={"white"} borderRadius={5} padding={5}>
        <Text fontWeight={"bold"} fontSize={"2xl"} marginBottom={5}>
          Invoices
        </Text>
        <VStack spacing={5} align={"flex-start"} width={"100%"}>
          {invoices.length &&
            invoices.map((invoice: any, i: number) => (
              <Link
                key={i}
                href={`/invoice/${invoice.id}`}
                style={{ width: "100%" }}
              >
                <Flex
                  justifyContent={"space-between"}
                  width={"100%"}
                  padding={3}
                  boxShadow={"0px 0px 5px 1px gray"}
                  columnGap={5}
                  borderRadius={5}
                >
                  <Flex
                    columnGap={5}
                    justifyContent={"space-between"}
                    width={"100%"}
                  >
                    <Box>
                      <Text fontWeight={"bold"}>{invoice.nama}</Text>
                      <Text>{invoice.alamat}</Text>
                    </Box>
                    <VStack alignItems={"flex-end"}>
                      <Box>
                        <Text>
                          {new Date(invoice.created_at).toLocaleString(
                            "id-ID",
                            {
                              hour12: false,
                            }
                          )}
                        </Text>
                        {/* <Text>{invoice.created_at}</Text> */}
                      </Box>
                      {invoice.status && (
                        <Pills
                          color={invoice.status === "pending" ? "red" : "green"}
                          text={invoice.status}
                        />
                      )}
                    </VStack>
                  </Flex>
                  {/* {invoice.status && (
                  <Pills color="red.400" text={invoice.status} />
                )} */}
                </Flex>
              </Link>
            ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default invoice;
