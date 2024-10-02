"use client";
import { useAppSelector } from "@/libs/redux/root-store";
import { getUserInfo } from "@/stores/user/selectors";
import { useEffect } from "react";
import useSocket from "./useSocket";

const useConnectSocket = () => {
  const { isConnected, connect, disconnect } = useSocket();
  const user = useAppSelector(getUserInfo);

  useEffect(() => {
    if (user) {
      connect();
    } else {
      disconnect();
    }
  }, [user, isConnected]);
};

export default useConnectSocket;
