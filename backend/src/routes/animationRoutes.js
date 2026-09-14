import express from "express";

import {
  createAnimation,
  deleteAnimation,
  getAnimations,
  getAnimationBySlug,
  toggleAnimationFavorite,
  updateAnimation,
} from "../controllers/animationController.js";

const router = express.Router();

router.route("/").get(getAnimations).post(createAnimation);

router.patch("/:slug/favorite", toggleAnimationFavorite);

router
  .route("/:slug")
  .get(getAnimationBySlug)
  .patch(updateAnimation)
  .delete(deleteAnimation);

export default router;
