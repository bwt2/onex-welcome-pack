import { useState, createContext, useMemo, useContext } from "react";
import { User } from "@@/db/schema/users";

interface UserContextType {
    user: User | null; 
    setUser: React.Dispatch<React.SetStateAction<User | null>>; 
}

const userContext = createContext<UserContextType | null>(null);

const UserController = ({ children } : { children : JSX.Element[] | JSX.Element }) => {
    const [user, setUser] = useState<User | null>(null);

    const value = useMemo(() => {
        return { user, setUser }
    }, [user])

    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    )
}

const useUser: () => UserContextType = () => {
    const context = useContext(userContext);
    if (!context) {
        throw new Error("useUser must be used within a UserController");
    }
    return context;
};

export { UserController, useUser };