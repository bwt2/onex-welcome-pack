import DataLoader from 'dataloader';
import { db } from '../db/client.ts';
import { inArray } from 'drizzle-orm';
import { Entry } from '../graphql/resolvers/Entry.ts';
import { entriesTable } from '../db/schema/entries.ts';

export function createEntriesByUserIdLoader(): DataLoader<number, Entry[]>{
    return new DataLoader<number, Entry[]>(async (userIds: number[]) => {
        const rows = await db
            .select()
            .from(entriesTable)
            .where(inArray(entriesTable.userId, userIds as number[]));

        // reorder to make dict (key: gymId - value: challenges belonging to gymId) 
        const userIdToEntries = new Map<number, Entry[]>();

        for (const row of rows) {
          const entry = new Entry(row.entryId, row.userId, row.challengeId, row.submissionTime, row.data);
          if (!userIdToEntries.has(row.entryId)) {
            userIdToEntries.set(row.entryId, []);
          }
          userIdToEntries.get(row.entryId)!.push(entry);
        }
        
        return userIds.map((userId) => userIdToEntries.get(userId) ?? []);
    });
}
