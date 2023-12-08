"use client";

import { memo } from "react";
import { useAppSelector } from "@/context/store";
import { selectWallet } from "@/features/walletSlice";

function ConnectWalletButton() {
  const wallet = useAppSelector(selectWallet);
  const onConnectWalletClicked = async () => {
    if (!wallet)
      return {
        title: "Wallet not initialized",
        description: "Please try again later",
        status: "error",
      };

    if (wallet.accountId) {
      return {
        title: "Wallet already connected",
        status: "info",
      };
    }

    wallet.signIn();
  };

  const signOutClick = async () => {
    if (!wallet)
      return {
        title: "Wallet not initialized",
        description: "Please try again later",
        status: "error",
      };

    wallet.signOut();
  };

  const isWalletConnected = !!wallet?.accountId;

  return isWalletConnected ? (
    <button
      onClick={signOutClick}
      className="border border-gray-600 px-4 py-2 rounded-md text-gray-600 font-medium ease-in-out"
    > Đăng xuất ­
      {wallet.accountId?.split(".")[0]}
    </button>
  ) : (
    <button
      onClick={onConnectWalletClicked}
      className="border border-gray-600 px-4 py-2 rounded-md text-gray-600 font-medium ease-in-out"
    >
      Đăng nhập
    </button>
  );
}

export default memo(ConnectWalletButton);
