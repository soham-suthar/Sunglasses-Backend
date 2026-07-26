/**
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login a user
 *     description: Authenticates a user and returns a JWT token.
 *     security: []
 *     requestBody:
 *       $ref: "#/components/requestBodies/LoginRequest"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */

/**
 * @openapi
 * /api/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Creates a new user account.
 *     security: []
 *     requestBody:
 *       $ref: "#/components/requestBodies/RegisterRequest"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       409:
 *         $ref: "#/components/responses/Conflict"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */

/**
 * @openapi
 * /api/profile:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Get authenticated user's profile
 *     description: Returns authenticated user's profile information.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */
