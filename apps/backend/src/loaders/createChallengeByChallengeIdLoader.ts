import DataLoader from 'dataloader';
import { db } from '../db/client.ts';
import { inArray } from 'drizzle-orm';
import { Challenge } from '../graphql/resolvers/Challenge.ts';
import { challengesTable } from '../db/schema/challenges.ts';

export function createChallengeByChallengeIdLoader(): DataLoader<number, Challenge>{
    return new DataLoader<number, Challenge>(async (challengeIds: number[]) => {
        const rows = await db
            .select()
            .from(challengesTable)
            .where(inArray(challengesTable.challengeId, challengeIds as number[]));

        // reorder to make dict (key: gymId - value: challenges belonging to gymId) 
        const challengeIdToChallenge = new Map<number, Challenge>();

        for (const row of rows) {
          const challenge = new Challenge(row.challengeId, row.gymId, row.title, row.type);
          if (!challengeIdToChallenge.has(row.challengeId)) {
            challengeIdToChallenge.set(row.challengeId, challenge);
          }
        }
        
        return challengeIds.map((challengeId) => challengeIdToChallenge.get(challengeId) ?? null);
    });
}