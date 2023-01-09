import { API_URL } from "../consts";

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/hello`);
  const data = await res.json();
  return { props: { data, p: process.env } };
}

export default function Home({ data, p }: any) {
  console.log(data, p);
  return <div>{JSON.stringify(data, null, 2)}</div>;
}
