import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/error/error';
import { StatusCodes } from '../utils/htttp-statuses';
import { Service } from '../types/service-interface';
import { Exercise } from './exercise-entity';

export const createGetAllExerciseHandler = (exerciseService: Service<Exercise>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await exerciseService.getAll();
      res.json(data);
    } catch (error) {
      next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR'));
    }
  };
};

export const createGetOneExerciseHandler = (exerciseService: Service<Exercise>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = await exerciseService.getOne(+id);
      res.json(data);
    } catch (error) {
      next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR'));
    }
  };
};

export const createCreateNewExerciseHandler = (exerciseService: Service<Exercise>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await exerciseService.create(req.body);
      res.json(id);
    } catch (error) {
      next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR'));
    }
  };
};

export const createUpdateOneExerciseHandler = (exerciseService: Service<Exercise>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await exerciseService.update(req.body);
      res.json(data);
    } catch (error) {
      next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR'));
    }
  };
};

export const createDeleteOneExerciseHandler = (exerciseService: Service<Exercise>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deleted = await exerciseService.deleteOne(+id);
      res.send(deleted);
    } catch (error) {
      next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR'));
    }
  };
};
