import { Gym, GymData } from "./Gym.ts";
import { db } from "../../db/client.ts";
import { challengesTable } from "../../db/schema/challenges.ts";
import { gymTable } from "../../db/schema/gyms.ts";
import { and, eq } from "drizzle-orm";
import { Entry } from "./Entry.ts";

export class Challenge {
    challengeId: number
    title: string
    type: string
    
    constructor(challengeId: number, title: string, type: string) {
        this.challengeId = challengeId;
        this.title = title;
        this.type = type;
    }

    entries(): Entry[] {
        // dud
        return []
    }

    gym(): Gym {
        // dud
        return new Gym(1, "loc","loc","loc","loc");
    }
} 

export async function challenge({ challengeId }: { challengeId: number }) {
    const res: challengeData[] = await db
        .select()
        .from(challengesTable)
        .where(eq(challengesTable.challengeId, challengeId));
    if (res.length <= 0){
        throw new Error(`Failed to get challenge: challenge [${challengeId}] not found.`)
    }
    return new Challenge(res[0].challengeId, res[0].title, res[0].type);
}

interface challengeData {
    challengeId: number;
    title: string;
    type: string;
}

export async function challenges() {
    const res: challengeData[] = await db.select().from(challengesTable);
    return res.map(({ challengeId, title, type }) => 
        new Challenge(challengeId, title, type)
    ) as Challenge[];
}

interface ChallengeInput {
    gymId: number
    title: string
    type: string
}
  
export async function createChallenge({ input }: { input: ChallengeInput }) {
    const { gymId, title, type } : ChallengeInput = input;
    
    const res: GymData[] = await db
        .select()
        .from(gymTable)
        .where(eq(gymTable.gymId, gymId));

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

    const challenge: typeof challengesTable.$inferInsert = {
        gymId,
        title,
        type
    }
    const inserted : challengeData[] = await db
        .insert(challengesTable)
        .values(challenge)
        .returning();
    if (!inserted || !inserted[0]){
        throw new Error("Failed to insert challenge")
    }

    return new Challenge(inserted[0].challengeId, inserted[0].title, inserted[0].type);
}