import DataLoader from 'dataloader';
import { db } from '../db/client.ts';
import { inArray } from 'drizzle-orm';
import { Entry } from '../graphql/resolvers/Entry.ts';
import { entriesTable } from '../db/schema/entries.ts';

export function createEntriesByChallengeIdLoader(): DataLoader<number, Entry[]>{
    return new DataLoader<number, Entry[]>(async (challengeIds: number[]) => {
        const rows = await db
            .select()
            .from(entriesTable)
            .where(inArray(entriesTable.challengeId, challengeIds as number[]));

        // reorder to make dict (key: gymId - value: challenges belonging to gymId) 
        const challengeIdToEntries = new Map<number, Entry[]>();

        for (const row of rows) {
          const entry = new Entry(row.entryId, row.userId, row.challengeId, row.submissionTime, row.data);
          if (!challengeIdToEntries.has(row.entryId)) {
            challengeIdToEntries.set(row.entryId, []);
          }
          challengeIdToEntries.get(row.entryId)!.push(entry);
        }
        
        return challengeIds.map((challengeId) => challengeIdToEntries.get(challengeId) ?? []);
    });
}
