import { and, eq } from "drizzle-orm";
import { db } from "../../db/client.ts";
import { gymTable } from "../../db/schema/gyms.ts";
import { Challenge } from "./Challenge.ts";
import { v4 as uuidv4 } from 'uuid';

export class Gym {
    id: string
    country: string
    state: string
    city: string
    streetAddress: string

    constructor(id: string, country: string, state: string, city: string, streetAddress: string) {
        this.id = id;
        this.country = country;
        this.state = state;
        this.city = city;
        this.streetAddress = streetAddress;
    }

    async challenges(_args: any, context: any): Promise<Challenge[]> {
        return context.loaders.challengesByGymId.load(this.id);
    }
}

export async function gym({ id }: { id: string }) {
    const res: GymData[] = await db
        .select()
        .from(gymTable)
        .where(eq(gymTable.id, id));
    if (res.length <= 0){
        throw new Error(`Failed to get gym: gym [${id}] not found.`)
    }
    return new Gym(res[0].id, res[0].country, res[0].state, res[0].city, res[0].streetAddress);
}

export interface GymData {
    id: string
    country: string
    state: string
    city: string
    streetAddress: string
}

export async function gyms() {
    const res: GymData[] = await db.select().from(gymTable);
    return res.map(({ id, country, state, city, streetAddress }) => 
        new Gym(id, country, state, city, streetAddress)
    ) as Gym[];
}

interface GymInput {
    country: string
    state: string
    city: string
    streetAddress: string
}

export async function createGym({ input }: { input: GymInput }) {
    const { country, state, city, streetAddress } : GymInput = input;

    const existing : GymInput[] = await db
        .select()
        .from(gymTable)
        .where(
            and(
                eq(gymTable.country, country),
                eq(gymTable.state, state),
                eq(gymTable.city, city),
                eq(gymTable.streetAddress, streetAddress),
            )
        );
    if (existing.length > 0) {
        throw new Error(`Failed to insert gym: Gym [${country};${state};${city}${streetAddress}] already exists.`);
    }

    const gym: typeof gymTable.$inferInsert = {
        id: uuidv4(),
        country,
        state,
        streetAddress,
        city,
    } 

    const inserted : GymData[] = await db
        .insert(gymTable)
        .values(gym)
        .returning();

    if (!inserted || !inserted[0]){
        throw new Error("Failed to insert gym")
    }
    
    return new Gym(inserted[0].id, inserted[0].country, inserted[0].state, inserted[0].city, inserted[0].streetAddress);
}