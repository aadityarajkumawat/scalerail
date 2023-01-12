import { sanityClient } from "../sanity";

export async function getStaticProps() {
  const homePageContent = await sanityClient.fetch('*[_type=="home"][0]');
  return { props: { ...homePageContent } };
}

interface HomeProps {
  heading: string;
  description: string;
}

export default function Home({ heading, description }: HomeProps) {
  return (
    <div>
      <h1>{heading}</h1>
      <p>{description}</p>
    </div>
  );
}
