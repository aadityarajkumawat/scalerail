import { ProductsSection } from "../components/ProductsSection";
import { GiClockwork, GiCosmicEgg } from "react-icons/gi";
import { ImDatabase } from "react-icons/im";
import Head from "next/head";

interface ProductCardProps {
  title: string;
  description: string;
}

export function ProductCard(props: ProductCardProps) {
  return (
    <div className="bg-zinc-900 rounded-lg p-10 border border-zinc-800 w-full">
      <div className="flex justify-center items-center mb-5">
        <h3>{props.title}</h3>
      </div>

      <div className="text-zinc-300">
        <p className="text-center">{props.description}</p>
      </div>
    </div>
  );
}

function Products() {
  return (
    <div className="w-full flex flex-col justify-center items-center py-10">
      <Head>
        <title>ScaleRail | Products</title>
      </Head>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-pleasant-blue">Products</h1>
      </div>

      <div className="flex flex-col justify-center items-center gap-10 px-10 max-w-[600px]">
        <ProductsSection
          title="Core Products"
          desc="The best core products in the world, that you can find for your business."
          productType="core"
          Icon={GiClockwork}
        />
        <ProductsSection
          title="Ecosystem Products"
          desc="The best eco-system products in the world, that you can find for your business."
          productType="eco"
          Icon={GiCosmicEgg}
        />
        <ProductsSection
          title="Data Products"
          desc="The best data products in the world, that you can find for your business."
          productType="data"
          Icon={ImDatabase}
        />
      </div>
    </div>
  );
}

export default Products;
