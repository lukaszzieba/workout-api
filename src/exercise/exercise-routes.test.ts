import request from 'supertest';
import { createServer } from '../utils/createServer';
import { service } from './exercise-service';

const app = createServer();

describe('Exercise routes', () => {
  describe('Get all exercises GET /v1/exercise', () => {
    it('should respond with status 200', async () => {
      const serviceMock = jest.spyOn(service, 'getAll').mockReturnValueOnce(Promise.resolve([]));
      const res = await request(app).get('/v1/exercises');

      expect(res.statusCode).toBe(200);
      expect(serviceMock).toBeCalled();
    });
  });
});
