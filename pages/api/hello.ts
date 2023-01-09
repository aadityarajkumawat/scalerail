import { execSync } from "child_process";
import { readFileSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: any;
  out: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const fileContents = readFileSync("./data.json", { encoding: "utf-8" });
  const data = JSON.parse("{}");
  // const out = execSync("ls", { encoding: "utf-8" })
  //   .split("\n")
  //   .filter((n) => !!n);

  res.status(200).json({ data, out: "none" });
}
