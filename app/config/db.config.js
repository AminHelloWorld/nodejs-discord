module.exports = {
  HOST: "localhost",
  USER: "testuser",
  PASSWORD: "test",
  DB: "testdb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
