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

/**
 * @openapi
 * /api/forgot-password:
 *   post:
 *     tags:
 *       - Authentication
 *     operationId: forgotPassword
 *     summary: Request a password reset
 *     description: Sends a password reset link to the provided email if an account exists. Always returns a generic success message, regardless of whether the email is registered, to prevent account enumeration.
 *     security: []
 *     requestBody:
 *       $ref: "#/components/requestBodies/ForgotPasswordRequest"
 *     responses:
 *       200:
 *         description: Generic confirmation message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ForgotPasswordResponse"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */

/**
 * @openapi
 * /api/reset-password/{token}:
 *   post:
 *     tags:
 *       - Authentication
 *     operationId: resetPassword
 *     summary: Reset password using a reset token
 *     description: Sets a new password using the token emailed via the forgot-password flow. Invalidates any existing refresh token on the account.
 *     security: []
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The password reset token from the emailed link
 *     requestBody:
 *       $ref: "#/components/requestBodies/ResetPasswordRequest"
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResetPasswordResponse"
 *       400:
 *         description: Invalid or expired reset token, or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid or expired password reset link
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */
