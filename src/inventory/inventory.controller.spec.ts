import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from "../app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from 'supertest';
import { ConfigService } from '@nestjs/config';

describe("InventoryController", () => {
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


  describe("GET /inventories", () => {
    it("should return 200 if all required attributes are present and valid", async () => {
      const response = await request(app.getHttpServer())
        .get("/inventories")
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200);
    });

    it("should return 401 invalid token", async () => {
      const response = await request(app.getHttpServer())
        .get("/inventories")
        .set('Authorization', `Bearer invalid`)
      expect(response.status).toBe(401);
    });
  });

  describe("POST /inventories", () => {
    it("should return 201 if all required attributes are present and valid", async () => {
      const response = await request(app.getHttpServer())
        .post("/inventories")
        .set('Authorization', `Bearer ${token}`)
        .send({
          inventory_name: "test candy",
          manufacture_date: "2023-08-11",
          available_quantity: 20
        });
      expect(response.status).toBe(201);
    });

    it("should return 400 if inventory_name is missing", async () => {
      const response = await request(app.getHttpServer())
        .post("/inventories")
        .set('Authorization', `Bearer ${token}`)
        .send({
          manufacture_date: "2023-08-11",
          available_quantity: 20
        });
      expect(response.status).toBe(400);
    });

    it("should return 400 if manufacture_date is missing", async () => {
      const response = await request(app.getHttpServer())
        .post("/inventories")
        .set('Authorization', `Bearer ${token}`)
        .send({
          inventory_name: "test candy",
          available_quantity: 20
        });
      expect(response.status).toBe(400);
    });

    it("should return 400 if available_quantity is missing", async () => {
      const response = await request(app.getHttpServer())
        .post("/inventories")
        .set('Authorization', `Bearer ${token}`)
        .send({
          inventory_name: "test candy",
          manufacture_date: "2023-08-11",
        });
      expect(response.status).toBe(400);
    });

    it("should return 400 if inventory_name is not a string", async () => {
      const response = await request(app.getHttpServer())
        .post("/inventories")
        .set('Authorization', `Bearer ${token}`)
        .send({
          inventory_name: 123,
          manufacture_date: "2023-08-11",
          available_quantity: 20
        });
      expect(response.status).toBe(400);
    });

    it("should return 400 if manufacture_date is not a Date", async () => {
      const response = await request(app.getHttpServer())
        .post("/inventories")
        .set('Authorization', `Bearer ${token}`)
        .send({
          inventory_name: "test candy",
          manufacture_date: 123,
          available_quantity: 20
        });
      expect(response.status).toBe(400);
    });

    it("should return 400 if available_quantity is not a number", async () => {
      const response = await request(app.getHttpServer())
        .post("/inventories")
        .set('Authorization', `Bearer ${token}`)
        .send({
          inventory_name: "test candy",
          manufacture_date: "2023-08-11",
          available_quantity: "string"
        });
      expect(response.status).toBe(400);
    });

    it("should return 400 if available_quantity smaller then 1", async () => {
      const response = await request(app.getHttpServer())
        .post("/inventories")
        .set('Authorization', `Bearer ${token}`)
        .send({
          inventory_name: "test candy",
          manufacture_date: "2023-08-11",
          available_quantity: 0
        });
      expect(response.status).toBe(400);
    });
  });


  describe("GET /inventories/:id", () => {
    it("should return 200  if all required attributes are present and valid", async () => {
      const response = await request(app.getHttpServer())
        .get("/inventories/5")
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200);
    });

    it("should return 404 if inventory does not exist!", async () => {
      const response = await request(app.getHttpServer())
        .get("/inventories/0")
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(404);
    });

  });

  describe("PUT /inventories/:id", () => {
    it("should return 200  if all required attributes are present and valid", async () => {
      const response = await request(app.getHttpServer())
        .put("/inventories/6")
        .set('Authorization', `Bearer ${token}`)
        .send({
          inventory_name: "test candy updated",
        });
      expect(response.status).toBe(200);
    });

    it("should return 404 if inventory does not exist!", async () => {
      const response = await request(app.getHttpServer())
        .put("/inventories/0")
        .set('Authorization', `Bearer ${token}`)
        .send({
          inventory_name: "test candy updated",
        });
      expect(response.status).toBe(404);
    });
  });

});