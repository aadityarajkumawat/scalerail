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
          offset={0}
          speed={1}
          style={{
            backgroundPosition: "center",
            backgroundImage: "url(leaves_neon_triangle.jpg)",
            backgroundSize: "cover",
          }}
        />
        <ParallaxLayer
          offset={0}
          speed={0.5}
          className="flex justify-center items-center"
        >
          <div
            className="flex flex-col justify-center items-center w-full h-80 flex-1"
            style={{
              background:
                "linear-gradient(180deg, rgba(217, 217, 217, 0) 0%, rgba(20, 20, 20, 0.621455) 49.08%, rgba(217, 217, 217, 0) 100%)",
            }}
          >
            <h2 className="text-center text-7xl">ScaleRail</h2>
            <p className="py-2 text-lg">software | ops | action</p>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.5}>
          this is not what you are looking for
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
