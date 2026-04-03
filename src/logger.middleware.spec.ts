import { LoggerMiddleware } from './logger.middleware';
import { Request, Response, NextFunction } from 'express';
import { EventEmitter } from 'events';

describe('LoggerMiddleware', () => {
  let middleware: LoggerMiddleware;

  beforeEach(() => {
    middleware = new LoggerMiddleware();
  });

  it('should call next()', () => {
    const req = { method: 'GET', originalUrl: '/test' } as Request;
    const res = Object.assign(new EventEmitter(), {
      statusCode: 200,
    }) as unknown as Response;
    const next: NextFunction = jest.fn();

    middleware.use(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should log request info on response finish', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const req = { method: 'GET', originalUrl: '/users' } as Request;
    const res = Object.assign(new EventEmitter(), {
      statusCode: 200,
    }) as unknown as Response;
    const next: NextFunction = jest.fn();

    middleware.use(req, res, next);
    res.emit('finish');

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringMatching(/\[GET\] \/users → 200 \(\d+ms\)/),
    );
    consoleSpy.mockRestore();
  });
});
