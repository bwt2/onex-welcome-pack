import { Entry } from "./Entry.ts";
import { db } from "../../db/client.ts"
import { usersTable } from "../../db/schema/users.ts";
import { eq } from "drizzle-orm";
import bcrypt from 'bcrypt';
import { Gym, GymData } from "./Gym.ts";
import { gymTable } from "../../db/schema/gyms.ts";

export class User {
    userId: number
    name: string
    email: string

    constructor(userId: number, name: string, email: string) {
        this.userId = userId;
        this.email = email;
        this.name = name;
    }

    entries(): Entry[] {
        // dud
        return [new Entry(99, new Date(), {'time': '4s'}), new Entry(98, new Date(), {'y': true})];
    }

    homeGym(): Gym {
        return new Gym(1,"a", "a", "a", "a"); 
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
    return new User(res[0].userId, res[0].name, res[0].email);
}

interface userData {
    userId: number
    name: string
    email: string
}

export async function users() {
    const res: userData[] = await db.select().from(usersTable);
    return res.map(({ userId, name, email }) => 
        new User(userId, name, email)
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

    return new User(inserted[0].userId, inserted[0].name, inserted[0].email);
}