import AppError from '../utils/error/error';
import request from 'supertest';
import { createServer } from '../utils/createServer';
import { service } from './exercise-service';
import { StatusCodes } from '../utils/htttp-statuses';

const exercise = {
  id: 1,
  createdAt: '2022-10-29T22:00:00.000Z',
  updatedAt: '2022-10-29T22:00:00.000Z',
  name: 'Wyciskanie sztangi w leżeniu na ławce poziomej',
  shortDescription: 'Kalteczka',
  description: ' Opis jak robić',
  userId: 1,
};

const app = createServer();

describe('Exercise routes', () => {
  describe('Get all exercises GET /v1/exercise', () => {
    it('should respond with status 200 on success', async () => {
      const serviceMock = jest.spyOn(service, 'getAll').mockReturnValueOnce(Promise.resolve([]));
      const res = await request(app).get('/v1/exercises');

      expect(res.statusCode).toBe(200);
      expect(serviceMock).toBeCalled();
    });

    it('should respond with status 500 on fail', async () => {
      const serviceMock = jest.spyOn(service, 'getAll').mockRejectedValueOnce({ error: 'error' });
      const res = await request(app).get('/v1/exercises');

      expect(res.statusCode).toBe(500);
      expect(serviceMock).toBeCalled();
    });
  });

  describe('Get one exercise GET /v1/exercise/:id', () => {
    it('should respond with status 200 on success', async () => {
      const serviceMock = jest
        .spyOn(service, 'getOne')
        .mockReturnValueOnce(Promise.resolve(exercise));
      const res = await request(app).get('/v1/exercises/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(exercise);
      expect(serviceMock).toBeCalled();
    });

    it('should respond with status 400 when id is not number', async () => {
      const serviceMock = jest
        .spyOn(service, 'getOne')
        .mockReturnValueOnce(Promise.resolve(exercise));
      const res = await request(app).get('/v1/exercises/a');

      expect(res.statusCode).toBe(400);
      expect(serviceMock).not.toBeCalled();
    });

    it('should respond with status 404 if exercise is not found', async () => {
      const serviceMock = jest.spyOn(service, 'getOne').mockReturnValueOnce(null as any);
      const res = await request(app).get('/v1/exercises/123');

      expect(res.statusCode).toBe(404);
      expect(serviceMock).toBeCalled();
    });
  });
});
