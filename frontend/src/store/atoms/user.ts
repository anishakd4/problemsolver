import { atom } from "jotai";

export const userAtom = atom<{
  loading: boolean;
  user?: {
    email: string;
  };
}>({
  loading: true,
});
