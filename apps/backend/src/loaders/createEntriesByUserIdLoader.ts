import DataLoader from 'dataloader';
import { db } from '../db/client.ts';
import { inArray } from 'drizzle-orm';
import { Entry } from '../graphql/resolvers/Entry.ts';
import { entriesTable } from '../db/schema/entries.ts';

export function createEntriesByUserIdLoader(): DataLoader<string, Entry[]>{
    return new DataLoader<string, Entry[]>(async (userIds: string[]) => {
        const rows = await db
            .select()
            .from(entriesTable)
            .where(inArray(entriesTable.userId, userIds as string[]));

        // reorder to make dict (key: gymId - value: challenges belonging to gymId) 
        const userIdToEntries = new Map<string, Entry[]>();

        for (const row of rows) {
          const entry = new Entry(row.id, row.userId, row.challengeId, row.submissionTime, row.data);
          if (!userIdToEntries.has(row.userId)) {
            userIdToEntries.set(row.userId, []);
          }
          userIdToEntries.get(row.userId)!.push(entry);
        }
        
        return userIds.map((userId) => userIdToEntries.get(userId) ?? []);
    });
}
