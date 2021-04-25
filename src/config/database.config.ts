import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export default {
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  type: process.env.DATABASE_TYPE || 'postgres',
  enableSSL: !!process.env.DATABASE_SSL,

  getConfig(): TypeOrmModuleOptions {
    return {
      type: this.get('database.type'),
      host: this.get('database.host'),
      port: this.get('database.port'),
      username: this.get('database.username'),
      password: this.get('database.password'),
      database: this.get('database.database'),
      entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
      synchronize: true,
      ssl: this.get('database.enableSSL')
      // migrationsTableName: 'migration',
      // migrations: ['src/migration/*.ts'],
      // cli: {
      //   migrationsDir: 'src/migration'
      // },
    }
  }
}
