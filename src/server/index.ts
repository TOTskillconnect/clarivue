import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { scorecardRoutes } from './routes/scorecard';
import criteriaRoutes from './routes/criteria';
import interviewRoutes from './routes/interviews';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/scorecard', scorecardRoutes);
app.use('/api/criteria', criteriaRoutes);
app.use('/api/interviews', interviewRoutes);

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export the Express app for Vercel
export default app; 