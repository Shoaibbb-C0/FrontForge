import express from "express";

import {
  createAnimation,
  getAnimations,
  getAnimationBySlug,
  updateAnimation,
} from "../controllers/animationController.js";

const router = express.Router();

router.route("/").get(getAnimations).post(createAnimation);

router.route("/:slug").get(getAnimationBySlug).patch(updateAnimation);

export default router;
