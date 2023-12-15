import express from 'express'
import { deleteUser, test, updateUser } from '../controllers/user.controller.js'
import { verifyToken } from '../util/verifiyUser.js'

const router = express.Router()

router.get('/',test)
router.post("/update/:id",verifyToken,updateUser)
router.post("/delete/:id",verifyToken,deleteUserUser)

export default router
