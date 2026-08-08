import {Router} from 'express'
import registerUserController from '../controller/register.controller.js'
import loginUserController from '../controller/login.controller.js'
import logoutUserController from '../controller/logout.controller.js'
import getUserController from '../controller/getUser.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

export const  authRouter = Router()

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register",registerUserController)

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post("/login",loginUserController)


/**
 * @route POST /api/auth/logout
 * @desc Logout a user clears the authentication token from cookies and add the token to the blacklist collection in the database
 * @access Public
 * 
 */
authRouter.get("/logout",logoutUserController)


/**
 * @route GET /api/auth/getUser
 * @desc Get the currently logged-in user's information
 * @access Public
 */

authRouter.get("/getUser",authMiddleware,getUserController)