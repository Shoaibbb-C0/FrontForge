import express from "express";

import {
  getComponents,
  getComponentBySlug,
} from "../controllers/componentController.js";

const router = express.Router();

router.get("/", getComponents);
router.get("/:slug", getComponentBySlug);

export default router;