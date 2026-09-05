import express from "express";

import {
  createComponent,
  getComponents,
  getComponentBySlug,
} from "../controllers/componentController.js";

const router = express.Router();

router
  .route("/")
  .get(getComponents)
  .post(createComponent);

router.get("/:slug", getComponentBySlug);

export default router;