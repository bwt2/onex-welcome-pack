import { Gym, GymData } from "./Gym.ts";
import { db } from "../../db/client.ts";
import { challengesTable } from "../../db/schema/challenges.ts";
import { gymTable } from "../../db/schema/gyms.ts";
import { and, eq } from "drizzle-orm";
import { Entry } from "./Entry.ts";
import type { Challenge as PgChallenge } from "../../db/schema/challenges.ts";
import { v4 as uuidv4 } from 'uuid';

export class Challenge {
    id: string
    gymId: string
    title: string
    type: string
    
    constructor(id: string, gymId: string, title: string, type: string) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.gymId = gymId;
    }

    async entries(_args: any, context: any): Promise<Entry[]> {
        return context.loaders.entriesByChallengeId.load(this.id);
    }

    async gym(_args: any, context: any): Promise<Gym> {
        return context.loaders.gymByGymId.load(this.gymId);
    }
} 

export async function challenge({ id }: { id: string }) {
    const res: challengeData[] = await db
        .select()
        .from(challengesTable)
        .where(eq(challengesTable.id, id));
    if (res.length <= 0){
        throw new Error(`Failed to get challenge: challenge [${id}] not found.`)
    }
    return new Challenge(res[0].id, res[0].gymId, res[0].title, res[0].type);
}

export interface challengeData {
    id: string;
    gymId: string,
    title: string;
    type: string;
}

/**
 * Needs data loader!
 */
export async function challenges() {
    const res: challengeData[] = await db.select().from(challengesTable);
    return res.map(({ id, gymId, title, type }) => 
        new Challenge(id, gymId, title, type)
    ) as Challenge[];
}

interface ChallengeInput {
    gymId: string
    title: string
    type: string
}
  
export async function createChallenge({ input }: { input: ChallengeInput }) {
    const { gymId, title, type } = input;
    
    const res: GymData[] = await db
        .select()
        .from(gymTable)
        .where(eq(gymTable.id, gymId));

    if (res.length <= 0){
        throw new Error(`Failed to insert challenge: gym [${gymId}] not found.`)
    }

    const existing : challengeData[] = await db
        .select()
        .from(challengesTable)
        .where(
            and(
                eq(challengesTable.gymId, gymId),
                eq(challengesTable.title, title)
            )
        );
    if (existing.length > 0) {
        throw new Error(`Failed to insert challenge: challenge title [${title}] at gym [${gymId}] already exists.`);
    }

    const challenge: PgChallenge = {
        id: uuidv4(),
        gymId,
        title,
        type
    }

    const [inserted] = await db
        .insert(challengesTable)
        .values(challenge)
        .returning();

    if (!inserted){
        throw new Error("Failed to insert challenge")
    }

    return new Challenge(inserted.id, inserted.gymId, inserted.title, inserted.type);
}