const database = require("./db");
const uri = process.env.URI || "mongodb://localhost:27017/spenny"


test('Database Connection', () => {
  expect(database(uri)).toBe("Successfully connected to Database");
});