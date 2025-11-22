import { faker } from "@faker-js/faker"

export const generateMockPet = () => ({
  name: faker.animal.petName(),                        
  specie: faker.helpers.arrayElement(["dog", "cat"]),  
  birthDate: faker.date.past({ years: 15 }),           
  adopted: false,                                      
  owner: null,                                        
  image: faker.image.url()                             
})

export const generateMockPets = (qty = 1) =>
  Array.from({ length: qty }, () => generateMockPet())
