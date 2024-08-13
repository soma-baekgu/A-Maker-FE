import create from 'zustand';
import {persist} from "zustand/middleware";

export const useStore = create(persist(
    (set) => ({
        accessToken: null,
        setAccessToken: (accessToken: string) => set({accessToken}),
        email:null,
        setEmail: (email: string) => set({email}),
    }),
    {
        name: process.env.NEXT_PUBLIC_LOCAL_STORAGE || 'default',
        getStorage: () => localStorage
    }
));