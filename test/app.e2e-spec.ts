import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('Middleware', () => {
    it('GET /users should return 200 (logger middleware logs but does not block)', () => {
      return request(app.getHttpServer()).get('/users').expect(200);
    });

    it('POST /users without Authorization header should return 401', () => {
      return request(app.getHttpServer())
        .post('/users')
        .expect(401)
        .expect((res) => {
          expect((res.body as { message: string }).message).toBe(
            'Authorization header is missing',
          );
        });
    });

    it('POST /users with Authorization header should return 201', () => {
      return request(app.getHttpServer())
        .post('/users')
        .set('Authorization', 'Bearer test-token')
        .expect(201);
    });

    it('PUT /users/:id without Authorization header should return 401', () => {
      return request(app.getHttpServer()).put('/users/1').expect(401);
    });

    it('PUT /users/:id with Authorization header should return 200', () => {
      return request(app.getHttpServer())
        .put('/users/1')
        .set('Authorization', 'Bearer test-token')
        .expect(200);
    });

    it('DELETE /users/:id without Authorization header should return 401', () => {
      return request(app.getHttpServer()).delete('/users/1').expect(401);
    });

    it('DELETE /users/:id with Authorization header should return 200', () => {
      return request(app.getHttpServer())
        .delete('/users/1')
        .set('Authorization', 'Bearer test-token')
        .expect(200);
    });
  });
});
