import Link from "next/link";
import { useEffect } from "react";
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
    const parallax = document.getElementById("parallax");
    let offset = window.pageYOffset;
    console.log({ offset });
    if (parallax && !offset) {
      console.log("exec");
      parallax.style.backgroundPositionY = "center";
    }

    // Parallax Effect for DIV 1
    window.addEventListener("scroll", function () {
      let offset = window.pageYOffset;
      if (parallax && !offset) {
        parallax.style.backgroundPositionY = "center";
        return;
      }

      if (parallax)
        parallax.style.backgroundPositionY = offset * 0.7 - 100 + "px";
    });
  }, []);

  return (
    <div>
      <div className="absolute w-full h-[80px]">
        <div className="w-full flex justify-between bg-transparent px-10 py-5">
          <div>
            <img src="/logo.png" alt="" style={{ width: "40px" }} />
          </div>
          <div>
            <ul className="flex items-center justify-center text-lg">
              <li>about |</li>
              <li>
                <Link href="/products">products |</Link>
              </li>
              <li>
                <Link href="/contact">contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
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
            style={{
              background:
                "linear-gradient(180deg, rgba(217, 217, 217, 0) 0%, rgba(20, 20, 20, 0.621455) 49.08%, rgba(217, 217, 217, 0) 100%)",
            }}
          >
            <div>
              <h2 id="shadow" className="text-center text-7xl font-thin">
                ScaleRail
              </h2>
              <p className="py-2 text-lg">software | ops | action</p>
            </div>
          </div>
        </div>
        <div className="parallax-item abs" style={{ justifyContent: "start" }}>
          <div className="absolute bg-black w-[500px] px-10 py-5 rounded-lg left-[3rem]">
            <p className="text-pleasant-blue">
              Imagination is the voice of daring. If there is anything Godlike
              about God it is that He dared to imagine everything - Henry Miller
            </p>
          </div>
        </div>
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
        <div className="parallax-item abs" style={{ justifyContent: "start" }}>
          <div className="absolute bg-black w-[500px] px-10 py-5 rounded-lg left-[3rem]">
            <p className="text-pleasant-blue">
              The future is something which everyone reaches at the rate of
              sixty minutes an hour, whatever he does, whoever he is | C.S.
              Lewis
            </p>
          </div>
        </div>
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
        <div className="parallax-item abs" style={{ justifyContent: "start" }}>
          <div className="absolute bg-black w-[500px] px-10 py-5 rounded-lg left-[3rem]">
            <p className="text-pleasant-blue">
              The true object of all human life is play. Earth is a task garden;
              heaven a playground | GK Chesterton
            </p>
          </div>
        </div>
        <div className="parallax-item py-24">
          <div className="max-w-3xl m-auto">
            <button className="border-2 px-4 py-1 rounded-full border-[#ffffff70] text-[#ffffff70]">
              Appreciate
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center bg-[#444] py-4 text-gray-200 gap-3 text-xs">
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
          <p>Report Abuse</p>
        </div>
      </section>
    </div>
  );
}
