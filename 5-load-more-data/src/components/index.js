import { useEffect, useState } from "react";
import "./styles.css";

export default function LoadMoreData() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [disabledButton, setDisabledButton] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`
      );
      const result = await response.json();
      // console.log(result);
      if (result && result.products && result.products.length) {
        setProducts(result.products);
        setLoading(false);
      }
    } catch (e) {
      console.log(e.message);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, [count]);
  useEffect(() => {
    if (products && products.length === 100) setDisabledButton(true);
  }, [products]);

  if (loading) {
    return <div>data is loading... please wait</div>;
  }

  return (
    <div className="container">
      <div className="produnct-container">
        {products && products.length
          ? products.map((item) => (
              <div key={item.id} className="product">
                <img src={item.thumbnail} alt={item.title} />
                <p>{item.title}</p>
              </div>
            ))
          : null}
      </div>
      <div className="button-container">
        <button onClick={() => setCount(count + 1)} disabled={disabledButton}>
          Load more data
        </button>
        {disabledButton ? <p>no more data</p> : null}
      </div>
    </div>
  );
}
