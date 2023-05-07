import styles from "../styles";

import networkMapping from "../constants/networkMapping.json";
import samsNftAbi from "../constants/SamsNft.json";
import { useToast } from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
} from "@chakra-ui/react";

import { useContractWrite, usePrepareContractWrite } from "wagmi";

import { useState } from "react";

export const NftModal = ({ isOpen, onClose, address }) => {
  const toast = useToast();
  const [txHasSucceeded, setTxHasSucceeded] = useState(false);

  const { config } = usePrepareContractWrite({
    address: `${networkMapping[137].SamsNft}`,
    abi: samsNftAbi,
    functionName: "safeMint",
    args: [address],
  });

  const { data, isLoading, isSuccess, write, reset } = useContractWrite(config);

  const handleIsLoading = () => {
    setTxHasSucceeded(false);
  };

  const handleSuccess = (hash) => {
    setTxHasSucceeded(true);
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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered px={10}>
        <ModalOverlay />
        <ModalContent
          bg="blackAlpha.800"
          border="2px"
          borderColor="slategray"
          borderRadius="lg"
        >
          <ModalBody>
            <div className="flex flex-col text-center mx-auto gap-4 pt-4">
              <p className="text-white text-lg">Hi there!</p>
              <p className="text-white text-xs px-5">
                Thanks for visiting my website and even connecting your wallet!
                Below you can mint one of my personal NFTs on the Polygon
                Blockchain. Minting is free but you will have to cover a nominal
                gas fee of a couple cents worth of Matic. This is a minimal NFT
                and I'll add more interesting implementations in the future
                after completing some other projects.
              </p>
              <div className="flex flex-row justify-center items-center mx-auto gap-4 py-2 pb-4">
                <Button
                  bg="blackAlpha.800"
                  border="2px"
                  borderColor="slategray"
                  onClick={onClose}
                >
                  <p className={`${styles.paragraphText}`}>Close</p>
                </Button>
                <Button onClick={() => write?.()}>Mint NFT</Button>
                {isLoading && txHasSucceeded == true && handleIsLoading()}
                {isSuccess &&
                  txHasSucceeded == false &&
                  toast({
                    title: "Transaction Sent.",
                    description: handleSuccess(
                      JSON.stringify(data.hash).replace(/['"]+/g, "")
                    ),
                    status: "success",
                    duration: 7000,
                    isClosable: true,
                    position: "top",
                  })}
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NftModal;
