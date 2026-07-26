/**
 * @openapi
 * /api/cart:
 *   get:
 *     tags:
 *       - Cart
 *     summary: Get authenticated user's cart
 *     description: Returns all products currently in the authenticated user's cart along with total items and total price.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */

/**
 * @openapi
 * /api/cart:
 *   post:
 *     tags:
 *       - Cart
 *     summary: Add product to cart
 *     description: Adds a product to the authenticated user's cart.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       $ref: "#/components/requestBodies/AddToCartRequest"
 *     responses:
 *       200:
 *         description: Product added to cart successfully
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
 * /api/cart:
 *   delete:
 *     tags:
 *       - Cart
 *     summary: Clear cart
 *     description: Removes all products from the authenticated user's cart.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */

/**
 * @openapi
 * /api/cart/{id}:
 *   patch:
 *     tags:
 *       - Cart
 *     summary: Update cart item quantity
 *     description: Updates the quantity of a specific product in the authenticated user's cart.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/ObjectId"
 *     requestBody:
 *       $ref: "#/components/requestBodies/UpdateCartRequest"
 *     responses:
 *       200:
 *         description: Cart updated successfully
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
 * /api/cart/{id}:
 *   delete:
 *     tags:
 *       - Cart
 *     summary: Remove product from cart
 *     description: Removes a specific product from the authenticated user's cart.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/ObjectId"
 *     responses:
 *       200:
 *         description: Product removed from cart successfully
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */
