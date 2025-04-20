import { db } from './client.ts'; // your drizzle db client
import { gymTable } from './schema/gyms.ts';
import { usersTable } from './schema/users.ts';
import { challengesTable } from './schema/challenges.ts';
import { entriesTable } from './schema/entries.ts';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

async function seed() {
    // Generate UUIDs
    const [gym1Id, gym2Id, gym3Id, gym4Id] = Array(4).fill(null).map(() => uuidv4());
    const [user1Id, user2Id, user3Id, user4Id] = Array(4).fill(null).map(() => uuidv4());
    const [ch1Id, ch2Id, ch3Id, ch4Id, ch5Id, ch6Id] = Array(6).fill(null).map(() => uuidv4());
    const [e1Id, e2Id, e3Id, e4Id, e5Id, e6Id, e7Id, e8Id] = Array(8).fill(null).map(() => uuidv4());

    // Insert Gyms
    await db.insert(gymTable).values([
    { id: gym1Id, country: "australia", state: "nsw", city: "sydney", streetAddress: "123 george street" },
    { id: gym2Id, country: "australia", state: "vic", city: "melbourne", streetAddress: "456 collins street" },
    { id: gym3Id, country: "australia", state: "qld", city: "brisbane", streetAddress: "789 queen street" },
    { id: gym4Id, country: "new zealand", state: "", city: "auckland", streetAddress: "1 waterfront ave" }
    ]);

    // Insert Users
    await db.insert(usersTable).values([
    { id: user1Id, homeGymId: gym1Id, email: "alice@example.com", name: "Alice", password: await bcrypt.hash("alice", 10) },
    { id: user2Id, homeGymId: gym2Id, email: "bob@example.com", name: "Bob", password: await bcrypt.hash("bob", 10) },
    { id: user3Id, homeGymId: gym3Id, email: "carol@example.com", name: "Carol", password: await bcrypt.hash("carol", 10) },
    { id: user4Id, homeGymId: gym4Id, email: "dave@example.com", name: "Dave", password: await bcrypt.hash("dave", 10) }
    ]);

    // Insert Challenges
    await db.insert(challengesTable).values([
    { id: ch1Id, gymId: gym1Id, title: "5K Run", type: "endurance" },
    { id: ch2Id, gymId: gym2Id, title: "Bench Press", type: "strength" },
    { id: ch3Id, gymId: gym3Id, title: "Rowing 2K", type: "endurance" },
    { id: ch4Id, gymId: gym4Id, title: "Deadlift", type: "strength" },
    { id: ch5Id, gymId: gym1Id, title: "Box Jump", type: "agility" },
    { id: ch6Id, gymId: gym2Id, title: "Plank Hold", type: "core" }
    ]);

    // Insert Entries
    await db.insert(entriesTable).values([
    { id: e1Id, userId: user1Id, challengeId: ch1Id, submissionTime: new Date(), data: { time: "25:30", note: "great effort" } },
    { id: e2Id, userId: user2Id, challengeId: ch2Id, submissionTime: new Date(), data: { weight: "100kg", reps: 8 } },
    { id: e3Id, userId: user3Id, challengeId: ch3Id, submissionTime: new Date(), data: { time: "08:15" } },
    { id: e4Id, userId: user4Id, challengeId: ch4Id, submissionTime: new Date(), data: { weight: "120kg", reps: 5 } },
    { id: e5Id, userId: user1Id, challengeId: ch5Id, submissionTime: new Date(), data: { height: "36in", reps: 15 } },
    { id: e6Id, userId: user2Id, challengeId: ch6Id, submissionTime: new Date(), data: { duration: "2:00", note: "core was burning" } },
    { id: e7Id, userId: user3Id, challengeId: ch1Id, submissionTime: new Date(), data: { time: "24:10", note: "PB!" } },
    { id: e8Id, userId: user4Id, challengeId: ch2Id, submissionTime: new Date(), data: { weight: "110kg", reps: 6 } }
    ]);

  console.log("✅ Seed completed");
}

seed().catch((err) => {
  console.error("❌ Seed failed", err);
});