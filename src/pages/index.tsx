import type { NextPage } from "next";
import { useState, useEffect } from "react";

// requirements: make it work :) doesnt matter how
type Product = { name: string, price: number }

function getApiHello(): Promise<Record<number, Product>> {
  return fetch("/api/hello")
    .then((response) => response.json())
}

const Home: NextPage = () => {
  const [products, setProducts] = useState<null | (Product & { key: string })[]>(null);

  useEffect(() => {
    getApiHello()
      .then((json) => Object.entries(json).map(i => ({
        key: i[0],
        ...i[1],
      })))
      .then(result => setProducts(result))
      .catch(e => console.error(e))
  }, [])

  if (!products) {
    return <div>Loading</div>
  }

  return (
    <div>
      {products.map((product) => {
        return (
          <div key={product.key}>
            <p>{product.name}</p>
            <p>{product.price}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Home;