"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Catch-all route for undefined endpoints
const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.originalUrl}`,
    });
};
exports.default = notFoundHandler;
