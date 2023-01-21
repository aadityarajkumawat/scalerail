import { Navbar } from "../components/navbar";

interface ProductCardProps {
  title: string;
  description: string;
}

function ProductCard(props: ProductCardProps) {
  return (
    <div className="bg-zinc-900 rounded-lg p-10 border border-zinc-800 w-[600px]">
      <div className="flex justify-center items-center mb-5">
        <img
          src="https://obsidian.md/images/connection-hub.svg"
          alt="logo"
          className="w-8"
        />
        <h3>{props.title}</h3>
      </div>

      <div className="text-zinc-500">
        <p>{props.description}</p>
      </div>
    </div>
  );
}

const PRODUCTS = {
  core: [
    {
      title: "Jack's Facts",
      description:
        "Some description about the product and why it should be used.",
    },
    {
      title: "Jack's Facts",
      description:
        "Some description about the product and why it should be used.",
    },
    {
      title: "Jack's Facts",
      description:
        "Some description about the product and why it should be used. I am using this extra text to make this one look a little different.",
    },
  ],
};

function Products() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Products</h1>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold underline">Core Products</h2>
          <p className="text-zinc-400">
            A breief description about core products, for the user to
            understand.
          </p>
        </div>

        <div className="flex flex-col justify-center items-center gap-8">
          {PRODUCTS.core.map((product, i) => (
            <ProductCard
              key={i}
              title={product.title}
              description={product.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
