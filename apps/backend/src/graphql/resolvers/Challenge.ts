import { Gym } from "./Gym.ts";
import { db } from "../../db/client.ts";
import { challengesTable } from "../../db/schema/challenges.ts";

export class Challenge {
    id: number
    type: String
    description: String
    
    constructor(id: number, type: String, description: String) {
        this.id = id;
        this.type = type;
        this.description = description;
    }

    entries() {
        // dud
        return []
    }

    gym() {
        // dud
        return new Gym(1, "loc");
    }
} 

interface challengeData {
    challengeId: number;
    type: string;
    description: string;
}

export async function challenges() {
    const res: challengeData[] = await db.select().from(challengesTable);
    return res.map(({ challengeId, type, description }) => 
        new Challenge(challengeId, type, description)
    ) as Challenge[];
}