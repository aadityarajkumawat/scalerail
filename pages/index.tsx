import { sanityClient } from "../sanity";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

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
      <Parallax pages={2}>
        <ParallaxLayer
          className="flex flex-col items-center justify-center"
          style={{
            backgroundPosition: "center",
            backgroundImage: `url(leaves_neon_triangle.jpg)`,
            backgroundSize: "cover",
          }}
        >
          <h2 className="text-center text-8xl">ScaleRail</h2>
          <p className="py-2 text-lg">software | ops | action</p>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.5}>
          Welcome to scalerail
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
