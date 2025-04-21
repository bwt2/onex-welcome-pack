import ChallengeTable from "./ChallengeTable";
import EntriesTable from "./EntriesTable";
import { MyGymsFragment$data } from "@/routes/__generated__/MyGymsFragment.graphql";
import { useState } from "react";
import { EntriesTableFragment$key } from "./__generated__/EntriesTableFragment.graphql";

const GymSection = ({ myGymData }: { myGymData: MyGymsFragment$data }) => {
    const [ selectedChallengeId, setSelectedChallengeId ] = useState<string | null>(null)
    const challengeRef = myGymData.challenges?.find(c => c.id === selectedChallengeId) as EntriesTableFragment$key | undefined;

    return (<>
        <div className="flex min-w-1/2  max-w-1/2">
            <ChallengeTable 
                selectedChallengeId={selectedChallengeId} 
                setSelectedChallengeId={setSelectedChallengeId}
                myGymData={myGymData}
            />
        </div>
        <div className="flex min-w-1/2 max-w-1/2"> 
            <EntriesTable
                selectedChallenge={challengeRef ?? null}
                selectedChallengeId={selectedChallengeId} 
            />
        </div>
    </>)
}

export default GymSection;