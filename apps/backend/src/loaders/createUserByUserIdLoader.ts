import DataLoader from 'dataloader';
import { db } from '../db/client.ts';
import { inArray } from 'drizzle-orm';
import { User } from '../graphql/resolvers/User.ts';
import { usersTable } from '../db/schema/users.ts';

export function createUserByUserIdLoader(): DataLoader<number, User>{
    return new DataLoader<number, User>(async (userIds: number[]) => {
        const rows = await db
            .select()
            .from(usersTable)
            .where(inArray(usersTable.userId, userIds as number[]));

        // reorder to make dict (key: gymId - value: challenges belonging to gymId) 
        const userIdToUser = new Map<number, User>();

        for (const row of rows) {
          const user = new User(row.userId, row.homeGymId, row.name, row.email);
          if (!userIdToUser.has(row.userId)) {
            userIdToUser.set(row.userId, user);
          }
        }
        
        return userIds.map((userId) => userIdToUser.get(userId) ?? null);
    });
}