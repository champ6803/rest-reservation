import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('ReservationController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/reservation/initialize (POST)', () => {
    return request(app.getHttpServer())
      .post('/reservation/initialize')
      .send({ tableCount: 10 })
      .expect(201)
      .expect('Tables initialized successfully');
  });

  it('/reservation/reserve (POST)', () => {
    return request(app.getHttpServer())
      .post('/reservation/reserve')
      .send({ customerCount: 6 })
      .expect(201)
      .then((response) => {
        expect(response.body.reservedTables).toBe(2);
        expect(response.body.remainingTables).toBe(8);
      });
  });

  it('/reservation/cancel/:bookingId (POST)', async () => {
    const { body: reserveResponse } = await request(app.getHttpServer())
      .post('/reservation/reserve')
      .send({ customerCount: 6 })
      .expect(201);

    return request(app.getHttpServer())
      .post(`/reservation/cancel/${reserveResponse.bookingId}`)
      .expect(201)
      .then((response) => {
        expect(response.body.freedTables).toBe(2);
        expect(response.body.remainingTables).toBe(8);
      });
  });
});
