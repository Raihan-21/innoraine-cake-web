import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";
import { ReactElement, ReactNode } from "react";
import DefaultLayout from "@/components/templates/default";

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
  return getLayout(
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
