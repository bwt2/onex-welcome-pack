import { useState } from "react";
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { startTransition } from "react";
import { MyGymsListFragment$data } from "@/routes/__generated__/MyGymsListFragment.graphql";
import { RefetchFnDynamic } from "react-relay";
import { MyGymsRefetchQuery } from "@/routes/__generated__/MyGymsRefetchQuery.graphql";
import { MyGymsFragment$key } from "@/routes/__generated__/MyGymsFragment.graphql";

interface GymSearchProps {
    myGymListData: MyGymsListFragment$data,
    refetchGym: RefetchFnDynamic<MyGymsRefetchQuery, MyGymsFragment$key>
}

const GymSearch = ({ myGymListData, refetchGym } : GymSearchProps) => {
    const [ openSearch, setOpenSearch ] = useState<boolean>(false);
    const [ searchTerm, setSearchTerm ] = useState<string>("");
    
    return (
        <section className="relative min-w-1/2 min-h-30"> {/* fixed width is optional */}
            <Command className={`bg-slate-700 text-white border border-white rounded-md shadow-md flex flex-col overflow-hidden transition-all duration-300
                ${openSearch ? "h-auto max-h-30" : "h-auto max-h-10"}`}
            >
                <CommandInput
                    placeholder="Search for a Gym"
                    onFocus={() => setOpenSearch(true)}
                    value={searchTerm}
                    onValueChange={setSearchTerm}
                    className="bg-slate-700 text-white placeholder-slate-400 border-0 text-xl capitalize"
                />
                {openSearch && (
                    <CommandList className="bg-slate-700 text-white overflow-y-auto">
                        <CommandEmpty className="bg-slate-700 text-slate-400 text-xl">
                            No results found
                        </CommandEmpty>
                        {myGymListData && myGymListData.map((gym)=>{
                            const label: string = `${gym.streetAddress} ${gym.city}, ${gym.country}`
                            return (
                                <CommandItem
                                    key={gym.id}
                                    onSelect={() => {
                                        setOpenSearch(false);
                                        setSearchTerm(label);
                                        startTransition(() => {refetchGym({ id: gym.id })})
                                    }}
                                    className="bg-slate-700 text-white hover:bg-slate-600 cursor-pointer data-[selected=true]:bg-slate-600 data-[selected=true]:text-white text-xl capitalize"
                                >
                                    {label} 
                                </CommandItem>
                            )
                        })}
                    </CommandList>
                )}
            </Command>
        </section>
    )
}

export default GymSearch;