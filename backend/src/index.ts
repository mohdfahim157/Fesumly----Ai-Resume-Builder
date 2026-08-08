import express from 'express'
import type { Application } from 'express';

import cookieParser from "cookie-parser";
import cors from "cors";




export const app:Application = express();
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import { authRouter } from './routes/auth.routes.js';
import { interviewRouter } from './routes/interview.routes.js';

app.use("/api/auth",authRouter);
app.use("/api/interview",interviewRouter);

import { errorHandler } from './middlewares/errorHandler.middleware.js';
app.use(errorHandler);
