const {DataSource} = require('typeorm');

const dbConfig = {
    synchronize: false,
    migrations: ['dist/migration/*.js'],
};

switch (process.env.NODE_ENV) {
    case 'development':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'db.sqlite',
            entities: ['dist/**/*.entity.js'],
        });
        break;

    case 'test':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'test.sqlite',
            entities: ['src/**/*.entity.ts'],
        });
        break;

    case 'production':
        Object.assign(dbConfig, {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            migrationsRun: true,
            entities: ['**/*.entity.js'],
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
    dbConfig,        // 🔹 for Nest
    AppDataSource,   // 🔹 for CLI
};