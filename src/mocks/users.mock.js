// src/mocks/users.mock.js
import { faker } from "@faker-js/faker"
import bcrypt from "bcrypt"

// Hasheamos la contraseña "coder123" una sola vez
const HASHED_PASSWORD = bcrypt.hashSync("coder123", 10)

// Un usuario con formato similar a un documento de Mongo
export const generateMockUser = () => ({
  _id: faker.database.mongodbObjectId(),          // simula el _id de Mongo
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.email().toLowerCase(),
  password: HASHED_PASSWORD,                      // "coder123" encriptada
  role: faker.helpers.arrayElement(["user", "admin"]),
  pets: []                                        // array vacío (consigna)
})

export const generateMockUsers = (qty = 1) =>
  Array.from({ length: qty }, () => generateMockUser())
