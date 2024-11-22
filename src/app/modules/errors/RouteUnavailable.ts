import { Request, Response} from 'express';

// Catch-all route for undefined endpoints
const notFoundHandler = (req: Request, res: Response): void => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.originalUrl}`,
    });
};

export default notFoundHandler;