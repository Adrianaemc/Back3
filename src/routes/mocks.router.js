import { Router } from "express"
import userModel from "../dao/models/User.js"
import petModel from "../dao/models/Pet.js"
import { generateMockUsers } from "../mocks/users.mock.js"
import { generateMockPets } from "../mocks/pets.mock.js"

const router = Router()

/* ============================================
   GET /api/mocks/mockingusers
   Usa el módulo de mocking y genera 50 por defecto
   ============================================ */
router.get("/mockingusers", (req, res) => {
  try {
    const qty = Number(req.query.count) || 50   // si no envían nada → 50
    const users = generateMockUsers(qty)

    res.send({
      status: "success",
      payload: users
    })
  } catch (error) {
    console.error("Error en /mockingusers:", error)
    res.status(500).send({ status: "error", error: error.message })
  }
})

/* ============================================
   GET /api/mocks/mockingpets
   Versión mock del endpoint de mascotas
   ============================================ */
router.get("/mockingpets", (req, res) => {
  try {
    const qty = Number(req.query.count) || 100
    const pets = generateMockPets(qty)

    res.send({
      status: "success",
      payload: pets
    })
  } catch (error) {
    console.error("Error en /mockingpets:", error)
    res.status(500).send({ status: "error", error: error.message })
  }
})

/* ============================================
   POST /api/mocks/generateData
   Body JSON: { "users": number, "pets": number }
   Genera mocks e inserta en la BD con insertMany
   ============================================ */
router.post("/generateData", async (req, res) => {
  try {
    const usersQty = Number(req.body.users) || 0
    const petsQty = Number(req.body.pets) || 0

    const usersToInsert = usersQty > 0 ? generateMockUsers(usersQty) : []
    const petsToInsert = petsQty > 0 ? generateMockPets(petsQty) : []

    const [usersCreated, petsCreated] = await Promise.all([
      usersToInsert.length ? userModel.insertMany(usersToInsert) : [],
      petsToInsert.length ? petModel.insertMany(petsToInsert) : []
    ])

    res.send({
      status: "success",
      usersInserted: usersCreated.length,
      petsInserted: petsCreated.length
    })
  } catch (error) {
    console.error("Error en /generateData:", error)
    res.status(500).send({ status: "error", error: error.message })
  }
})

export default router