import { useRefetchableFragment } from "react-relay"
import { graphql } from "react-relay";
import type { EntriesTableRefetchQuery } from './__generated__/EntriesTableRefetchQuery.graphql';
import { EntriesTableFragment$key } from "./__generated__/EntriesTableFragment.graphql";
import { useEffect } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export const EntriesTableFragment = graphql`
  fragment EntriesTableFragment on Challenge
  @refetchable(queryName: "EntriesTableRefetchQuery") {
    entries {
      id
      submissionTime
      data
      user {
        name
      }
    }
  }
`;

interface EntriesTableProps {
    selectedChallenge: EntriesTableFragment$key | null;
    selectedChallengeId: string | null
}

const EntriesTable = ({ selectedChallenge, selectedChallengeId }: EntriesTableProps) => {
    const [entryData, refetch] = useRefetchableFragment<EntriesTableRefetchQuery, EntriesTableFragment$key>(
        EntriesTableFragment,
        selectedChallenge
    );

    useEffect(() => {
        if (selectedChallengeId) {
          refetch({ id: selectedChallengeId });
        }
      }, [selectedChallengeId, refetch]);

    if (!selectedChallenge || !entryData || !entryData.entries) return <p className="text-white">No challenge selected</p>;
    
    return (
        <Table className="text-white capitalize text-xl">
            <TableCaption>Last updated {new Date().toUTCString()}</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead  className="text-white font-semibold">User</TableHead>
                    <TableHead  className="text-white font-semibold">Subsmission Time</TableHead>
                    <TableHead  className="text-white font-semibold">Entry</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {entryData.entries.map((entry) => {
                    return (
                        <TableRow key={entry.id}>
                            <TableCell>{entry.user.name}</TableCell>
                            <TableCell>{new Date(Number(entry.submissionTime)).toUTCString()}</TableCell>
                            <TableCell>
                                {
                                    Object.entries(entry.data)
                                    .map(([key, value]) => `${key}: ${value}`)
                                    .join(", ")
                                }
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}

export default EntriesTable;