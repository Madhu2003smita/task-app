import express from "express";
import  userRoutes from './routes/userRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api',userRoutes)
app.use('/api',taskRoutes)


app.listen(5000, () => {
  console.log(`Server running at 5000`);
});
