import "@/styles/globals.css";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
// import localFont from "next/font/local";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";
import { ReactElement, ReactNode } from "react";
import DefaultLayout from "@/components/templates/default";
import quickSand from "@/fonts/quickSand";

type NextPageWithLayout = {
  Layout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};



export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.Layout ||
    ((page: ReactElement) => <DefaultLayout>{page}</DefaultLayout>);
  return (
    <ChakraProvider theme={theme}>
      <main className={quickSand.className}>
        {getLayout(<Component {...pageProps} />)}
      </main>
    </ChakraProvider>
  );
}
