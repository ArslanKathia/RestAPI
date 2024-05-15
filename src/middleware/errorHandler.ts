import { Request,Response,NextFunction } from 'express';
import { AppStrings } from '../helpers/app-string';

export const errorHandler = (
     error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: AppStrings.INTERNAL_SERVER_ERROR_MSG});
}
