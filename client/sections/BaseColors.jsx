import styles from "../styles";
import { useState, useEffect } from "react";
import {
  useAccount,
  useContractRead,
  useWaitForTransaction,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import { parseUnits } from "ethers/lib/utils";

import RGBlobsForgerAbi from "../constants/RGBlobsForger.json";
import RGBlobsNft from "../constants/RGBlobsNft.json";

import networkMapping from "../constants/networkMapping.json";

import { useToast } from "@chakra-ui/react";

import NFTCard from "../components/NFTCard";

const BaseColors = () => {
  const [mounted, setMounted] = useState(false);
  const { address, isConnected, connector: activeConnector } = useAccount();

  const [selectedCards, setSelectedCards] = useState([false, false, false]);
  const [tokenBalances, setTokenBalances] = useState([0, 0, 0, 0, 0, 0, 0]);

  const [forgeTarget, setForgeTarget] = useState(0);

  const toast = useToast();

  const { config: contractWriteConfig } = usePrepareContractWrite({
    address: `${networkMapping[80001].RGBlobsForger}`,
    abi: RGBlobsForgerAbi,
    functionName: "forge",
    args: [forgeTarget],
    enabled: true,
  });

  const { data: forgeData, write: forge } =
    useContractWrite(contractWriteConfig);

  const { refetch, data: tokenBalanceData } = useContractRead({
    address: `${networkMapping[80001].RGBlobsNFT}`,
    abi: RGBlobsNft,
    functionName: "balanceOfBatch",
    args: [
      [
        `${address}`,
        `${address}`,
        `${address}`,
        `${address}`,
        `${address}`,
        `${address}`,
        `${address}`,
      ],
      [0, 1, 2, 3, 4, 5, 6],
    ],
    watch: true,
  });

  const { data: txData } = useWaitForTransaction({
    hash: forgeData?.hash,
  });

  const handleCardClick = (index) => {
    const newSelectedCards = [...selectedCards];
    newSelectedCards[index] = !newSelectedCards[index];
    setSelectedCards(newSelectedCards);
  };

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

  const handleAmountChange = (index, newAmount) => {
    // console.log("index:", index);
    // console.log("newAmount:", newAmount);
    const newTokenBalances = [...tokenBalances];
    newTokenBalances[index] = newAmount;
    setTokenBalances(newTokenBalances);
  };

  useEffect(() => {
    if (txData) {
      refetch();
      setSelectedCards([false, false, false]);
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

  const handleMixClick = () => {
    forge(forgeTarget);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (tokenBalanceData) {
      const updatedTokenBalances = tokenBalanceData.map((data) =>
        BigInt(data._hex).toString()
      );

      // console.log(updatedTokenBalances);
      setTokenBalances(updatedTokenBalances);
    }
  }, [tokenBalanceData]);

  useEffect(() => {
    if (
      selectedCards[0] == true &&
      selectedCards[1] == true &&
      selectedCards[2] == true
    ) {
      console.log("white");
      setForgeTarget(6);
      return;
    }
    if (selectedCards[0] == true && selectedCards[1] == true) {
      console.log("yellow");
      setForgeTarget(3);
    }
    if (selectedCards[0] == true && selectedCards[2] == true) {
      console.log("magenta");
      setForgeTarget(4);
    }
    if (selectedCards[1] == true && selectedCards[2] == true) {
      console.log("cyan");
      setForgeTarget(5);
    }
  }, [selectedCards]);

  useEffect(() => {
    if (tokenBalanceData) {
      const updatedTokenBalances = tokenBalanceData.map((data) =>
        BigInt(data._hex).toString()
      );

      console.log(updatedTokenBalances);
      setTokenBalances(updatedTokenBalances);
    }
  }, [tokenBalanceData]);

  if (!mounted) {
    return null;
  }

  const isMixButtonEnabled = () => {
    let mixableBlobCount = 0;
    selectedCards.forEach((card, index) => {
      if (card == true && tokenBalances[index] > 0) {
        mixableBlobCount++;
      }
    });

    const selectedCount = selectedCards.filter(
      (isSelected) => isSelected
    ).length;
    if (selectedCount >= 2 && mixableBlobCount > 1) return true;
  };

  return (
    <section
      className={`${styles.innerWidth} flex flex-col justify-center items-center mx-auto`}
    >
      <div className={`flex flex-row mx-auto gap-x-2 my-4`}>
        <NFTCard
          imageUrl="https://ipfs.io/ipfs/QmVkkDucDw61h3EpTyfzfRGgyGu5p3drMm8LhtyjWkfNqX/0.png"
          isBaseColor={true}
          color="Red"
          amount={`${tokenBalances[0]}`}
          isSelected={selectedCards[0]}
          id={0}
          onClick={() => handleCardClick(0)}
          onAmountChange={(index, newAmount) =>
            handleAmountChange(index, newAmount)
          }
        />
        <NFTCard
          imageUrl="https://ipfs.io/ipfs/QmVkkDucDw61h3EpTyfzfRGgyGu5p3drMm8LhtyjWkfNqX/1.png"
          isBaseColor={true}
          color="Green"
          amount={`${tokenBalances[1]}`}
          isSelected={selectedCards[1]}
          id={1}
          onClick={() => handleCardClick(1)}
          onAmountChange={(index, newAmount) =>
            handleAmountChange(index, newAmount)
          }
        />
        <NFTCard
          imageUrl="https://ipfs.io/ipfs/QmVkkDucDw61h3EpTyfzfRGgyGu5p3drMm8LhtyjWkfNqX/2.png"
          isBaseColor={true}
          color="Blue"
          amount={`${tokenBalances[2]}`}
          isSelected={selectedCards[2]}
          id={2}
          onClick={() => handleCardClick(2)}
          onAmountChange={(index, newAmount) =>
            handleAmountChange(index, newAmount)
          }
        />
      </div>

      <button
        className={`bg-purple-500 text-white w-24 py-2 rounded-lg hover:bg-purple-600 ${
          isMixButtonEnabled() ? "" : "opacity-50 cursor-not-allowed"
        }`}
        disabled={!isMixButtonEnabled()}
        onClick={handleMixClick}
      >
        Mix
      </button>

      <div
        className={`${styles.innerWidth} ${styles.yPaddings} flex justify-center items-start mx-auto gap-x-2`}
      >
        <NFTCard
          imageUrl="https://ipfs.io/ipfs/QmVkkDucDw61h3EpTyfzfRGgyGu5p3drMm8LhtyjWkfNqX/3.png"
          isBaseColor={false}
          amount={`${tokenBalances[3]}`}
          id={3}
          color="Yellow"
          onAmountChange={(index, newAmount) =>
            handleAmountChange(index, newAmount)
          }
        />
        <NFTCard
          imageUrl="https://ipfs.io/ipfs/QmVkkDucDw61h3EpTyfzfRGgyGu5p3drMm8LhtyjWkfNqX/4.png"
          isBaseColor={false}
          amount={`${tokenBalances[4]}`}
          id={4}
          color="Magenta"
          onAmountChange={(index, newAmount) =>
            handleAmountChange(index, newAmount)
          }
        />
        <NFTCard
          imageUrl="https://ipfs.io/ipfs/QmVkkDucDw61h3EpTyfzfRGgyGu5p3drMm8LhtyjWkfNqX/5.png"
          isBaseColor={false}
          amount={`${tokenBalances[5]}`}
          id={5}
          color="Cyan"
          onAmountChange={(index, newAmount) =>
            handleAmountChange(index, newAmount)
          }
        />
        <NFTCard
          imageUrl="https://ipfs.io/ipfs/QmVkkDucDw61h3EpTyfzfRGgyGu5p3drMm8LhtyjWkfNqX/6.png"
          isBaseColor={false}
          amount={`${tokenBalances[6]}`}
          id={6}
          color="White"
          onAmountChange={(index, newAmount) =>
            handleAmountChange(index, newAmount)
          }
        />
      </div>
    </section>
  );
};

export default BaseColors;
