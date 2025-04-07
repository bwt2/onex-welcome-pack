import DataLoader from 'dataloader';
import { db } from '../db/client.ts';
import { challengesTable } from '../db/schema/challenges.ts';
import { inArray } from 'drizzle-orm';
import { Challenge } from '../graphql/resolvers/Challenge.ts';

export function createChallengesByGymIdLoader(): DataLoader<number, Challenge[]>{
    return new DataLoader<number, Challenge[]>(async (gymIds: number[]) => {
        const rows = await db
            .select()
            .from(challengesTable)
            .where(inArray(challengesTable.gymId, gymIds as number[]));

        // reorder to make dict (key: gymId - value: challenges belonging to gymId) 
        const gymIdToChallenges = new Map<number, Challenge[]>();

        for (const row of rows) {
          const challenge = new Challenge(row.challengeId, row.gymId, row.title, row.type);
          if (!gymIdToChallenges.has(row.gymId)) {
            gymIdToChallenges.set(row.gymId, []);
          }
          gymIdToChallenges.get(row.gymId)!.push(challenge);
        }
        
        return gymIds.map((gymId) => gymIdToChallenges.get(gymId) ?? []);
    });
}
