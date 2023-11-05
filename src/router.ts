import { Router } from "express";
import { PrismaClient } from "@prisma/client";

import { isTrue } from "./utils/utils";

const prisma = new PrismaClient();
const router = Router();

router.get("/releases", async (req, res) => {
  const { artist, label, sessions } = req.query;

  const releases = await prisma.release.findMany({
    include: {
      artist: isTrue(artist as string),
      sessions: isTrue(sessions as string),
      label: isTrue(label as string),
    },
  });

  res.json(releases);
});

router.post("/releases", async (req, res) => {
  const {} = req;
});

export default router;
