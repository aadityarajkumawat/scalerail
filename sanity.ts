import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: "2xriwrt5",
  dataset: "production",
  useCdn: true,
});
