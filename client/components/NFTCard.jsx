import { useState, useEffect } from "react";

import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
  useContractRead,
  useNetwork,
} from "wagmi";

import RGBlobsForgerAbi from "../constants/RGBlobsForger.json";
import RGBlobsNftAbi from "../constants/RGBlobsNft.json";

import networkMapping from "../constants/networkMapping.json";

import { useToast } from "@chakra-ui/react";

const NFTCard = ({
  id,
  isSelected,
  onClick,
  isBaseColor,
  imageUrl,
  color,
  amount,
  onAmountChange,
}) => {
  const [changeAmount, setChangeAmount] = useState(0);
  const [remainingTime, setElapsedTime] = useState(null);
  const toast = useToast();

  const { chain } = useNetwork();
  const { address, isConnected, connector: activeConnector } = useAccount();

  const { config: contractWriteConfig } = usePrepareContractWrite({
    address: `${networkMapping[80001].RGBlobsForger}`,
    abi: RGBlobsForgerAbi,
    functionName: "mint",
    args: [id],
    enabled: true,
  });

  const { data: mintData, write: writeMint } =
    useContractWrite(contractWriteConfig);

  const { config: contractWriteConfigBurn } = usePrepareContractWrite({
    address: `${networkMapping[80001].RGBlobsForger}`,
    abi: RGBlobsForgerAbi,
    functionName: "burn",
    args: [id, 1],
    enabled: true,
  });

  const { data: burnData, write: writeBurn } = useContractWrite(
    contractWriteConfigBurn
  );

  const { refetch, data: readBalanceData } = useContractRead({
    address: `${networkMapping[80001].RGBlobsNFT}`,
    abi: RGBlobsNftAbi,
    functionName: "balanceOf",
    args: [address, id],
    enabled: true,
  });

  const { refetch: refetchCooldown, data: readCooldownTimerData } =
    useContractRead({
      address: `${networkMapping[80001].RGBlobsForger}`,
      abi: RGBlobsForgerAbi,
      functionName: "cooldownTimer",
      args: [id],
      enabled: false,
    });

  // const { data: cooldownTimertxData } = useWaitForTransaction({
  //   hash: readCooldownTimerData?.hash,
  // });

  // const { data: readBalanceTxData } = useWaitForTransaction({
  //   hash: readBalanceData?.hash,
  // });

  const { data: txData } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  const { data: burnTxData } = useWaitForTransaction({
    hash: burnData?.hash,
  });

  const handleSuccess = (hash) => {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://mumbai.polygonscan.com/tx/${hash}`}
      >
        View Transaction
      </a>
    );
  };

  useEffect(() => {
    if (burnTxData) {
      setTimeout(() => {
        refetch();
      }, 3000); // Delay of 3000 milliseconds before re-fetching NFT data
      toast({
        title: "Transaction Successful.",
        description: handleSuccess(
          JSON.stringify(burnTxData.blockHash).replace(/['"]+/g, "")
        ),
        status: "success",
        duration: 7000,
        isClosable: true,
        position: "top",
      });
    }
  }, [burnTxData]);

  useEffect(() => {
    if (txData) {
      setTimeout(() => {
        refetch();
        refetchCooldown();
      }, 3000); // Delay of 3000 milliseconds before re-fetching NFT data
      toast({
        title: "Transaction Successful.",
        description: handleSuccess(
          JSON.stringify(txData.blockHash).replace(/['"]+/g, "")
        ),
        status: "success",
        duration: 7000,
        isClosable: true,
        position: "top",
      });
    }
  }, [txData]);

  useEffect(() => {
    if (readCooldownTimerData) {
      const interval = setInterval(() => {
        const currentTime = Math.floor(Date.now() / 1000); // Get current timestamp in seconds
        const elapsed =
          currentTime - BigInt(readCooldownTimerData._hex).toString(); // Calculate elapsed time
        const timeLeft = 60 - elapsed;
        if (timeLeft > 0) {
          setElapsedTime(timeLeft);
        } else {
          setElapsedTime(0);
        }
      }, 1000); // Update every second

      return () => clearInterval(interval); // Clean up the interval on component unmount
    }
  }, [readCooldownTimerData]);

  // once readBalanceData is called (after a mint occurs), call the balanceOf fx of the NFT contract
  // for the token ID and update the blobCount state
  useEffect(() => {
    if (readBalanceData) {
      setChangeAmount(BigInt(readBalanceData._hex).toString());
    }
  }, [readBalanceData]);

  useEffect(() => {
    if (changeAmount !== 0) {
      if (id == 1 || id == 0 || id == 2) {
        if (onAmountChange) {
          console.log(id, changeAmount);
          onAmountChange(id, changeAmount);
        }
      }
    }
  }, [changeAmount]);

  const handleMintClick = (event) => {
    event.stopPropagation(); // Prevent event propagation to the parent component
    writeMint();
  };

  const handleBurnClick = (event) => {
    event.stopPropagation(); // Prevent event propagation to the parent component
    writeBurn();
  };

  return (
    <div
      className={`bg-white ${
        isSelected
          ? "border-purple-600 border-4"
          : "border-transparent border-4"
      } rounded-xl overflow-hidden shadow-md`}
      onClick={onClick}
    >
      <img
        className={`w-full ${isBaseColor ? "h-48" : "h-36"} ${
          !isBaseColor && amount == 0 ? "opacity-50" : "opacity-100"
        } 
         object-cover pointer-events-none`}
        src={imageUrl}
        alt={name}
      />
      {chain?.id == 80001 && isConnected && (
        <div className="p-2">
          <div className="flex flex-row justify-between items-center mx-auto pb-1">
            <p className="text-gray-500 font-bold text-sm">{color} Blob</p>
            <p className="text-gray-500 text-sm">{amount}</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            {isBaseColor && remainingTime <= 0 && (
              <button
                className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
                onClick={handleMintClick}
              >
                Mint
              </button>
            )}

            {isBaseColor && remainingTime > 0 && (
              <button
                className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg cursor-not-allowed opacity-50"
                disabled
              >
                {remainingTime}s
              </button>
            )}
            {amount > 0 && (
              <button
                className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
                onClick={handleBurnClick}
              >
                Burn
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTCard;
