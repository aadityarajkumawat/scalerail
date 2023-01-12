import { sanityClient } from "../sanity";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useEffect, useState } from "react";

export async function getStaticProps() {
  const homePageContent = await sanityClient.fetch('*[_type=="home"][0]');
  return { props: { ...homePageContent } };
}

interface HomeProps {
  heading: string;
  description: string;
}

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = (e: any) => {
      setScrollPosition(e.target.scrollTop);
    };
    const parallaxContainer = document.querySelector(".parallax-container");
    parallaxContainer?.addEventListener("scroll", updatePosition);
    return () =>
      parallaxContainer?.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};

export default function Home({ heading, description }: HomeProps) {
  const scrollPosition = useScrollPosition();
  console.log({ scrollPosition });

  return (
    <div>
      <Parallax className="parallax-container" pages={4}>
        <ParallaxLayer
          offset={0}
          speed={1.2}
          style={{
            backgroundPosition: "center",
            backgroundImage: "url(leaves_neon_triangle.jpg)",
            backgroundSize: "cover",
            zIndex: 3,
          }}
        />
        <ParallaxLayer
          offset={0}
          speed={0.5}
          style={{ zIndex: 3 }}
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
        {/* {scrollPosition > 160 ? ( */}
        <ParallaxLayer
          offset={0}
          sticky={{ start: 0, end: 0.15 }}
          style={{
            backgroundPosition: "center",
            backgroundImage: "url(leaves_neon_triangle_left_90.jpg)",
            backgroundSize: "cover",
            zIndex: -1,
          }}
        />
        <ParallaxLayer
          offset={0}
          speed={1}
          style={{
            color: "white",
            transform: "translate(5rem, 570%)",
            zIndex: 2,
            width: "calc(100% - 5rem)",
            height: 100,
          }}
        >
          <div className="bg-black w-fit py-5 px-10 rounded-lg text-pleasant-blue text-lg">
            Imagination is the voice of daring. If there is anything Godlike
            <br />
            about God, it is that. He dared to imagine everything. - Henry
            <br />
            Miller
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1.2}>
          <div className="max-w-3xl m-auto">
            <h1 className="text-pleasant-blue text-5xl leading-snug mb-10">
              We make tools for the most productive people on planet earth
            </h1>
            <p className="text-3xl text-pleasant-blue leading-snug">
              The most productive human in the history of the world is alive
              today - and we think he needs more than a spreadsheet.
            </p>
            <p className="my-10 text-lg">
              Our tools are designed to maximize the most important metric at
              your company &quot;average hours of focused attention&quot;
            </p>
            <p className="my-10 text-lg">
              We&apos;re constantly innovating new solutions to make your
              workflow easier and more efficient
            </p>
            <p className="my-10 text-lg">
              We believe everyone should have access to powerful tools that
              enable peak productivity. With our tools, you&apos;ll be able to
              work smarter and faster than ever before
            </p>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
