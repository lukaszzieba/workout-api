import { NextFunction, Request, Response } from 'express';
import {
  getAllExercise,
  getOneExercise,
  createNewExercise,
  updateOneExercise,
  deleteOneExercise,
} from './exercise-service';
import AppError from '../utils/error/error';
import { StatusCodes } from '../utils/htttp-statuses';

export const getAllExerciseHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getAllExercise();
    res.json(data);
  } catch (error) {
    next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR'));
  }
};

export const getOneExerciseHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = await getOneExercise(+id);
    res.json(data);
  } catch (error) {
    next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR'));
  }
};

export const createNewExerciseHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = await createNewExercise(req.body);
    res.json(id);
  } catch (error) {
    next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR'));
  }
};

export const updateOneExerciseHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await updateOneExercise(req.body);
    res.json(data);
  } catch (error) {
    next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR'));
  }
};

export const deleteOneExerciseHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deleted = await deleteOneExercise(+id);
    res.send(deleted);
  } catch (error) {
    next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR'));
  }
};
