import { Entry } from "./Entry.ts";
import { db } from "../../db/client.ts"
import { usersTable } from "../../db/schema/users.ts";
import { eq } from "drizzle-orm";
import bcrypt from 'bcrypt';

export class User {
    name: string
    email: string

    constructor(name: string, email: string) {
        this.email = email;
        this.name = name;
    }

    entries() {
        // dud
        return [new Entry(99, "t99"), new Entry(98, "t98")];
    }
}

export function user({ email }: { email: string }) {
    // dud
    return new User("kik", email);
}

interface userData {
    email: string;
    name: string;
    password: string;
}

export async function users() {
    const res: userData[] = await db.select().from(usersTable);
    return res.map(({ name, email }) => 
        new User(name, email)
    ) as User[];
}

interface UserInput {
    email: string;
    name: string;
    password: string;
}
  
export async function createUser({ input }: { input: UserInput }) {
    const { email, name, password } : UserInput = input;
    const existing : UserInput[] = await db.select().from(usersTable).where(eq(usersTable.email, email));
    if (existing.length > 0) {
        throw new Error("User with this email already exists.");
    }
    const user: typeof usersTable.$inferInsert = {
        email,
        name,
        password: await bcrypt.hash(password, 10)
    }
    await db.insert(usersTable).values(user);
    return new User(name, email);
}