import {Router} from 'express'
import authenticateToken from "../middlewares/auth.middleware.js"
import { upload } from '../middlewares/file.middleware.js'
import generateInterviewReportController from '../controller/interview/interview.controller.js'
import generatePdfController from '../controller/interview/pdf.controller.js'

export const  interviewRouter = Router()


/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user (selfDescription , Resume PDF , jobDescription)
 * @access private
 */

interviewRouter.post("/report",authenticateToken, upload.single("pdf"), generateInterviewReportController);
interviewRouter.post("/pdf",upload.single("pdf"),generatePdfController)