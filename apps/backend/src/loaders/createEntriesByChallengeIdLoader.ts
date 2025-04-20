import DataLoader from 'dataloader';
import { db } from '../db/client.ts';
import { inArray } from 'drizzle-orm';
import { Entry } from '../graphql/resolvers/Entry.ts';
import { entriesTable } from '../db/schema/entries.ts';

export function createEntriesByChallengeIdLoader(): DataLoader<string, Entry[]>{
    return new DataLoader<string, Entry[]>(async (challengeIds: string[]) => {
        const rows = await db
            .select()
            .from(entriesTable)
            .where(inArray(entriesTable.challengeId, challengeIds as string[]));

        // reorder to make dict (key: gymId - value: challenges belonging to gymId) 
        const challengeIdToEntries = new Map<string, Entry[]>();

        for (const row of rows) {
          const entry = new Entry(row.id, row.userId, row.challengeId, row.submissionTime, row.data);
          if (!challengeIdToEntries.has(row.id)) {
            challengeIdToEntries.set(row.id, []);
          }
          challengeIdToEntries.get(row.id)!.push(entry);
        }
        
        return challengeIds.map((challengeId) => challengeIdToEntries.get(challengeId) ?? []);
    });
}
