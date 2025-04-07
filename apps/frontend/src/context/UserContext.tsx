import { createContext, ReactNode, useContext, useState } from "react"

type User = {
    userId: number
    name: string
    email: string
}

type UserContextType = {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const UserContext = createContext<UserContextType | null>(null)

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  return (
    <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
  )
}