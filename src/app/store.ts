import create from 'zustand';
import {persist} from "zustand/middleware";

interface StoreState {
    accessToken: string | null;
    setAccessToken: (accessToken: string) => void;
    email: string | null;
    setEmail: (email: string) => void;
    picture: string | null;
    setPicture: (picture: string) => void;
    name: string | null;
    setName: (name: string) => void;
    map: Map<string, number>;
    setMap: (key: string, value: number) => void;
}

export const useStore = create(persist(
    (set) => ({
        accessToken: null,
        setAccessToken: (accessToken: string) => set({accessToken}),
        email: null,
        setEmail: (email: string) => set({email}),
        picture: null,
        setPicture: (picture: string) => set({picture}),
        name: null,
        setName: (name: string) => set({name}),
        map: "0",
        setMap: (map: string) => set({map}),
    }),
    {
        name: process.env.NEXT_PUBLIC_LOCAL_STORAGE || 'default',
        getStorage: () => localStorage
    }
));