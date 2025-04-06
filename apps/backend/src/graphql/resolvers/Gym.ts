import { db } from "../../db/client.ts";
import { gymTable } from "../../db/schema/gyms.ts";

export class Gym {
    id: number
    location: String

    constructor(id: number, location: String) {
        this.id = id;
        this.location = location;
    }

    challenges() {
        // dud
        return []
    }
}

interface gymData {
    gymId: number;
    location: string;
}

export async function gyms() {
    const res: gymData[] = await db.select().from(gymTable);
    return res.map(({ gymId, location }) => 
        new Gym(gymId, location)
    ) as Gym[];
}