import { graphql } from "relay-runtime";
import { MyGymsFragment$key } from "./__generated__/MyGymsFragment.graphql";
import { MyGymsListFragment$key } from "./__generated__/MyGymsListFragment.graphql";

import { useFragment } from "react-relay";
import { useOutletContext } from "react-router";
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { useState } from "react";
// import { useRefetchableFragment } from "react-relay";

const MyGymsFragment = graphql`
    fragment MyGymsFragment on Gym 
    # @refetchable(queryName: "MyGymsRefetchQuery") 
    {
        city
        country
        id
        state
        streetAddress
        challenges {
            title
            type
        }
    }
`;

const MyGymsListFragment = graphql`
    fragment MyGymsListFragment on Gym @relay(plural: true) {
        id
        city
        country
        streetAddress
    }
`;

const MyGyms = () => {
    const { homeGym } = useOutletContext<{ homeGym: MyGymsFragment$key }>();
    const myGymData  = useFragment<MyGymsFragment$key>(
        MyGymsFragment,
        homeGym
    );
    // const [myGymData, refetchGym] = useRefetchableFragment<MyGymsRefetchQuery, MyGymsFragment$key>(
    //     MyGymsFragment,
    //     homeGym
    // );

    const { gyms } = useOutletContext<{ gyms: MyGymsListFragment$key }>();
    const myGymListData = useFragment<MyGymsListFragment$key>(
        MyGymsListFragment,
        gyms
    )
    
    const [ openSearch, setOpenSearch ] = useState<boolean>(false);
    const [ searchTerm, setSearchTerm ] = useState<string>("");

    return (<>
    <main className="mt-20 flex gap-5 min-h-50">
        <section className="relative min-w-1/2"> {/* fixed width is optional */}
            <Command className={`bg-slate-700 text-white border border-white rounded-md shadow-md flex flex-col overflow-hidden transition-all duration-300 
                ${openSearch ? "h-auto max-h-50" : "h-auto max-h-10"}`}
            >
                <CommandInput
                    placeholder="Search for a Gym"
                    onFocus={() => setOpenSearch(true)}
                    value={searchTerm}
                    onValueChange={setSearchTerm}
                    className="bg-slate-700 text-white placeholder-slate-400 border-0"
                />
                {openSearch && (
                    <CommandList className="bg-slate-700 text-white overflow-y-auto">
                        <CommandEmpty className="bg-slate-700 text-slate-400">
                            No results found.
                        </CommandEmpty>
                        {myGymListData && myGymListData.map((gym)=>{
                            const label: string = `${gym.streetAddress} ${gym.city}, ${gym.country}`
                            return (
                                <CommandItem
                                    key={gym.id}
                                    onSelect={() => {
                                        setOpenSearch(false);
                                        setSearchTerm(label);
                                    }}
                                    className="bg-slate-700 text-white hover:bg-slate-600 cursor-pointer data-[selected=true]:bg-slate-600 data-[selected=true]:text-white"
                                >
                                    {label} 
                                </CommandItem>
                            )
                        })}
                    </CommandList>
                )}
            </Command>
        </section>
        <section className="text-2xl text-white">
            <p>Gym {myGymData.city}, {myGymData.country}!</p>
            <p>Address {myGymData.state} {myGymData.streetAddress}!</p>
            <p>Challenges ZZZ!</p>
        </section>
    </main>
    <main className="flex flex-row">
        <div className="flex flex-1 bg-red-600">
            a
        </div>
        <div className="flex flex-1 bg-blue-500"> 
            b
        </div>
    </main>
    </>)
}

export default MyGyms;