import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from "../app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from 'supertest';
import { ConfigService } from '@nestjs/config';

describe("CustomerController", () => {
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


  describe("GET /customers", () => {
    it("should return 200 if all required attributes are present and valid", async () => {
      const response = await request(app.getHttpServer())
        .get("/customers")
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200);
    });

    it("should return 401 invalid token", async () => {
      const response = await request(app.getHttpServer())
        .get("/customers")
        .set('Authorization', `Bearer invalid`)
      expect(response.status).toBe(401);
    });
  });

  describe("POST /customers", () => {
    it("should return 201 if all required attributes are present and valid", async () => {
      const response = await request(app.getHttpServer())
        .post("/customers")
        .set('Authorization', `Bearer ${token}`)
        .send({
          customer_name: "TEST"
        });
      expect(response.status).toBe(201);
    });

    it("should return 400 if customer is missing", async () => {
      const response = await request(app.getHttpServer())
        .post("/customers")
        .set('Authorization', `Bearer ${token}`)
        .send();
      expect(response.status).toBe(400);
    });

    it("should return 400 if status is not a string", async () => {
      const response = await request(app.getHttpServer())
        .post("/customers")
        .set('Authorization', `Bearer ${token}`)
        .send({
          customer_name: 12345
        });
      expect(response.status).toBe(400);
    });
  });


  describe("GET /customers/:id", () => {
    it("should return 200  if all required attributes are present and valid", async () => {
      const response = await request(app.getHttpServer())
        .get("/orders/2")
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200);
    });

    it("should return 404 if customer does not exist!", async () => {
      const response = await request(app.getHttpServer())
        .get("/orders/0")
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(404);
    });

  });

  describe("PUT /customers/:id", () => {
    it("should return 200  if all required attributes are present and valid", async () => {
      const response = await request(app.getHttpServer())
        .put("/customers/2")
        .set('Authorization', `Bearer ${token}`)
        .send({
          customer_name: "TEST Updated"
        });
      expect(response.status).toBe(200);
    });

    it("should return 404 if customer does not exist!", async () => {
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