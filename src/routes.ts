import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const dbFilePath = path.resolve(__dirname, 'db.json');

// Helper function to read data from db.json
const readDB = (): any[] => {
    const data = fs.readFileSync(dbFilePath, 'utf-8');
    return JSON.parse(data);
};

// Helper function to write data to db.json
const writeDB = (data: any[]): void => {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Error handling middleware
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ error: 'Internal Server Error' });
};

// /ping endpoint
router.get('/ping', (req, res) => {
    res.json(true);
});

// /submit endpoint
router.post('/submit', (req, res, next) => {
    try {
        const { name, email, phone, github_link, stopwatch_time } = req.body;
        if (!name || !email || !phone || !github_link || !stopwatch_time) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newSubmission = { name, email, phone, github_link, stopwatch_time };
        const submissions = readDB();
        submissions.push(newSubmission);
        writeDB(submissions);

        res.status(201).json(newSubmission);
    } catch (err) {
        next(err);
    }
});

// /read endpoint
router.get('/read', (req, res, next) => {
    try {
        const index = parseInt(req.query.index as string);
        const submissions = readDB();

        if (isNaN(index) || index < 0 || index >= submissions.length) {
            return res.status(400).json({ error: 'Invalid index' });
        }

        res.json({ count: submissions.length, ...submissions[index] });
    } catch (err) {
        next(err);
    }
});

// /delete endpoint
router.delete('/delete', (req, res, next) => {
    try {
        const index = parseInt(req.query.index as string);
        const submissions = readDB();

        if (isNaN(index) || index < 0 || index >= submissions.length) {
            return res.status(400).json({ error: 'Invalid index' });
        }

        const deletedSubmission = submissions.splice(index, 1);
        writeDB(submissions);

        res.json({ message: 'Submission deleted', deleted: deletedSubmission });
    } catch (err) {
        next(err);
    }
});

// /edit endpoint
router.put('/edit', (req, res, next) => {
    try {
        const index = parseInt(req.query.index as string);
        const { name, email, phone, github_link, stopwatch_time } = req.body;
        const submissions = readDB();

        if (isNaN(index) || index < 0 || index >= submissions.length) {
            return res.status(400).json({ error: 'Invalid index' });
        }

        if (!name || !email || !phone || !github_link || !stopwatch_time) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        submissions[index] = { name, email, phone, github_link, stopwatch_time };
        writeDB(submissions);

        res.json({ message: 'Submission edited', submission: submissions[index] });
    } catch (err) {
        next(err);
    }
});

// Use the error handling middleware
router.use(errorHandler);

export default router;
