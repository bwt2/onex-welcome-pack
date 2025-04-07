import DataLoader from 'dataloader';
import { db } from '../db/client.ts';
import { inArray } from 'drizzle-orm';
import { Gym } from '../graphql/resolvers/Gym.ts';
import { gymTable } from '../db/schema/gyms.ts';

export function createGymByGymIdLoader(): DataLoader<number, Gym>{
    return new DataLoader<number, Gym>(async (homeGymIds: number[]) => {
        const rows = await db
            .select()
            .from(gymTable)
            .where(inArray(gymTable.gymId, homeGymIds as number[]));

        // reorder to make dict (key: gymId - value: challenges belonging to gymId) 
        const homeGymIdToHomeGym = new Map<number, Gym>();

        for (const row of rows) {
          const gym = new Gym(row.gymId, row.country, row.state, row.city, row.streetAddress);
          if (!homeGymIdToHomeGym.has(row.gymId)) {
            homeGymIdToHomeGym.set(row.gymId, gym);
          }
        }
        
        return homeGymIds.map((gymId) => homeGymIdToHomeGym.get(gymId) ?? null);
    });
}
