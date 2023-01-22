import { IconType } from "react-icons";
import { PRODUCTS, ProductType } from "../data";
import { ProductCard } from "../pages/products";

interface ProductsSectionProps {
  Icon: IconType;
  title: string;
  desc: string;
  productType: ProductType;
}

export function ProductsSection(props: ProductsSectionProps) {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="mb-10 text-center">
        <div className="flex items-center justify-center gap-4">
          <props.Icon size={40} />
          <h2 className="text-2xl">{props.title}</h2>
        </div>
        <p className="text-zinc-400">{props.desc}</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-8 w-full">
        {PRODUCTS[props.productType].map((product, i) => (
          <ProductCard
            key={i}
            title={product.title}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
}
