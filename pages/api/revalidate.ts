import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  // if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
  //   return res.status(401).json({ message: 'Invalid token' })
  // }

  if (req.method === "POST") {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Content cannot be empty" });
    }

    if (Object.values(req.body).includes("")) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    //   return res.status(400).json({ error: "Content cannot be empty" });
    // }

    const { paths } = req.body;

    try {
      await res.revalidate("/admin/posts");
      return res.json({ revalidated: true });
      // await paths.map((path: string) => {
      //   res.revalidate(path);
      //   return res.json({ revalidated: true });
      // });
    } catch (err) {
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      return res.status(500).send("Error revalidating");
    }
  }
}
