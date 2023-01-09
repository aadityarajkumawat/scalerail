import { API_URL } from "../consts";

// export async function getServerSideProps() {
//   const res = await fetch(`${API_URL}/hello`);
//   const body = await res.json();
//   return { props: { data: body } };
// }

export default function Home(/**{ data }: any*/) {
  return <div>{JSON.stringify({}, null, 2)}</div>;
}
