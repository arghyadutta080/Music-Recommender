import { create } from 'zustand';
import { populateUserDetails } from '../actions';
import { userActionsType, userStateType } from '../types';

const userState: userStateType = {
    userData: null,
    userLoading: false,
};
export const useUser = create<userActionsType>((set) => ({
    ...userState,
    setUserData: () => populateUserDetails(set),
    // Write other reducers with proper actions like above.
}));