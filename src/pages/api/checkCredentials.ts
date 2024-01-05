// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    res.status(200).json({
      result:
        process.env.USER_NAME === req.query.user &&
        process.env.PASSWORD === req.query.password,
    });
    return;
  }
  res.status(200).json({
    result: false,
  });
}
