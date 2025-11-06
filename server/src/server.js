import app from './app.js';
import { PORT } from './config/env.js';
import { connectDB } from './config/db.js';

const start = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
};

start();
