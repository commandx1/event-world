import { atom } from 'jotai';

export const authAtom = atom<boolean>(false);

export const authLoadingAtom = atom<boolean>(true);
