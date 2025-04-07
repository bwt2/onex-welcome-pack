import { useLazyLoadQuery } from 'react-relay';
import { graphql } from 'relay-runtime';
import type { dashboardQuery as DashboardQueryType } from './__generated__/dashboardQuery.graphql';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useUser } from '@/context/UserContext';

const dashboardQuery = graphql`
  query dashboardQuery($userId: ID!) {
    user(userId: $userId) {
      homeGym {
        gymId
        city 
        country
        streetAddress
      }
    }
    gyms {
      city
    }
  }
`;

export function Dashboard() {
    const userContext = useUser();
    if (!userContext) throw new Error("useUser must be used within a UserProvider");
    const { user } = userContext;

    const data = useLazyLoadQuery<DashboardQueryType>(
        dashboardQuery,
        { userId: String(user?.userId) }
    );

    return (
        <main className="flex flex-1 flex-col items-center justify-center text-white px-50 py-50">
            <Tabs defaultValue="account" className="w-full">
                <TabsList className="bg-slate-700 text-white border-slate-400">
                    <TabsTrigger value="account" className='text-white data-[state=active]:bg-slate-600'>My Account</TabsTrigger>
                    <TabsTrigger value="gyms" className='text-white data-[state=active]:bg-slate-600'>My Gyms</TabsTrigger>
                    <TabsTrigger value="entries" className='text-white data-[state=active]:bg-slate-600'>My Entries</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card className="bg-slate-700 text-white border-0 flex">
                        <CardHeader>
                            <CardTitle>
                                Welcome Back, <span className='font-bold'>{user?.name}</span>
                            </CardTitle>
                            <CardDescription className='flex flex-row gap-1'>
                                <p><span className='font-semibold'>Email - </span>{user?.email}</p>
                                | 
                                <p><span className='font-semibold'>Home Gym - </span>  
                                    {data.user?.homeGym.city}, {data.user?.homeGym.country} @ {data.user?.homeGym.streetAddress} 
                                </p>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </TabsContent>
                <TabsContent value="gyms">
                    <Card className="bg-slate-700 text-white border-0">
                        <CardHeader>
                            <CardTitle>Card Title 2</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content 2</p>
                        </CardContent>
                        <CardFooter>
                            <p>Card Footer 2</p>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="entries">
                    <Card className="bg-slate-700 text-white border-0">
                        <CardHeader>
                            <CardTitle>My Challenge Entries</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content 2</p>
                        </CardContent>
                        <CardFooter>
                            <p>Card Footer 2</p>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    )
}