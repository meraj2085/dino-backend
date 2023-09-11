import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const handleNotFoundError =
  () => (req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
      success: 'false',
      message: 'Not found',
      errorMessages: [
        {
          path: req.originalUrl,
          message: 'API not found',
        },
      ],
    });
    next();
  };

export default handleNotFoundError;
