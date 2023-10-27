### Interview description

requirements: make it work, no matter how

you get this `json` in response
```json
{
  "2": {
    "name": "Product 2",
    "price": 2.99
  },
  "10": {
    "name": "Product 10",
    "price": 10.99
  },
  "199": {
    "name": "Product 199",
    "price": 129.99
  }
}
```
you have to edit only this code and don't import from other files (don't touch backend code)
```ts
import type { NextPage } from "next";
import { useState, useEffect } from "react";

const Home: NextPage = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/hello").then((response) => {});
  }, []);

  return (
    <div>
      {products.map((product) => {
          return (
            <div key={0}>
              <p>{product.name}</p>
              <p>{product.price}</p>
              </div>
          );
        })}
    </div>
  );
};

export default Home;
```
### solution
```ts
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
```