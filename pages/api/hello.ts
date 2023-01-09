import { exec } from "child_process";
import { readFileSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  heading: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const fileContents = readFileSync("./data.json", { encoding: "utf-8" });
  const data = JSON.parse(fileContents);
  const out = exec("ls", (err, stdout, stderr) => {
    console.log(stdout, stderr);
  });
  res.status(200).json(data);
}
