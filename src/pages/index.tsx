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
