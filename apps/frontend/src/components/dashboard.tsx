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
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const dashboardQuery = graphql`
  query dashboardQuery($userId: ID!) {
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
    # gym(gymId: $gymId) {
    #     city
    #     country
    #     gymId
    #     state
    #     streetAddress
    #     challenges {
    #         title
    #         type
    #     }
    # }
    gyms {
        city
        country
        streetAddress
    }
  }
`;

export function Dashboard() {
    const userContext = useUser();
    if (!userContext) throw new Error("useUser must be used within a UserProvider");
    const { user } = userContext;

    const [currGymId , setCurrGymId] = useState(1)

    const data = useLazyLoadQuery<DashboardQueryType>(
        dashboardQuery,
        {
            userId: String(user?.userId),
        }
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
                                Welcome Back, {user?.name}
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
                            <CardTitle>My Gyms</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Command>
                                <CommandInput placeholder="Search for a Gym" />
                                <CommandList>
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    <CommandGroup heading="Gyms">
                                        {data.gyms && data.gyms.map((gym) => {
                                            return <CommandItem>{gym.city}, {gym.country} @ {gym.streetAddress}</CommandItem>;
                                        })}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                            Gym Id: {currGymId}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="entries">
                    <Card className="bg-slate-700 text-white border-0">
                        <CardHeader>
                            <CardTitle>My Challenge Entries</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableCaption>All your challenge entries in one place.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]  text-white">Challenge</TableHead>
                                        <TableHead className=" text-white">Gym</TableHead>
                                        <TableHead className=" text-white">Statistics</TableHead>
                                        <TableHead className=" text-white text-right">Submission Time</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        {data.user && data.user.entries && data.user.entries.map((entry) => {
                                            return <>
                                                <TableCell>{entry.challenge.title}</TableCell>
                                                <TableCell>{entry.challenge.gym.city}, {entry.challenge.gym.country} @ {entry.challenge.gym.streetAddress}</TableCell>
                                                <TableCell>{JSON.stringify(entry.data).replace(/[\])}[{(]/g, '')}</TableCell>
                                                <TableCell className="text-right">{new Date(Number(entry.submissionTime)).toUTCString()}</TableCell>
                                            </>;
                                        })}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    )
}