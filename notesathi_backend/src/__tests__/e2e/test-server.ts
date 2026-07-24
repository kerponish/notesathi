import dotenv from "dotenv";
dotenv.config();

import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import app from "../../app";
import { UserModel } from "../../models/user_model";
import SubjectModel from "../../models/subject_model";

const PORT = process.env.PORT || 5001;

async function start() {
  const mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  await seedData();

  app.listen(PORT, () => {
    console.log(`E2E test server running on http://localhost:${PORT}`);
  });

  process.on("SIGINT", async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    process.exit(0);
  });
}

async function seedData() {
  const existingUser = await UserModel.findOne({ email: "user@test.com" });
  if (!existingUser) {
    await UserModel.create({
      fullname: "Test User",
      email: "user@test.com",
      password: await bcryptjs.hash("password123", 10),
      role: "user",
    });
  }

  const subjectCount = await SubjectModel.countDocuments();
  if (subjectCount === 0) {
    await SubjectModel.create([
      { name: "Mathematics", description: "Numbers and equations" },
      { name: "Science", description: "The natural world" },
    ]);
  }
}

start();
