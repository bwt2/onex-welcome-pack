import DataLoader from 'dataloader';
import { db } from '../db/client.ts';
import { inArray } from 'drizzle-orm';
import { User } from '../graphql/resolvers/User.ts';
import { usersTable } from '../db/schema/users.ts';

export function createUserByUserIdLoader(): DataLoader<string, User>{
    return new DataLoader<string, User>(async (userIds: string[]) => {
        const rows = await db
            .select()
            .from(usersTable)
            .where(inArray(usersTable.id, userIds as string[]));

        // reorder to make dict (key: gymId - value: challenges belonging to gymId) 
        const userIdToUser = new Map<string, User>();

        for (const row of rows) {
          const user = new User(row.id, row.homeGymId, row.name, row.email);
          if (!userIdToUser.has(row.id)) {
            userIdToUser.set(row.id, user);
          }
        }
        
        return userIds.map((userId) => userIdToUser.get(userId) ?? null);
    });
}