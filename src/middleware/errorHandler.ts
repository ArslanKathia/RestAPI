import { Request,Response,NextFunction } from 'express';

export const errorHandler = (
     error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: AppStrings.INTERNAL_SERVER_ERROR_MSG});
}
