import express from "express";

import {
  createComponent,
  getComponents,
  getComponentBySlug,
  updateComponent,
} from "../controllers/componentController.js";

const router = express.Router();

router
  .route("/")
  .get(getComponents)
  .post(createComponent);

router
  .route("/:slug")
  .get(getComponentBySlug)
  .patch(updateComponent);

export default router;