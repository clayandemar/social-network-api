const connection = require('../config/connection');
const { Thought, User } = require("../models");
const {
  getRandomUsername,
  getRandomEmail,
  getRandomThought,
} = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop thoughts
  await Thought.deleteMany({});

  // Drop users
  await User.deleteMany({});

  // Create array to hold the new users & thoughts
  const users = [];
  const thoughts = getRandomThought(2);

  // Loop 4 times and add users to the users array
  for (let i = 0; i < 4; i++) {
    const thoughts = getRandomThought(2);
    const username = getRandomUsername();
    const email = getRandomEmail();

    users.push({
      username,
      email,
      thoughts,
    });
    console.log(users);
  }

  // Add users
  await User.collection.insertMany(users);

  // Add thoughts
  await Thought.collection.insertMany(thoughts);

  // Log out the seed data
  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});