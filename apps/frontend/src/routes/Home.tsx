import { Label } from "@/components/ui/label";
import { useUser } from "@/contexts/UserContext";
import { ClientUser } from "@@/db/schema/users";
import { Navigate } from "react-router";
import { graphql } from "relay-runtime";

const HomeQuery = graphql`
  query HomeQuery($userId: ID!) {
    user(userId: $userId) {
        homeGym {
            gymId
            city 
            country
            streetAddress
        }
        entries {
            submissionTime
            challenge {
                title
                type
                gym {
                    gymId
                    city 
                    country
                    streetAddress
                }
            }
            data
        }
    }
  }
`;

const Home = () => {
    const { user } : { user: ClientUser | null } = useUser();
    if (!user) { return <Navigate to="/" replace />; };

    return (
        <main className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-slate-800">
            <Label className="text-white">
                {user.name}
            </Label>
        </main>
    )
}

export default Home;