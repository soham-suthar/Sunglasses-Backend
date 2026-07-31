export const createProduct = async (overrides = {}) => {
  return await Product.create({
    name: "Black Sunglasses",
    price: 1499,
    color: "Black",
    section: "Men",
    description: "Black sunglasses",
    quantity: 15,
    src: "/public/black.jpg",
    hoverSrc: "/public/black-hover.jpg",
    ...overrides,
  });
};
