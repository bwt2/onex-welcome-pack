import DataLoader from 'dataloader';
import { db } from '../db/client.ts';
import { challengesTable } from '../db/schema/challenges.ts';
import { inArray } from 'drizzle-orm';
import { Challenge } from '../graphql/resolvers/Challenge.ts';

export function createChallengesByGymIdLoader(): DataLoader<string, Challenge[]>{
    return new DataLoader<string, Challenge[]>(async (gymIds: string[]) => {
        const rows = await db
            .select()
            .from(challengesTable)
            .where(inArray(challengesTable.gymId, gymIds as string[]));

        // reorder to make dict (key: gymId - value: challenges belonging to gymId) 
        const gymIdToChallenges = new Map<string, Challenge[]>();

        for (const row of rows) {
          const challenge = new Challenge(row.id, row.gymId, row.title, row.type);
          if (!gymIdToChallenges.has(row.gymId)) {
            gymIdToChallenges.set(row.gymId, []);
          }
          gymIdToChallenges.get(row.gymId)!.push(challenge);
        }
        
        return gymIds.map((gymId) => gymIdToChallenges.get(gymId) ?? []);
    });
}
