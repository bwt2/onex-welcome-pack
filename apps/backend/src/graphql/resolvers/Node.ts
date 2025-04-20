import { db } from "../../db/client.ts";
import { eq } from "drizzle-orm";
import { usersTable } from "../../db/schema/users.ts";
import { entriesTable } from "../../db/schema/entries.ts";
import { challengesTable } from "../../db/schema/challenges.ts";
import { gymTable } from "../../db/schema/gyms.ts";
import { User } from "./User.ts";
import { Entry } from "./Entry.ts";
import { Challenge } from "./Challenge.ts";
import { Gym } from "./Gym.ts";

export async function node({ id }: { id: string }): Promise<User | Entry | Challenge | Gym> {
  const userRow = await db.select().from(usersTable).where(eq(usersTable.id, id));
  if (userRow.length > 0) {
    const user = userRow[0];
    return new User(user.id, user.homeGymId, user.name, user.email);
  }

  const entryRow = await db.select().from(entriesTable).where(eq(entriesTable.id, id));
  if (entryRow.length > 0) {
    const entry = entryRow[0];
    return new Entry(entry.id, entry.userId, entry.challengeId, entry.submissionTime, entry.data);
  }

  const challengeRow = await db.select().from(challengesTable).where(eq(challengesTable.id, id));
  if (challengeRow.length > 0) {
    const challenge = challengeRow[0];
    return new Challenge(challenge.id, challenge.gymId, challenge.title, challenge.type);
  }

  const gymRow = await db.select().from(gymTable).where(eq(gymTable.id, id));
  if (gymRow.length > 0) {
    const gym = gymRow[0];
    return new Gym(gym.id, gym.country, gym.state, gym.city, gym.streetAddress);
  }

  throw new Error(`Node with id ${id} not found.`);
}
