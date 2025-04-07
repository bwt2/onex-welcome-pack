import { Entry } from "./Entry.ts";
import { db } from "../../db/client.ts"
import { usersTable } from "../../db/schema/users.ts";
import { eq } from "drizzle-orm";
import bcrypt from 'bcrypt';
import { Gym, GymData } from "./Gym.ts";
import { gymTable } from "../../db/schema/gyms.ts";

export class User {
    userId: number
    homeGymId: number
    name: string
    email: string

    constructor(userId: number, homeGymId: number, name: string, email: string) {
        this.userId = userId;
        this.homeGymId = homeGymId;
        this.email = email;
        this.name = name;
    }

    async entries(_args: any, context: any): Promise<Entry[]> {
        return context.loaders.entriesByUserId.load(this.userId);
    }

    async homeGym(_args: any, context: any): Promise<Gym> {
        return context.loaders.gymByGymId.load(this.homeGymId);
    }
}

export async function user({ userId }: { userId: number }) {
    const res: userData[] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.userId, userId));
    if (res.length <= 0){
        throw new Error(`Failed to get user: user [${userId}] not found.`)
    }
    return new User(res[0].userId, res[0].homeGymId, res[0].name, res[0].email);
}

export interface userData {
    userId: number
    homeGymId: number
    name: string
    email: string
}

export async function users() {
    const res: userData[] = await db.select().from(usersTable);
    return res.map(({ userId, homeGymId, name, email }) => 
        new User(userId, homeGymId, name, email)
    ) as User[];
}

interface UserInput {
    email: string
    name: string
    password: string
    homeGymId: number
}
  
export async function createUser({ input }: { input: UserInput }) {
    const { email, name, password, homeGymId } : UserInput = input;
    
    const existing : userData[] = await db
        .select()
        .from(usersTable)
        .where(
            eq(usersTable.email, email)
        );
    if (existing.length > 0) {
        throw new Error(`Failed to insert user: User [${email}] already exists.`);
    }

    const res: GymData[] = await db
        .select()
        .from(gymTable)
        .where(eq(gymTable.gymId, homeGymId));
    if (res.length <= 0){
        throw new Error(`Failed to insert user: gym [${homeGymId}] not found.`)
    }

    const user: typeof usersTable.$inferInsert = {
        email,
        name,
        homeGymId,
        password: await bcrypt.hash(password, 10)
    }
    const inserted : userData[] = await db
        .insert(usersTable)
        .values(user)
        .returning();
    if (!inserted || !inserted[0]){
        throw new Error("Failed to insert user")
    }

    return new User(inserted[0].userId, inserted[0].homeGymId, inserted[0].name, inserted[0].email);
}