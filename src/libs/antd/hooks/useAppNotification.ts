import { useContext } from "react";
import { NotificationContext } from "../notification/context";

export const useAppNotification = () => useContext(NotificationContext);
