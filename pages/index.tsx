import Link from "next/link";
import { useEffect } from "react";
import { Navbar } from "../components/navbar";
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
      <section>
        <div
          id="parallax"
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
              <h2 id="shadow" className="text-center text-7xl font-thin">
                ScaleRail
              </h2>
              <p className="py-2 text-lg">software | ops | action</p>
            </div>
          </div>
        </div>
        {/* <div className="parallel-item-ed" style={{ minHeight: "300px" }}></div> */}
        <div
          className="parallax-item abs"
          style={{ justifyContent: "start" }}
        ></div>
        <div className="parallax-item">
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
        </div>
        <div
          className="parallax-item abs"
          style={{ justifyContent: "start" }}
        ></div>
        <div className="parallax-item">
          <div className="max-w-3xl m-auto">
            <h1 className="text-pleasant-blue text-5xl leading-snug mb-10">
              Creativity is the intersection region of knowledge + imagination
            </h1>
            <p className="text-3xl text-pleasant-blue leading-snug">
              Our products do one thing: increase the area of this interaction
              region
            </p>
            <p className="my-10 text-lg">
              Our tools provide the bridge that lets you explore your creative
              potential and unlock new possibilities
            </p>
            <p className="my-10 text-lg">
              By combining intelligence, tools and technology, we allow you to
              achieve your fullest potential and make unique connections that
              can have positive impacts on your life
            </p>
            <p className="my-10 text-lg">
              We are passionate about helping you explore the depths of your
              creativity and use it to craft something incredible
            </p>
          </div>
        </div>
        <div
          className="parallax-item abs"
          style={{ justifyContent: "start" }}
        ></div>
        <div className="parallax-item py-24"></div>
        <div className="flex justify-center items-center bg-[#444] py-4 text-gray-200 gap-3 text-xs">
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
          <p>Report Abuse</p>
        </div>
      </section>
    </div>
  );
}
