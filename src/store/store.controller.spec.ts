import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from "../app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from 'supertest';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../config/ormconfig.test';


describe("StoreController", () => {
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


  describe("GET /stores", () => {
    it("should return 200 if all required attributes are present and valid", async () => {
      const response = await request(app.getHttpServer())
        .get("/stores")
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200);
    });

    it("should return 401 invalid token", async () => {
      const response = await request(app.getHttpServer())
        .get("/stores")
        .set('Authorization', `Bearer invalid`)
      expect(response.status).toBe(401);
    });
  });

  describe("POST /stores", () => {
    it("should return 201 if all required attributes are present and valid", async () => {
      const response = await request(app.getHttpServer())
        .post("/stores")
        .set('Authorization', `Bearer ${token}`)
        .send({
          store_address: "test address",
          store_manager_name: "test manager"
        });
      expect(response.status).toBe(201);
    });

    it("should return 400 if store_address is missing", async () => {
      const response = await request(app.getHttpServer())
        .post("/stores")
        .set('Authorization', `Bearer ${token}`)
        .send({
          store_manager_name: "test manager"
        });
      expect(response.status).toBe(400);
    });

    it("should return 400 if store_manager_name is missing", async () => {
      const response = await request(app.getHttpServer())
        .post("/stores")
        .set('Authorization', `Bearer ${token}`)
        .send({
          store_address: "test address",
        });
      expect(response.status).toBe(400);
    });

    it("should return 400 if store_address is not a string", async () => {
      const response = await request(app.getHttpServer())
        .post("/orders")
        .set('Authorization', `Bearer ${token}`)
        .send({
          store_address: 123,
          store_manager_name: "test manager"
        });
      expect(response.status).toBe(400);
    });

    it("should return 400 if store_manager_name is not a string", async () => {
      const response = await request(app.getHttpServer())
        .post("/orders")
        .set('Authorization', `Bearer ${token}`)
        .send({
          store_address: "test address",
          store_manager_name: 123
        });
      expect(response.status).toBe(400);
    });
  });

  describe("GET /stores/:id", () => {
    it("should return 200  if all required attributes are present and valid", async () => {
      const response = await request(app.getHttpServer())
        .get("/stores/2")
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200);
    });

    it("should return 404 if store does not exist!", async () => {
      const response = await request(app.getHttpServer())
        .get("/stores/0")
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(404);
    });

  });

  describe("PUT /stores/:id", () => {
    it("should return 200  if all required attributes are present and valid", async () => {
      const response = await request(app.getHttpServer())
        .put("/stores/2")
        .set('Authorization', `Bearer ${token}`)
        .send({
          store_address: "test address updated",
        });
      expect(response.status).toBe(200);
    });

    it("should return 404 if customer does not exist!", async () => {
      const response = await request(app.getHttpServer())
        .put("/stores/0")
        .set('Authorization', `Bearer ${token}`)
        .send({
          store_address: "test address",
        });
      expect(response.status).toBe(404);
    });
  });

});