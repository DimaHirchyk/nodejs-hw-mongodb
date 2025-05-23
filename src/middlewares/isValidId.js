import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const { conntactId } = req.params;

  if (!isValidObjectId(conntactId)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};
