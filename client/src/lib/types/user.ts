export interface userDataType {
    id: number;
    username: string;
}

export interface userStateType {
    userData: userDataType | null;
    userLoading: boolean;
}

export interface userStoreType {
    userState: userStateType;
    setUser: (userInfo: userStateType) => void;
}
