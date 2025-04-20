import DataLoader from 'dataloader';
import { db } from '../db/client.ts';
import { inArray } from 'drizzle-orm';
import { Gym } from '../graphql/resolvers/Gym.ts';
import { gymTable } from '../db/schema/gyms.ts';

export function createGymByGymIdLoader(): DataLoader<string, Gym>{
    return new DataLoader<string, Gym>(async (homeGymIds: string[]) => {
        const rows = await db
            .select()
            .from(gymTable)
            .where(inArray(gymTable.id, homeGymIds as string[]));

        // reorder to make dict (key: gymId - value: challenges belonging to gymId) 
        const homeGymIdToHomeGym = new Map<string, Gym>();

        for (const row of rows) {
          const gym = new Gym(row.id, row.country, row.state, row.city, row.streetAddress);
          if (!homeGymIdToHomeGym.has(row.id)) {
            homeGymIdToHomeGym.set(row.id, gym);
          }
        }
        
        return homeGymIds.map((gymId) => homeGymIdToHomeGym.get(gymId) ?? null);
    });
}
