/**
 * @openapi
 * /api/checkout:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Create a new order
 *     description: Creates a new order from the authenticated user's cart.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       $ref: "#/components/requestBodies/CheckoutRequest"
 *     responses:
 *       201:
 *         description: Order created successfully
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
 *     summary: Get all orders
 *     description: Returns all orders belonging to the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
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
 *       - $ref: "#/components/parameters/ObjectId"
 *     responses:
 *       200:
 *         description: Order retrieved successfully
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
 *     summary: Cancel an order
 *     description: Cancels an order if it has not yet been shipped or delivered.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/ObjectId"
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *       400:
 *         $ref: "#/components/responses/BadRequest"
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
 *     summary: Pay for an order
 *     description: Completes payment for an order and updates stock.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/ObjectId"
 *     responses:
 *       200:
 *         description: Payment successful
 *       400:
 *         $ref: "#/components/responses/BadRequest"
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
 *       - Invoices
 *     summary: Download invoice
 *     description: Generates and downloads the invoice for an order.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/ObjectId"
 *     responses:
 *       200:
 *         description: Invoice generated successfully
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */
