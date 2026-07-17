import mongoose from "mongoose";
import { MONGODB_URI } from "../config/constant";
import Subject from "../models/subject_model";

const SUBJECT_NAMES = [
  "Mathematics",
  "English",
  "Science",
  "Social Studies",
  "History",
  "Geography",
];

async function seedSubjects() {
  await mongoose.connect(MONGODB_URI as string);

  for (const name of SUBJECT_NAMES) {
    await Subject.updateOne({ name }, { $setOnInsert: { name } }, { upsert: true });
  }

  const subjects = await Subject.find().sort({ name: 1 });
  console.log(`Seeded ${subjects.length} subjects:`);
  subjects.forEach((s) => console.log(`  ${s._id}  ${s.name}`));

  await mongoose.disconnect();
}

seedSubjects()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Failed to seed subjects:", error);
    process.exit(1);
  });
