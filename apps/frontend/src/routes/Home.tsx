import { useUser } from "@/contexts/UserContext";
import { Link, Outlet } from "react-router";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { startTransition } from "react";

const Home = () => {
    const { setUser } = useUser();

    const handleLogout = () => {
        startTransition(() => {
          setUser(null);
        });
    }

    return (
        <main className="min-h-screen min-w-screen flex flex-col items-center bg-slate-800 relative">
            <header className="fixed top-0 left-0 min-w-full min-h-20 flex flex-row justify-center items-center border-b-1 bg-slate-700 gap-5">
                <HoverCard openDelay={50} closeDelay={50}>
                    <HoverCardTrigger>
                        <Button variant="link" className="text-white text-xl font-semibold">
                            <Link to="/home/my-account">My Account</Link>
                        </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-slate-700 text-white text-center">
                        Account details.
                    </HoverCardContent>
                </HoverCard>
                <Separator orientation="vertical" className="min-h-7 border-slate-600"/>
                <HoverCard openDelay={50} closeDelay={50}>
                    <HoverCardTrigger>
                        <Button variant="link" className="text-white text-xl font-semibold">
                            <Link to="/home/my-gyms">My Gyms</Link>
                        </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-slate-700 text-white text-center">
                        Gyms.
                    </HoverCardContent>
                </HoverCard>
                <Separator orientation="vertical" className="min-h-7 border-slate-600"/>
                <HoverCard openDelay={50} closeDelay={50}>
                    <HoverCardTrigger>
                        <Button onClick={handleLogout} variant="link" className="text-white text-xl font-semibold">
                            <Link to="/">Log Out</Link>
                        </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-slate-700 text-white text-center">
                        See you soon!
                    </HoverCardContent>
                </HoverCard>
            </header>
            <main className="flex flex-1 mt-20 justify-center items-center">
                <Outlet/>
            </main>
        </main>
    )
}

export default Home;

// import { graphql } from "relay-runtime";

// const HomeQuery = graphql`
//   query HomeQuery($userId: ID!) {
//     user(userId: $userId) {
//         homeGym {
//             gymId
//             city 
//             country
//             streetAddress
//         }
//         entries {
//             submissionTime
//             challenge {
//                 title
//                 type
//                 gym {
//                     gymId
//                     city 
//                     country
//                     streetAddress
//                 }
//             }
//             data
//         }
//     }
//   }
// `;
