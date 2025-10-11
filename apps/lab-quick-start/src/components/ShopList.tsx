import { memo } from "react";

const products = [
  { title: "卷心菜", isFruit: false, id: 1 },
  { title: "大蒜", isFruit: false, id: 2 },
  { title: "苹果", isFruit: true, id: 3 },
];

function ShopList() {
  const listItems = products.map((product) => (
    <li
      key={product.id}
      style={{
        color: product.isFruit ? "red" : "black",
      }}
    >
      {product.title}
    </li>
  ));
  return <ul>{listItems}</ul>;
}

export default memo(ShopList);
