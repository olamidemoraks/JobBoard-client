import "@/styles/index.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "@/components/Layout/Layout";
import { theme } from "@/chakra/theme";
import { store } from "@/app/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import { QueryClientProvider, QueryClient, Hydrate } from "react-query";
import ProtectRoute from "@/components/Layout/ProtectRoute";
import { Provider } from "react-redux";
import "@fontsource/poppins";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={store}>
          <ChakraProvider theme={theme}>
            <GoogleOAuthProvider clientId="16921438637-h9ark2gsmgtt0j387rqgkv81keqnv1gj.apps.googleusercontent.com">
              <ProtectRoute>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ProtectRoute>
            </GoogleOAuthProvider>
          </ChakraProvider>
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}
