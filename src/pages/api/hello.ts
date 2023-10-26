import type { NextApiRequest, NextApiResponse } from "next";

// you cant import from backend code (this is from interview as you cant touch this code)
export type Product = { name: string; price: number };
export type ProductList = Record<number, Product>;

// you cant edit the handler function (this is from interview as you cant touch this code)
export default function handler(req: NextApiRequest, res: NextApiResponse<ProductList>) {
  res.status(200).json({
    2: {
      name: "Product 2",
      price: 2.99,
    },
    10: {
      name: "Product 10",
      price: 10.99,
    },
    199: {
      name: "Product 199",
      price: 129.99,
    },
  });
}
