import { useLazyLoadQuery } from 'react-relay';
import { graphql } from 'relay-runtime';
import type { GymsQuery as GymsQueryType } from './__generated__/GymsQuery.graphql';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

const GymsQuery = graphql`
  query dashboardQuery {
    gyms {
        city
    }
  }
`;

export function Dashboard() {
    const data = useLazyLoadQuery<GymsQueryType>(
        GymsQuery,
        {},
    );
    const gyms = data.gyms;
    const gymList = gyms.map((gym) => <li key={1}>{gym.city}</li>)

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
                                Welcome Back, <span className='font-bold'>Name</span>
                            </CardTitle>
                            <CardDescription className='flex flex-row gap-1'>
                                <p><span className='font-semibold'>Email - </span>  lorem</p>
                                | 
                                <p><span className='font-semibold'>Home Gym - </span>  lorem</p>
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
            </Tabs>
        </main>
    )
}