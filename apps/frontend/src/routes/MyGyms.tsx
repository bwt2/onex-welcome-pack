import { graphql } from "relay-runtime";
import { MyGymsFragment$key } from "./__generated__/MyGymsFragment.graphql";
import { MyGymsListFragment$key } from "./__generated__/MyGymsListFragment.graphql";
import { useFragment } from "react-relay";
import { useOutletContext } from "react-router";
import type { MyGymsRefetchQuery } from './__generated__/MyGymsRefetchQuery.graphql';
import { useRefetchableFragment } from "react-relay";
import GymSection from "@/components/GymSection";
import GymSearch from "@/components/GymSearch";

const MyGymsFragment = graphql`
    fragment MyGymsFragment on Gym 
    @refetchable(queryName: "MyGymsRefetchQuery") 
    {
        city
        country
        id
        state
        streetAddress
        challenges {
            id
            title
            type
            ...EntriesTableFragment
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

    const [myGymData, refetchGym] = useRefetchableFragment<MyGymsRefetchQuery, MyGymsFragment$key>(
        MyGymsFragment,
        homeGym
    );

    const { gyms } = useOutletContext<{ gyms: MyGymsListFragment$key }>();
    const myGymListData = useFragment<MyGymsListFragment$key>(
        MyGymsListFragment,
        gyms
    )
    
    return (<>
        <main className="mt-20 flex flex-col gap-5 min-h-50">
            <GymSearch
                myGymListData={myGymListData}
                refetchGym={refetchGym}
            />
            <section className="text-2xl text-white">
                <p>You are viewing</p>
                <h1 className="text-5xl capitalize font-semibold">{myGymData.streetAddress} {myGymData.city}, {myGymData.state} {myGymData.country}</h1>
            </section>
        </main>
        <main className="flex flex-row mt-10 gap-5">
            <GymSection 
                myGymData={myGymData}
            />
        </main>
    </>)
}

export default MyGyms;