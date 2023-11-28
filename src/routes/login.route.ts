import { LoginController } from '../controllers/login.controller';
import express from 'express';
import passport from "passport"

const loginRouter = express.Router();
const loginController = new LoginController();

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '400':
 *         description: Invalid request or credentials
 *       '401':
 *         description: Unauthorized - Invalid credentials
 *       '500':
 *         description: Server error
 */
loginRouter.post("/login", loginController.Login);

/**
 * @swagger
 * /api/logout:
 *   get:
 *     summary: Logout user
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: User logged out successfully
 */

loginRouter.get("/logout", loginController.Logout);

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               age:
 *                 type: integer
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User registered successfully
 *       '400':
 *         description: Invalid request
 *       '409':
 *         description: User with provided email already exists
 *       '500':
 *         description: Error registering user
 */


loginRouter.post("/register", loginController.Register);

//GITHUB

//Callback function
loginRouter.get('/login/github', loginController.LoginGithub)

loginRouter.get("/auth/github", loginController.AuthorizeGithub)

loginRouter.get("/session/current", loginController.Current)


export default loginRouter;
