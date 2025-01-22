import { create } from 'zustand';
import { userStateType, userStoreType } from '../types';

export const useUserStore = create<userStoreType>((set) => ({
    userState: {
        userData: null,
        userLoading: false,
    },
    setUser: (userInfo: userStateType) => set(() => ({ userState: userInfo })),
    // Write other reducers with proper actions like above.
}));