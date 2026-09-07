import express from "express";

import {
  createComponent,
  deleteComponent,
  getComponents,
  getComponentBySlug,
  toggleFavorite,
  updateComponent,
} from "../controllers/componentController.js";

const router = express.Router();

router
  .route("/")
  .get(getComponents)
  .post(createComponent);

router.patch("/:slug/favorite", toggleFavorite);

router
  .route("/:slug")
  .get(getComponentBySlug)
  .patch(updateComponent)
  .delete(deleteComponent);

export default router;