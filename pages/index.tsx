import { API_URL } from "../consts";

export async function getServerSideProps() {
  const res = await fetch(`${"https://scalerail.vercel.app"}/api/hello`);
  const data = await res.json();
  return { props: { data } };
}

export default function Home({ data }: any) {
  console.log(data);
  return <div>{JSON.stringify(data, null, 2)}</div>;
}
