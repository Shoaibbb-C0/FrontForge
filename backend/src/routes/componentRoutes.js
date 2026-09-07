import express from "express";

import {
  createComponent,
  getComponents,
  getComponentBySlug,
  updateComponent,
  toggleFavorite,
} from "../controllers/componentController.js";

const router = express.Router();

router.route("/").get(getComponents).post(createComponent);

router.patch("/:slug/favorite", toggleFavorite);

router.route("/:slug").get(getComponentBySlug).patch(updateComponent);

export default router;
