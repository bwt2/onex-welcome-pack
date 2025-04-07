import { Challenge, challengeData } from "./Challenge.ts";
import { db } from "../../db/client.ts";
import { entriesTable } from "../../db/schema/entries.ts";
import { User, userData } from "./User.ts";
import { eq } from "drizzle-orm";
import { usersTable } from "../../db/schema/users.ts";
import { challengesTable } from "../../db/schema/challenges.ts";

export class Entry {
    entryId: number
    userId: number
    challengeId: number
    submissionTime: Date
    data: any // JSON
    
    constructor(entryId: number, userId: number, challengeId: number, submissionTime: Date, data: any){
        this.entryId = entryId;
        this.userId = userId;
        this.challengeId = challengeId;
        this.submissionTime = submissionTime;
        this.data = data;
    }

    async user(_args: any, context: any): Promise<User> {
        return context.loaders.userByUserId.load(this.userId);
    }

    async challenge(_args: any, context: any): Promise<Challenge> {
        return context.loaders.challengeByChallengeId.load(this.challengeId);
    }
}

export async function entry({ entryId }: { entryId: number }) {
    const res: entryData[] = await db
        .select()
        .from(entriesTable)
        .where(eq(entriesTable.entryId, entryId));
    if (res.length <= 0){
        throw new Error(`Failed to get entry: entry [${entryId}] not found.`)
    }
    return new Entry(res[0].entryId, res[0].userId, res[0].challengeId, res[0].submissionTime, res[0].data)
}

interface entryData {
    entryId: number
    userId: number
    challengeId: number
    submissionTime: Date
    data: any // JSON
}

export async function entries() {
    const res: entryData[] = await db.select().from(entriesTable);
    return res.map(({ entryId, userId, challengeId, submissionTime, data }) => 
        new Entry(entryId, userId, challengeId, submissionTime, data)
    ) as Entry[];
}

interface EntryInput {
    challengeId: number
    userId: number
    submissionTime: string // ISO 8601-formatted eg 2024-05-01T12:34:56.789Z
    data: any
}

export async function createEntry({ input }: { input: EntryInput }) {
    const { challengeId, userId, submissionTime, data } : EntryInput = input;

    const entry: typeof entriesTable.$inferInsert = {
        challengeId,
        userId,
        data,
        submissionTime: new Date(submissionTime)
    }
    const inserted : entryData[] = await db
        .insert(entriesTable)
        .values(entry)
        .returning();
    if (!inserted || !inserted[0]){
        throw new Error("Failed to insert entry")
    }

    return new Entry(inserted[0].entryId, inserted[0].userId, inserted[0].challengeId, inserted[0].submissionTime, inserted[0].data);
}