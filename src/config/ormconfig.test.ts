import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "candy_store",
    entities: ["src/**/*.entity{.ts,.js}"],
    synchronize: true
}

export default config;
