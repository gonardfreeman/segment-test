// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  writeKey: string | undefined;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    res.status(200).json({ writeKey: process.env.SEGMENT_KEY });
    return;
  }
  res.status(404);
}
