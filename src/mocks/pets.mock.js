// src/mocks/pets.mock.js
import { faker } from "@faker-js/faker"

export const generateMockPet = () => ({
  name: faker.animal.petName(),                        // requerido
  specie: faker.helpers.arrayElement(["dog", "cat"]),  // requerido
  birthDate: faker.date.past({ years: 15 }),           // opcional
  adopted: false,                                      // default
  owner: null,                                         // sin dueño
  image: faker.image.url()                             // opcional
})

export const generateMockPets = (qty = 1) =>
  Array.from({ length: qty }, () => generateMockPet())
