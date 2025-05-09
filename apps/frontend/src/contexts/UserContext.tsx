import { useState, createContext, useMemo, useContext, useEffect } from "react";
import { ClientUser } from "@@/db/schema/users";

interface UserContextType {
    user: ClientUser | null; 
    setUser: React.Dispatch<React.SetStateAction<ClientUser | null>>; 
}

const userContext = createContext<UserContextType | null>(null);

const UserController = ({ children } : { children : JSX.Element[] | JSX.Element }) => {
    const [user, setUser] = useState<ClientUser | null>(() => {
        const storedUser: string | null = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) as ClientUser : null;
    });

    useEffect(() => {
        if (user) { localStorage.setItem("user", JSON.stringify(user)); } 
        else { localStorage.removeItem("user"); }
    }, [user]);

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
export type { UserContextType };