import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export const ConnectText = ({ theme }) => {
  const { address, isConnected, connector: activeConnector } = useAccount();
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            ...what if I{" "}
            <span>
              <button
                onClick={openConnectModal}
                className="text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600 cursor-pointer"
              >
                &nbsp;connected my wallet?
              </button>
            </span>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
