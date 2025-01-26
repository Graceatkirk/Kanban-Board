import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Updated CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // React's default port
  credentials: true
}));

app.use(express.static('../client/dist'));
app.use(express.json());
app.use(routes);

sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});