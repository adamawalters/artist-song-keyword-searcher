import { createContext, useContext } from "react";
import { UserAuthToken } from "Types";

interface UserContextType {
    userToken: UserAuthToken | undefined;
    setUserToken: React.Dispatch<React.SetStateAction<UserAuthToken | undefined>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext : React.Context<UserContextType | undefined> = createContext<UserContextType | undefined >(undefined)

export function useUserContext(): UserContextType {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserContext.Provider');
    }
    return context;
}