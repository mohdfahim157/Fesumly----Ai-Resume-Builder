import type { Request, Response, NextFunction } from "express";
import {generateResumePdf} from "../../services/ai.service.js";
// import { resumeReportModel } from "../../models/resumeReport.model.js";
const { PDFParse } = await import("pdf-parse");

export default async function generatePdfController(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        // file comes from multer middleware
        const pdfFile = req.file; 
        const { selfDescription, jobDescription } = req.body as {
            jobDescription?: string;
            selfDescription?: string;
        };

        if (!pdfFile) {
            res.status(400).json({ message: "No PDF file was uploaded." });
            return;
        }

        if (!selfDescription || !jobDescription) {
            res.status(400).json({ message: "Job description and self description are required." });
            return;
        }

        
        let resumeText: string = "";
        if (pdfFile) {
             // Assuming PDFParse works in your setup, here is how you extract the text:
             const data = await (new PDFParse(Uint8Array.from(pdfFile.buffer))).getText();
             resumeText = data.text;
        }

        try {      
            const pdfHtmlByAI = await generateResumePdf({
                resume: resumeText,
                selfDescription,
                jobDescription
            });
              res.status(201).json({
            message: "Pdf Content generated successfully",
            report: pdfHtmlByAI,
        });

        } catch (error) {
            throw error
        }


      
    } catch (error) {
        next(error);
    }
}