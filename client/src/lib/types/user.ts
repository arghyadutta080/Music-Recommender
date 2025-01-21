export interface userDataType {
    id: number;
    username: string;
}

export interface userStateType {
    userData: userDataType | null;
    userLoading: boolean;
}

export interface userActionsType {
    setUserData: () => void;
}