import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import * as React from "react";

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  const { chains, provider } = configureChains(
    [polygonMumbai],
    [publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "RGBlobs",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <div className="overflow-hidden bg-white min-h-screen">
      <Head>
        <title>RGBlobs</title>
        <meta name="description" content="RGBlobs"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            chains={chains}
            theme={midnightTheme()}
            initialChainId={mainnet}
          >
            <ThemeProvider enableSystem={true} attribute="class">
              <Navbar className="z-1" />
              <Component className="z-2" {...pageProps} />
              <Footer />
            </ThemeProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </ChakraProvider>
    </div>
  );
}
