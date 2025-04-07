import { and, eq } from "drizzle-orm";
import { db } from "../../db/client.ts";
import { gymTable } from "../../db/schema/gyms.ts";
import { Challenge } from "./Challenge.ts";

export class Gym {
    gymId: number
    country: string
    state: string | null
    city: string
    streetAdress: string

    constructor(gymId: number, country: string, state: string | null, city: string, streetAdress: string) {
        this.gymId = gymId;
        this.country = country;
        this.state = state;
        this.city = city;
        this.streetAdress = streetAdress;
    }

    async challenges(_args: any, context: any): Promise<Challenge[]> {
        return context.loaders.challengesByGymId.load(this.gymId);
    }
}

export async function gym({ gymId }: { gymId: number }) {
    const res: GymData[] = await db
        .select()
        .from(gymTable)
        .where(eq(gymTable.gymId, gymId));
    if (res.length <= 0){
        throw new Error(`Failed to get gym: gym [${gymId}] not found.`)
    }
    return new Gym(res[0].gymId, res[0].country, res[0].state, res[0].city, res[0].streetAddress);
}

export interface GymData {
    gymId: number
    country: string
    state: string | null
    city: string
    streetAddress: string
}

export async function gyms() {
    const res: GymData[] = await db.select().from(gymTable);
    return res.map(({ gymId, country, state, city, streetAddress }) => 
        new Gym(gymId, country, state, city, streetAddress)
    ) as Gym[];
}

interface GymInput {
    country: string
    state: string | null
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
                eq(gymTable.state, state ?? null),
                eq(gymTable.city, city),
                eq(gymTable.streetAddress, streetAddress),
            )
        );
    if (existing.length > 0) {
        throw new Error(`Failed to insert gym: Gym [${country};${state};${city}${streetAddress}] already exists.`);
    }

    const gym: typeof gymTable.$inferInsert = {
        country,
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
    
    return new Gym(inserted[0].gymId, inserted[0].country, inserted[0].state, inserted[0].city, inserted[0].streetAddress);
}