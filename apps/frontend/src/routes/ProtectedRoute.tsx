import { Navigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { ClientUser } from "@@/db/schema/users";

const ProtectedRoute = ({ children } : { children : JSX.Element[] | JSX.Element }) => {
    const { user } : { user: ClientUser | null } = useUser();
    if (!user) return <Navigate to="/" replace />;
    return children;
}

export default ProtectedRoute;