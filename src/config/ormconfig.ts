import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const isTesting = process.env.NODE_ENV === 'test';

const entitiesPattern = isTesting ? 'src/**/*.entity{.ts,.js}' : 'dist/**/*.entity{.ts,.js}';

const config: TypeOrmModuleOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "candy_store",
    entities: [entitiesPattern],
    synchronize: true
}

export default config;