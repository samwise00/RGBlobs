"use client";

import styles from "../styles";
import networkMapping from "../constants/networkMapping.json";
import guestbookAbi from "../constants/Guestbook.json";

import GuestBox from "../components/GuestBox";
import { ConnectText } from "../components/ConnectText";

import { Network, Alchemy } from "alchemy-sdk";
import { useToast } from "@chakra-ui/react";

import { useAccount, useConnect, useNetwork, useSwitchNetwork } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import { useState, useEffect } from "react";

import { prepareWriteContract, writeContract } from "@wagmi/core";

import { storeTokenUriMetadata } from "../utils/uploadToPinata";

const GuestBook = () => {
  const [mounted, setMounted] = useState(false);
  const [guestbookData, setGuestbookData] = useState(null);
  const [commentText, setCommentText] = useState("");
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
  const { chain } = useNetwork();
  const { address, isConnected, connector: activeConnector } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const toast = useToast();

  const alchemySettings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
    network: Network.MATIC_MAINNET,
  };

  const alchemy = new Alchemy(alchemySettings);

  const handleUploadToIpfs = async (address, commentText) => {
    console.log(commentText);
    let metadata = {};
    metadata.name = "Guestbook Post";
    metadata.description = commentText;
    metadata.image = `ipfs://${process.env.NEXT_PUBLIC_IPFS_IMAGE_HASH}`;
    const response = await storeTokenUriMetadata(metadata);

    const config = await prepareWriteContract({
      address: `${networkMapping[137].Guestbook}`,
      abi: guestbookAbi,
      functionName: "safeMint",
      args: [address, response.IpfsHash],
    });
    try {
      const res = await writeContract(config);
      return toast({
        title: "Transaction Sent.",
        description: handleSuccess(
          JSON.stringify(res.hash).replace(/['"]+/g, "")
        ),
        status: "success",
        duration: 7000,
        isClosable: true,
        position: "top",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSuccess = (hash) => {
    return (
      <a
        target="_blank"
        and
        rel="noopener noreferrer"
        href={`https://polygonscan.com/tx/${hash}`}
      >
        View Transaction
      </a>
    );
  };

  const handleCommentText = (e) => {
    setCommentText(e.target.value);
  };

  const getGuestbookData = async () => {
    let nftData = [];

    let guestBookNfts = await alchemy.nft.getNftsForContract(
      networkMapping[137].Guestbook,
      true
    );

    let filteredNfts = guestBookNfts.nfts.filter((nft) => nft.tokenId > 10);

    for await (const nft of filteredNfts) {
      let nftOwner = await alchemy.nft.getOwnersForNft(
        networkMapping[137].Guestbook,
        nft.tokenId
      );
      if (nft.tokenId > 10) {
        let data = {};
        data.owner = nftOwner.owners[0];
        data.message = nft.rawMetadata.description;
        data.timestamp = nft.timeLastUpdated;

        nftData.push(data);
      }
    }

    setGuestbookData(nftData);
  };

  useEffect(() => {
    getGuestbookData();
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <section className="md:max-w-[650px] w-screen pt-6 px-6 mx-auto">
      {isConnected && chain.id != 137 && (
        <p
          className={`${styles.disclaimerText} flex justify-end items-end py-2`}
        >
          ...what if I{" "}
          <span
            onClick={() => switchNetwork(137)}
            className="text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600 cursor-pointer"
          >
            &nbsp;switched to Polygon Network?
          </span>
          ?
        </p>
      )}
      {!isConnected && (
        <p
          className={`${styles.disclaimerText} flex justify-end items-end py-2`}
        >
          <ConnectText />
        </p>
      )}

      {isConnected && guestbookData && chain.id == 137 && (
        <div>
          <h3 className={`${styles.subHeading}`}>Sign My Guestbook</h3>
          <p className={`${styles.disclaimerText}`}>
            Signing will require a nominal gas fee in MATIC
          </p>
          <div className="py-4">
            <form className="w-full max-w-sm">
              <div className="flex items-center border-b border-slate-500 py-2">
                <input
                  className={`${styles.commentText} appearance-none bg-transparent border-none w-full text-gray-700 px-2 leading-tight focus:outline-none`}
                  type="text"
                  placeholder="Hello!"
                  aria-label="Leave a Comment"
                  value={commentText}
                  onChange={handleCommentText}
                />
                {commentText == "" ? (
                  <button
                    className="border-gray-500/50 border-[2px] rounded-xl py-1 px-2 text-slate-500"
                    type="button"
                    disabled={true}
                    onClick={() => handleUploadToIpfs(address)}
                  >
                    Sign
                  </button>
                ) : (
                  <button
                    onClick={() => handleUploadToIpfs(address, commentText)}
                    type="button"
                  >
                    <div className="rounded-xl bg-gradient-to-r from-pink-500/50 via-red-500/50 to-yellow-500/50 p-[2px]">
                      <div className="flex flex-col justify-center items-center rounded-xl bg-white dark:bg-[#0F0F0F] mx-auto py-1 px-2 dark:text-white">
                        Sign
                      </div>
                    </div>
                  </button>
                )}
              </div>
            </form>
          </div>
          {guestbookData.map((nft) => (
            <div key={`${nft}${nft.timestamp}`}>
              <GuestBox
                address={nft.owner}
                message={nft.message}
                timestamp={nft.timestamp}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default GuestBook;
