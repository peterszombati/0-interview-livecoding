import type { NextPage } from "next";
import { useState, useEffect } from "react";

// requirements: make it work :) doesnt matter how
type Product = { name: string, price: number }

function getApiHello(): Promise<Record<number, Product>> {
  return fetch("/api/hello")
    .then((response) => response.json())
}

const Home: NextPage = () => {
  const [products, setProducts] = useState<null | Product[]>(null);

  useEffect(() => {
    getApiHello()
      .then((json) => Object.entries(json).map(i => i[1]))
      .then(result => setProducts(result))
      .catch(e => console.error(e))
  }, [])

  if (!products) {
    return <div>Loading</div>
  }

  return (
    <div>
      {products.map((product, index) => {
        return (
          <div key={index}>
            <p>{product.name}</p>
            <p>{product.price}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Home;