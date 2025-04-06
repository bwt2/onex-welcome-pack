import { Challenge } from "./Challenge.ts";
import { Gym } from "./Gym.ts";
import { db } from "../../db/client.ts";
import { entriesTable } from "../../db/schema/entries.ts";

export class Entry {
    id: number
    submissionTime: String
    
    constructor(id: number, submissionTime: String){
        this.id = id;
        this.submissionTime = submissionTime;
    }

    challenge() {
        // dud
        return new Challenge(1, "type", "desc");
    }

    gym() {
        // dud
        return new Gym(1, "loc");
    }
}

interface entryData {
    entryId: number;
    email: string;
    submissionTime: Date;
    data: any; // TODO: fix
}

export async function entries() {
    const res: entryData[] = await db.select().from(entriesTable);
    return res.map(({ entryId, email, submissionTime, data }) => 
        new Entry(entryId, submissionTime.toDateString())
    ) as Entry[];
}