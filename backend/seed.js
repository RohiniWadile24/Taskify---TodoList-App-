const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const Task = require('./src/models/Task');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGODB_URI);

const users = [
  {
    name: 'Rohini Rajesh Wadile',
    email: 'rohini.wadile@example.in',
    password: 'password123',
  },
  {
    name: 'Priya Patel',
    email: 'priya.patel@example.in',
    password: 'password123',
  }
];

const importData = async () => {
  try {
    await User.deleteMany();
    await Task.deleteMany();

    const createdUsers = await User.create(users);
    
    const adminId = createdUsers[0]._id;

    const tasks = [
      {
        title: 'Complete Project Architecture',
        description: 'Design the MERN stack architecture and database schema.',
        status: 'Completed',
        priority: 'High',
        user: adminId
      },
      {
        title: 'Implement Authentication',
        description: 'Set up JWT, bcrypt, and protected routes.',
        status: 'In-Progress',
        priority: 'High',
        user: adminId
      },
      {
        title: 'Write API Documentation',
        description: 'Document all REST API endpoints.',
        status: 'Pending',
        priority: 'Medium',
        user: adminId
      }
    ];

    await Task.create(tasks);

    console.log('Data Imported!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Task.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
