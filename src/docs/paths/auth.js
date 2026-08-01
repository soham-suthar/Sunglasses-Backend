/**
 * @openapi
 * /api/register:
 *   post:
 *     tags:
 *       - Authentication
 *     operationId: registerUser
 *     summary: Register a new user
 *     description: Creates a new user account and sends a verification email.
 *     security: []
 *     requestBody:
 *       $ref: "#/components/requestBodies/RegisterRequest"
 *     responses:
 *       201:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/RegisterResponse"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       409:
 *         $ref: "#/components/responses/Conflict"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */

/**
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - Authentication
 *     operationId: loginUser
 *     summary: Login a user
 *     description: Authenticates a registered user and returns a JWT access token.
 *     security: []
 *     requestBody:
 *       $ref: "#/components/requestBodies/LoginRequest"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/LoginResponse"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       403:
 *         description: Email not verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please verify your email before logging in.
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */

/**
 * @openapi
 * /api/profile:
 *   get:
 *     tags:
 *       - Authentication
 *     operationId: getProfile
 *     summary: Get authenticated user's profile
 *     description: Returns the profile information of the currently authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */

/**
 * @openapi
 * /api/refresh-token:
 *   post:
 *     tags:
 *       - Authentication
 *     operationId: refreshAccessToken
 *     summary: Refresh access token
 *     description: Issues a new access token using the httpOnly refresh token cookie set at login. Rotates the refresh token on each use.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: New access token issued
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/RefreshTokenResponse"
 *       401:
 *         description: Refresh token missing, invalid, or expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid or expired refresh token
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */

/**
 * @openapi
 * /api/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     operationId: logoutUser
 *     summary: Logout the current user
 *     description: Clears the refresh token cookie and invalidates the stored refresh token server-side.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/LogoutResponse"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */
