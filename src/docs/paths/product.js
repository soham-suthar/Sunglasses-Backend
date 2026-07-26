/**
 * @openapi
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all products
 *     description: Returns all products. Optionally filter products by color.
 *     parameters:
 *       - $ref: "#/components/parameters/Color"
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */

/**
 * @openapi
 * /api/colors:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get available colors
 *     description: Returns a list of all unique product colors.
 *     responses:
 *       200:
 *         description: Colors retrieved successfully
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */
