import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
//*routes import

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';

//*middlewares import
import { registerError } from './middlewares/authError.middlewares.js';

//* end of imports
//* app functions

// mongo database connection setup
mongoose.connect(process.env.DATABASE_URI).then(() => {
    console.log('Connected to database')
}
).catch((error) => {
    console.log(error);
});
// end of mongo database setup

// app function setup
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server is running on port 6969');
});
// end of app functions setup

// app routing
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

// end of app routing
//app middleware

app.use(registerError);
//end of app middleware