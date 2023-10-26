import type { NextPage } from "next";
import { useState, useEffect } from "react";

// requirements: make it work :) doesnt matter how
type Product = { name: string, price: number }
type JsonResponse = Record<number, Product>
type State = (Product & { key: string })[]

function getApiHello() {
  return fetch("/api/hello")
    .then((response) => response.json())
    .then((json: JsonResponse) => Object.entries(json).map(i => ({
      key: i[0],
      ...i[1],
    })))
}

const Home: NextPage = () => {
  const [products, setProducts] = useState<State | null>(null);

  useEffect(() => {
    getApiHello()
      .then(result => setProducts(result))
      .catch(e => console.error(e))
  }, []);

  return (
    <div>
      {products ? products.map((product) => {
        return (
          <div key={product.key}>
            <p>{product.name}</p>
            <p>{product.price}</p>
          </div>
        );
      }) : 'Loading'}
    </div>
  );
};

export default Home;