/**
 * @openapi
 * /api/admin/dashboard:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get dashboard statistics
 *     description: Returns platform statistics including users, products, orders, revenue and order status counts.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: integer
 *                   example: 54
 *                 totalProducts:
 *                   type: integer
 *                   example: 120
 *                 totalOrders:
 *                   type: integer
 *                   example: 320
 *                 totalRevenue:
 *                   type: number
 *                   example: 245000
 *                 orderStatus:
 *                   type: object
 *                   properties:
 *                     placed:
 *                       type: integer
 *                       example: 45
 *                     processing:
 *                       type: integer
 *                       example: 20
 *                     shipped:
 *                       type: integer
 *                       example: 18
 *                     delivered:
 *                       type: integer
 *                       example: 210
 *                     cancelled:
 *                       type: integer
 *                       example: 27
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       403:
 *         $ref: "#/components/responses/Forbidden"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */

/**
 * @openapi
 * /api/admin/users:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get all users
 *     description: Returns a paginated list of users.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/Page"
 *       - $ref: "#/components/parameters/Limit"
 *       - $ref: "#/components/parameters/Search"
 *       - $ref: "#/components/parameters/Role"
 *       - $ref: "#/components/parameters/Sort"
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/User"
 *                 pagination:
 *                   $ref: "#/components/schemas/Pagination"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       403:
 *         $ref: "#/components/responses/Forbidden"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */

/**
 * @openapi
 * /api/admin/users/{id}:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get a specific user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/ObjectId"
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: "#/components/schemas/User"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       403:
 *         $ref: "#/components/responses/Forbidden"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 *
 *   patch:
 *     tags:
 *       - Admin
 *     summary: Update a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/ObjectId"
 *     requestBody:
 *       $ref: "#/components/requestBodies/UpdateUserRequest"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *                 user:
 *                   $ref: "#/components/schemas/User"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       403:
 *         $ref: "#/components/responses/Forbidden"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 *
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Delete a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/ObjectId"
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       403:
 *         $ref: "#/components/responses/Forbidden"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */

/**
 * @openapi
 * /api/admin/products:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get all products
 *     description: Returns a paginated list of products with optional searching, filtering and sorting.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/Page"
 *       - $ref: "#/components/parameters/Limit"
 *       - $ref: "#/components/parameters/Search"
 *       - $ref: "#/components/parameters/Color"
 *       - $ref: "#/components/parameters/Section"
 *       - $ref: "#/components/parameters/Sort"
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Product"
 *                 pagination:
 *                   $ref: "#/components/schemas/Pagination"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       403:
 *         $ref: "#/components/responses/Forbidden"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 *
 *   post:
 *     tags:
 *       - Admin
 *     summary: Add a new product
 *     description: Creates a new product.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       $ref: "#/components/requestBodies/AddProductRequest"
 *     responses:
 *       201:
 *         description: Product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product added successfully
 *                 newProduct:
 *                   $ref: "#/components/schemas/Product"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       403:
 *         $ref: "#/components/responses/Forbidden"
 *       409:
 *         $ref: "#/components/responses/Conflict"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */

/**
 * @openapi
 * /api/admin/products/{id}:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get a specific product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/ObjectId"
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   $ref: "#/components/schemas/Product"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       403:
 *         $ref: "#/components/responses/Forbidden"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 *
 *   patch:
 *     tags:
 *       - Admin
 *     summary: Update a product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/ObjectId"
 *     requestBody:
 *       $ref: "#/components/requestBodies/UpdateProductRequest"
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product updated successfully
 *                 product:
 *                   $ref: "#/components/schemas/Product"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       403:
 *         $ref: "#/components/responses/Forbidden"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       409:
 *         $ref: "#/components/responses/Conflict"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 *
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Delete a product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/ObjectId"
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product deleted successfully
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       403:
 *         $ref: "#/components/responses/Forbidden"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */

/**
 * @openapi
 * /api/admin/orders:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get all orders
 *     description: Returns a paginated list of orders with searching, filtering and sorting.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/Page"
 *       - $ref: "#/components/parameters/Limit"
 *       - $ref: "#/components/parameters/Search"
 *       - $ref: "#/components/parameters/OrderStatus"
 *       - $ref: "#/components/parameters/PaymentStatus"
 *       - $ref: "#/components/parameters/Sort"
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Order"
 *                 pagination:
 *                   $ref: "#/components/schemas/Pagination"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       403:
 *         $ref: "#/components/responses/Forbidden"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */

/**
 * @openapi
 * /api/admin/orders/{id}:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get a specific order
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/ObjectId"
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   $ref: "#/components/schemas/Order"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       403:
 *         $ref: "#/components/responses/Forbidden"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */

/**
 * @openapi
 * /api/admin/orders/{id}/status:
 *   patch:
 *     tags:
 *       - Admin
 *     summary: Update order status
 *     description: Updates the status of an order.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/ObjectId"
 *     requestBody:
 *       $ref: "#/components/requestBodies/UpdateOrderStatusRequest"
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Status changed successfully
 *                 order:
 *                   $ref: "#/components/schemas/Order"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       403:
 *         $ref: "#/components/responses/Forbidden"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       409:
 *         $ref: "#/components/responses/Conflict"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */

/**
 * @openapi
 * /api/admin/carts:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get all carts
 *     description: Returns a paginated list of user carts. Supports searching by user name or email.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/Page"
 *       - $ref: "#/components/parameters/Limit"
 *       - $ref: "#/components/parameters/Search"
 *     responses:
 *       200:
 *         description: Carts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Cart"
 *                 pagination:
 *                   $ref: "#/components/schemas/Pagination"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       403:
 *         $ref: "#/components/responses/Forbidden"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */

/**
 * @openapi
 * /api/admin/carts/{id}:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get a specific cart
 *     description: Returns complete details of a user's cart.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/ObjectId"
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   $ref: "#/components/schemas/Cart"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       403:
 *         $ref: "#/components/responses/Forbidden"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */
