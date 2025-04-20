import { Entry } from "./Entry.ts";
import { db } from "../../db/client.ts"
import { usersTable } from "../../db/schema/users.ts";
import { eq } from "drizzle-orm";
import bcrypt from 'bcrypt';
import { Gym, GymData } from "./Gym.ts";
import { gymTable } from "../../db/schema/gyms.ts";
import { v4 as uuidv4 } from 'uuid';

export class User {
    id: string
    homeGymId: string
    name: string
    email: string

    constructor(id: string, homeGymId: string, name: string, email: string) {
        this.id = id;
        this.homeGymId = homeGymId;
        this.email = email;
        this.name = name;
    }

    async entries(_args: any, context: any): Promise<Entry[]> {
        return context.loaders.entriesByUserId.load(this.id);
    }

    async homeGym(_args: any, context: any): Promise<Gym> {
        return context.loaders.gymByGymId.load(this.homeGymId);
    }
}

export async function user({ id }: { id: string }) {
    const res: userData[] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, id));
    if (res.length <= 0){
        throw new Error(`Failed to get user: user [${id}] not found.`)
    }
    return new User(res[0].id, res[0].homeGymId, res[0].name, res[0].email);
}

export interface userData {
    id: string
    homeGymId: string
    name: string
    email: string
}

export async function users() {
    const res: userData[] = await db.select().from(usersTable);
    return res.map(({ id, homeGymId, name, email }) => 
        new User(id, homeGymId, name, email)
    ) as User[];
}

interface UserInput {
    email: string
    name: string
    password: string
    homeGymId: string
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
        .where(eq(gymTable.id, homeGymId));
    if (res.length <= 0){
        throw new Error(`Failed to insert user: gym [${homeGymId}] not found.`)
    }

    const user: typeof usersTable.$inferInsert = {
        id: uuidv4(),
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

    return new User(inserted[0].id, inserted[0].homeGymId, inserted[0].name, inserted[0].email);
}

interface loginInput {
    email: string
    password: string 
}

export interface userDataPass {
    id: string
    homeGymId: string
    name: string
    email: string
    password: string
}

export async function login({ input }: { input: loginInput }): Promise<User> {
    const { email, password } : loginInput = input;
    
    const existing : userDataPass[] = await db
        .select()
        .from(usersTable)
        .where(
            eq(usersTable.email, email)
        );
    if (existing.length <= 0) return null;

    const valid : boolean = await bcrypt.compare(password, existing[0].password);
    if (!valid) return null;

    const user = existing[0];
    return new User(user.id, user.homeGymId, user.name, user.email);
}