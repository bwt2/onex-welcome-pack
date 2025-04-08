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
import { startTransition, useState } from 'react';
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
  query dashboardQuery($userId: ID!, $gymId: ID!) {
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
    gym(gymId: $gymId) {
        city
        country
        gymId
        state
        streetAddress
        challenges {
            title
            type
        }
    }
    gyms {
        gymId
        city
        country
        streetAddress
    }
  }
`;

function titleCase(str: string): string {
    return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
}

export function Dashboard() {
    const userContext = useUser();
    if (!userContext) throw new Error("useUser must be used within a UserProvider");
    const { user } = userContext;

    const [currGymId , setCurrGymId] = useState(1)
    const [isGymSearchFocused, setIsGymSearchFocused] = useState(false);
    const [searchTerm, setSearchTerm] = useState("")

    const data = useLazyLoadQuery<DashboardQueryType>(
        dashboardQuery,
        {
            userId: String(user?.userId),
            gymId: String(currGymId),
        }
    );
    console.log(data)

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
                        </CardHeader>
                        <CardContent>
                                <p><span>Email   : </span>{user?.email}</p>
                                <p><span>Home Gym: </span>  
                                    {data.user?.homeGym.city}, {data.user?.homeGym.country} @ {data.user?.homeGym.streetAddress} 
                                </p>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <CardDescription>
                                Updated as of {new Date().toUTCString()}
                            </CardDescription>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="gyms">
                    <Card className="bg-slate-700 text-white border-0">
                        <CardHeader>
                            <CardTitle>My Gyms</CardTitle>
                            <CardDescription>All gym locations and challenges in one place.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <Command>
                                <CommandInput 
                                    placeholder={"Search for a Gym"}
                                    value={searchTerm}
                                    onValueChange={setSearchTerm}
                                    onFocus={() => setIsGymSearchFocused(true)}
                                />
                                {isGymSearchFocused && 
                                    <CommandList>
                                        <CommandEmpty>No results found.</CommandEmpty>
                                        <CommandGroup heading="Gyms">
                                            {data.gyms && data.gyms.map((gym) => {
                                                const label = `${gym.city}, ${gym.country} @ ${gym.streetAddress}`
                                                return (
                                                <CommandItem 
                                                    onSelect={() => {
                                                        setIsGymSearchFocused(false)
                                                        setSearchTerm(label)
                                                        startTransition(() => {
                                                            setCurrGymId(Number(gym.gymId))
                                                        });
                                                    }}
                                                >
                                                {label}
                                                </CommandItem>);
                                            })}
                                        </CommandGroup>
                                    </CommandList>
                                }
                            </Command>
                            {data.gym && <div className='flex flex-row justify-between'>
                                <p className='text-xl flex-start font-bold'>{data.gym.city}, {data.gym.country} @ {data.gym.streetAddress}</p>
                                <p className='flex-end'>Gym ID {data.gym.gymId}</p>
                            </div>}
                            <h1 className='font-semibold'>Challenges</h1>
                            <Table>
                                <TableCaption>Updated as of {new Date().toUTCString()}.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]  text-white font-semibold">Challenge</TableHead>
                                        <TableHead className=" text-white font-semibold">Type</TableHead>
                                        <TableHead className=" text-white font-semibold flex-end">Entries</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.gym && data.gym.challenges && data.gym.challenges.map((challenge) => {
                                        return <TableRow>
                                            <TableCell>{titleCase(challenge.title)}</TableCell>
                                            <TableCell>{titleCase(challenge.type)}</TableCell>
                                            <TableCell>...</TableCell>
                                        </TableRow>;
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="entries">
                    <Card className="bg-slate-700 text-white border-0">
                        <CardHeader>
                            <CardTitle>My Challenge Entries</CardTitle>
                            <CardDescription>All your challenge entries in one place.</CardDescription>
                        </CardHeader>
                        <CardContent>
                        <Table>
                                <TableCaption>Updated as of {new Date().toUTCString()}.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]  text-white font-semibold">Challenge</TableHead>
                                        <TableHead className=" text-white font-semibold">Challenge Type</TableHead>
                                        <TableHead className=" text-white font-semibold">Gym</TableHead>
                                        <TableHead className=" text-white font-semibold">Statistics</TableHead>
                                        <TableHead className=" text-white text-right font-semibold">Submission Time</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.user && data.user.entries && data.user.entries.map((entry) => {
                                        return <TableRow>
                                            <TableCell>{titleCase(entry.challenge.title)}</TableCell>
                                            <TableCell>{titleCase(entry.challenge.type)}</TableCell>
                                            <TableCell>{entry.challenge.gym.city}, {entry.challenge.gym.country} @ {entry.challenge.gym.streetAddress}</TableCell>
                                            <TableCell>{JSON.stringify(entry.data).replace(/[\])}[{(]/g, '')}</TableCell>
                                            <TableCell className="text-right">{new Date(Number(entry.submissionTime)).toUTCString()}</TableCell>
                                        </TableRow>;
                                    })}
                                </TableBody>
                            </Table>
                           
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    )
}