import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MyGymsFragment$data } from "@/routes/__generated__/MyGymsFragment.graphql";
import { Toggle } from "@/components/ui/toggle"

interface ChallengeTableProps {
    myGymData: MyGymsFragment$data,
    selectedChallengeId: string | null,
    setSelectedChallengeId: React.Dispatch<React.SetStateAction<string | null>>
}

const ChallengeTable = ({ selectedChallengeId, setSelectedChallengeId, myGymData }: ChallengeTableProps) => {
    return (
        <Table className="text-white capitalize text-xl">
            <TableCaption>Last updated {new Date().toUTCString()}</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead  className="text-white font-semibold">Challenge Title</TableHead>
                    <TableHead  className="text-white font-semibold">Challenge Type</TableHead>
                    <TableHead  className="text-white font-semibold text-center">Viewing</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {myGymData && myGymData.challenges && myGymData.challenges.map((challenge) => {
                    return (
                        <TableRow key={challenge.id}>
                            <TableCell>{challenge.title}</TableCell>
                            <TableCell>{challenge.type}</TableCell>
                            <TableCell className="flex justify-center items-center">
                                <Toggle 
                                    variant="outline" 
                                    size="lg" 
                                    onPressedChange={() => setSelectedChallengeId(challenge.id)}
                                    aria-label="Toggle italic"
                                    className="data-[state=on]:bg-slate-700 bg-slate-700 hover:bg-slate-500 data-[state=on]:text-white hover:text-white transition-all text-2xl"
                                >
                                    {(selectedChallengeId === challenge.id) && '✓'}
                                </Toggle>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}

export default ChallengeTable;