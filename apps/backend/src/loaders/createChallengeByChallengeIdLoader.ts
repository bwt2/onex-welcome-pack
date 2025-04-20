import DataLoader from 'dataloader';
import { db } from '../db/client.ts';
import { inArray } from 'drizzle-orm';
import { Challenge } from '../graphql/resolvers/Challenge.ts';
import { challengesTable } from '../db/schema/challenges.ts';

export function createChallengeByChallengeIdLoader(): DataLoader<string, Challenge>{
    return new DataLoader<string, Challenge>(async (challengeIds: string[]) => {
        const rows = await db
            .select() 
            .from(challengesTable)
            .where(inArray(challengesTable.id, challengeIds as string[]));

        // reorder to make dict (key: gymId - value: challenges belonging to gymId) 
        const challengeIdToChallenge  = new Map<string, Challenge>();

        for (const row of rows) {
          const challenge = new Challenge(row.id, row.gymId, row.title, row.type);
          if (!challengeIdToChallenge .has(row.id)) {
            challengeIdToChallenge .set(row.id, challenge);
          }
        }
        
        return challengeIds.map((challengeId) => challengeIdToChallenge .get(challengeId) ?? null);
    });
}