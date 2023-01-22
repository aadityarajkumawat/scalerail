import { ProductsSection } from "../components/ProductsSection";
import { GiClockwork, GiCosmicEgg } from "react-icons/gi";
import { ImDatabase } from "react-icons/im";

interface ProductCardProps {
  title: string;
  description: string;
}

export function ProductCard(props: ProductCardProps) {
  return (
    <div className="bg-zinc-900 rounded-lg p-10 border border-zinc-800 w-[600px]">
      <div className="flex justify-center items-center mb-5">
        <h3>{props.title}</h3>
      </div>

      <div className="text-zinc-500">
        <p>{props.description}</p>
      </div>
    </div>
  );
}

function Products() {
  return (
    <div className="w-full flex flex-col justify-center items-center py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-pleasant-blue">Products</h1>
      </div>

      <div className="flex flex-col justify-center items-center gap-10">
        <ProductsSection
          title="Core Products"
          desc="desc"
          productType="core"
          Icon={GiClockwork}
        />
        <ProductsSection
          title="Ecosystem Products"
          desc="desc"
          productType="eco"
          Icon={GiCosmicEgg}
        />
        <ProductsSection
          title="Data Products"
          desc="desc"
          productType="data"
          Icon={ImDatabase}
        />
      </div>
    </div>
  );
}

export default Products;
