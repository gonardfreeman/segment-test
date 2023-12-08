// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  stage: string | undefined;
  hawks: string | undefined;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    res
      .status(200)
      .json({
        stage: process.env.STAGE,
        hawks: process.env.DMYTRO_SB_AND_HAWKS,
      });
    return;
  }
  res.status(404);
}
