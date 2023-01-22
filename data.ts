export const PRODUCTS = {
  core: [
    {
      title: "Jack's Facts",
      description:
        "Some description about the product and why it should be used.",
    },
    {
      title: "WorkCannon",
      description:
        "Some description about the product and why it should be used.",
    },
    {
      title: "Thrilligence",
      description:
        "Some description about the product and why it should be used. I am using this extra text to make this one look a little different.",
    },
  ],
  eco: [
    {
      title: "Monday.com Apps",
      description:
        "Some description about the product and why it should be used.",
    },
    {
      title: "Hubspot Apps",
      description:
        "Some description about the product and why it should be used.",
    },
    {
      title: "Adobe Creative Cloud Apps",
      description:
        "Some description about the product and why it should be used.",
    },
  ],
  data: [
    {
      title: "Healthcare Industry",
      description:
        "Some description about the product and why it should be used.",
    },
    {
      title: "Financial Industry",
      description:
        "Some description about the product and why it should be used.",
    },
    {
      title: "Education",
      description:
        "Some description about the product and why it should be used.",
    },
  ],
};

export type ProductDataType = typeof PRODUCTS;
export type ProductType = keyof ProductDataType;
