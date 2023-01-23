import Head from "next/head";
import Image, { ImageLoader } from "next/image";
import { useEffect, useState } from "react";
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
  useEffect(() => {
    const mainText = document.getElementById("main-text");

    if (!mainText) return;

    window.addEventListener("scroll", () => {
      const scroll = window.scrollY;
      if (scroll > 200) {
        return;
      }
      mainText.style.transform = `translateY(${scroll + 0.1 * scroll}px)`;
    });
  }, []);

  return (
    <div>
      <Head>
        <title>ScaleRail</title>
        <link rel="preload" href={"/leaves_neon_triangle.jpg"} as="image" />
      </Head>
      <section>
        <div
          id="parallax landing-img"
          className="parallax-item"
          style={{
            backgroundSize: "cover",
          }}
        >
          <div
            id="shadow"
            className="w-full h-full flex-col text-center flex justify-center items-center"
          >
            <div
              id="main-text"
              className="w-full h-[800px] flex flex-col justify-center"
              style={{
                background:
                  "linear-gradient(180deg, rgba(217, 217, 217, 0) 0%, rgba(15, 15, 15, 0.7) 49.08%, rgba(217, 217, 217, 0) 100%)",
              }}
            >
              <h2
                id="shadow"
                className="text-center text-7xl font-thin max-md:text-5xl"
              >
                ScaleRail
              </h2>
              <p className="py-2 text-lg">software | ops | action</p>
            </div>
          </div>
        </div>

        <div className="parallax-item"></div>

        <div
          className="parallax-item h-[400px] max-lg:h-[300px]"
          style={{ justifyContent: "start" }}
        ></div>

        <div className="parallax-item">
          <div className="max-w-3xl m-auto px-10 py-10">
            <h1 className="text-pleasant-blue text-5xl leading-snug mb-10 max-lg:text-3xl">
              We make tools for the most productive people on planet earth
            </h1>
            <p className="text-3xl text-second leading-snug max-lg:text-xl">
              The most productive human in the history of the world is alive
              today - and we think he needs more than a spreadsheet.
            </p>
            <p className="my-10 text-lg max-lg:text-base text-second">
              Our tools are designed to maximize the most important metric at
              your company &quot;average hours of focused attention&quot;
            </p>
            <p className="my-10 text-lg max-lg:text-base text-second">
              We&apos;re constantly innovating new solutions to make your
              workflow easier and more efficient
            </p>
            <p className="my-10 text-lg max-lg:text-base text-second">
              We believe everyone should have access to powerful tools that
              enable peak productivity. With our tools, you&apos;ll be able to
              work smarter and faster than ever before
            </p>
          </div>
        </div>
        <div
          className="parallax-item h-[400px] max-lg:h-[300px]"
          style={{ justifyContent: "start" }}
        ></div>
        <div className="parallax-item">
          <div className="max-w-3xl m-auto px-10 py-10">
            <h1 className="text-pleasant-blue text-5xl leading-snug mb-10 max-lg:text-3xl">
              Creativity is the intersection region of knowledge + imagination
            </h1>
            <p className="text-3xl text-second leading-snug max-lg:text-xl">
              Our products do one thing: increase the area of this interaction
              region
            </p>
            <p className="my-10 text-lg max-lg:text-base text-second">
              Our tools provide the bridge that lets you explore your creative
              potential and unlock new possibilities
            </p>
            <p className="my-10 text-lg max-lg:text-base text-second">
              By combining intelligence, tools and technology, we allow you to
              achieve your fullest potential and make unique connections that
              can have positive impacts on your life
            </p>
            <p className="my-10 text-lg max-lg:text-base text-second">
              We are passionate about helping you explore the depths of your
              creativity and use it to craft something incredible
            </p>
          </div>
        </div>
        <div
          className="parallax-item h-[400px] max-lg:h-[300px]"
          style={{ justifyContent: "start" }}
        ></div>
        <div className="parallax-item py-24"></div>
        <div className="flex justify-center items-center py-4 gap-3 text-xs ml">
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
          <p>Report Abuse</p>
        </div>
      </section>
    </div>
  );
}
