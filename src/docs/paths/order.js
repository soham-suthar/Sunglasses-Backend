/**
 * @openapi
 * /api/checkout:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Checkout cart
 *     description: Creates a new order from the authenticated user's cart.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/OrderCreatedResponse"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */

/**
 * @openapi
 * /api/order:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get user's orders
 *     description: Returns all orders belonging to the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Order"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */

/**
 * @openapi
 * /api/orders/{id}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get order by ID
 *     description: Returns details of a specific order.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Order"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */

/**
 * @openapi
 * /api/orders/{id}/pay:
 *   patch:
 *     tags:
 *       - Orders
 *     summary: Mark order as paid
 *     description: Simulates successful payment for an order.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Payment completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/PaymentResponse"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */

/**
 * @openapi
 * /api/orders/{id}/cancel:
 *   patch:
 *     tags:
 *       - Orders
 *     summary: Cancel order
 *     description: Cancels an existing order.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/CancelOrderResponse"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */

/**
 * @openapi
 * /api/orders/{id}/invoice:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Download invoice
 *     description: Downloads the PDF invoice for an order.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: PDF invoice
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */
