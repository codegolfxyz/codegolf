import { useAppSelector } from "../../app/hooks";
import { UserData } from "./userSlice";

export const useUserData = (): UserData | null =>
  useAppSelector((state) => state.user.data);
