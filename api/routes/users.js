import express from 'express';
import {addUser} from "../controllers/users.js"
const router= express.Router()

// router.get("/", getUsers)

router.post("/", addUser)

export default router