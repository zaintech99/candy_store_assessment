import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from "../app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from 'supertest';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../config/ormconfig.test';


describe("OrderController", () => {
  let token = null;
  let app: INestApplication;
  let originalWarn: typeof console.warn;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
      ],

    }).compile();;

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const config = app.get(ConfigService);
    token = config.get<string>('TOKEN');

    originalWarn = console.warn;
    console.warn = jest.fn();
  });

  afterAll(async () => {
    console.warn = originalWarn;
    await app.close();
  });

  beforeEach(async () => {
  });

  afterEach(async () => {
  });


  describe("GET /orders", () => {
    it("should return 200 if all required attributes are present and valid", async () => {
      const response = await request(app.getHttpServer())
        .get("/orders")
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200);
    });

    it("should return 401 invalid token", async () => {
      const response = await request(app.getHttpServer())
        .get("/orders")
        .set('Authorization', `Bearer invalid`)
      expect(response.status).toBe(401);
    });
  });

  describe("POST /orders", () => {
    it("should return 201 if all required attributes are present and valid", async () => {
      const response = await request(app.getHttpServer())
        .post("/orders")
        .set('Authorization', `Bearer ${token}`)
        .send({
          customer: 2,
          inventory: 5,
          store: 2,
          quantity: 1,
          status: "processing"
        });
      expect(response.status).toBe(201);
    });

    it("should return 400 if customer is missing", async () => {
      const response = await request(app.getHttpServer())
        .post("/orders")
        .set('Authorization', `Bearer ${token}`)
        .send({
          inventory: 5,
          store: 2,
          quantity: 1,
          status: "processing"
        });
      expect(response.status).toBe(400);
    });

    it("should return 400 if inventory is missing", async () => {
      const response = await request(app.getHttpServer())
        .post("/orders")
        .set('Authorization', `Bearer ${token}`)
        .send({
          customer: 2,
          store: 2,
          quantity: 1,
          status: "processing"
        });
      expect(response.status).toBe(400);
    });

    it("should return 400 if store is missing", async () => {
      const response = await request(app.getHttpServer())
        .post("/orders")
        .set('Authorization', `Bearer ${token}`)
        .send({
          customer: 2,
          inventory: 5,
          quantity: 1,
          status: "processing"
        });
      expect(response.status).toBe(400);
    });

    it("should return 400 if quantity is missing", async () => {
      const response = await request(app.getHttpServer())
        .post("/orders")
        .set('Authorization', `Bearer ${token}`)
        .send({
          customer: 2,
          inventory: 5,
          store: 2,
          status: "processing"
        });
      expect(response.status).toBe(400);
    });

    it("should return 400 if status is missing", async () => {
      const response = await request(app.getHttpServer())
        .post("/orders")
        .set('Authorization', `Bearer ${token}`)
        .send({
          customer: 2,
          inventory: 5,
          store: 2,
          quantity: 1,
        });
      expect(response.status).toBe(400);
    });

    it("should return 400 if customer is not a number", async () => {
      const response = await request(app.getHttpServer())
        .post("/orders")
        .set('Authorization', `Bearer ${token}`)
        .send({
          customer: "1",
          inventory: 5,
          store: 2,
          quantity: 1,
          status: "processing"
        });
      expect(response.status).toBe(400);
    });

    it("should return 400 if inventory is not a number", async () => {
      const response = await request(app.getHttpServer())
        .post("/orders")
        .set('Authorization', `Bearer ${token}`)
        .send({
          customer: 2,
          inventory: "5",
          store: 2,
          quantity: 1,
          status: "processing"
        });
      expect(response.status).toBe(400);
    });

    it("should return 400 if store is not a number", async () => {
      const response = await request(app.getHttpServer())
        .post("/orders")
        .set('Authorization', `Bearer ${token}`)
        .send({
          customer: 2,
          inventory: 5,
          store: "2",
          quantity: 1,
          status: "processing"
        });
      expect(response.status).toBe(400);
    });

    it("should return 400 if quantity is not a number", async () => {
      const response = await request(app.getHttpServer())
        .post("/orders")
        .set('Authorization', `Bearer ${token}`)
        .send({
          customer: 2,
          inventory: 5,
          store: 2,
          quantity: "1",
          status: "processing"
        });
      expect(response.status).toBe(400);
    });

    it("should return 400 if status is not a string", async () => {
      const response = await request(app.getHttpServer())
        .post("/orders")
        .set('Authorization', `Bearer ${token}`)
        .send({
          customer: 2,
          inventory: 5,
          store: 2,
          quantity: 1,
          status: 1234
        });
      expect(response.status).toBe(400);
    });

    it("should return 404 if customer does not exist!", async () => {
      const response = await request(app.getHttpServer())
        .post("/orders")
        .set('Authorization', `Bearer ${token}`)
        .send({
          customer: 0,
          inventory: 5,
          store: 2,
          quantity: 1,
          status: "processing"
        });
      expect(response.status).toBe(404);
    });

    it("should return 404 if inventory does not exist!", async () => {
      const response = await request(app.getHttpServer())
        .post("/orders")
        .set('Authorization', `Bearer ${token}`)
        .send({
          customer: 2,
          inventory: 0,
          store: 2,
          quantity: 1,
          status: "processing"
        });
      expect(response.status).toBe(404);
    });

    it("should return 404 if store does not exist!", async () => {
      const response = await request(app.getHttpServer())
        .post("/orders")
        .set('Authorization', `Bearer ${token}`)
        .send({
          customer: 2,
          inventory: 5,
          store: 0,
          quantity: 1,
          status: "processing"
        });
      expect(response.status).toBe(404);
    });

    it("should return 400 if quantity is smaller then 1", async () => {
      const response = await request(app.getHttpServer())
        .post("/orders")
        .set('Authorization', `Bearer ${token}`)
        .send({
          customer: 2,
          inventory: 5,
          store: 2,
          quantity: -1,
          status: "processing"
        });
      expect(response.status).toBe(400);
    });

    it("should return 400 if status has wrong input", async () => {
      const response = await request(app.getHttpServer())
        .post("/orders")
        .set('Authorization', `Bearer ${token}`)
        .send({
          customer: 2,
          inventory: 5,
          store: 2,
          quantity: 1,
          status: "wrong"
        });
      expect(response.status).toBe(400);
    });
  });


  describe("GET /orders/:id", () => {
    it("should return 200  if all required attributes are present and valid", async () => {
      const response = await request(app.getHttpServer())
        .get("/orders/2")
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200);
    });

    it("should return 404 if order does not exist!", async () => {
      const response = await request(app.getHttpServer())
        .get("/orders/0")
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(404);
    });

  });

  describe("PUT /orders/:id", () => {
    it("should return 200  if all required attributes are present and valid", async () => {
      const response = await request(app.getHttpServer())
        .put("/orders/2")
        .set('Authorization', `Bearer ${token}`)
        .send({
          quantity: 5,
        });
      expect(response.status).toBe(200);
    });

    it("should return 404 if order not exist!", async () => {
      const response = await request(app.getHttpServer())
        .put("/orders/0")
        .set('Authorization', `Bearer ${token}`)
        .send({
          quantity: 5,
        });
      expect(response.status).toBe(404);
    });
  });

});