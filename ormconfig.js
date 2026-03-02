const { DataSource } = require('typeorm');

const dbConfig = {
    synchronize: false,
};

switch (process.env.NODE_ENV) {
    case 'development':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'db.sqlite',
            entities: ['src/**/*.entity.ts'],
            migrations: ['migration/*.ts'],  // ✅ FIXED
        });
        break;

    case 'test':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'test.sqlite',
            entities: ['src/**/*.entity.ts'],
            migrations: ['migration/*.ts'],
        });
        break;

    case 'production':
        Object.assign(dbConfig, {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            migrationsRun: true,
            entities: ['dist/**/*.entity.js'],
            migrations: ['dist/migration/*.js'], // ✅ correct for prod
            ssl: {
                rejectUnauthorized: false,
            },
        });
        break;

    default:
        throw new Error('Unknown environment');
}

const AppDataSource = new DataSource(dbConfig);

module.exports = {
    dbConfig,
    AppDataSource,
};