import Animation from "../models/Animation.js";

const writableFields = [
  "name", "slug", "description", "level", "library", "trigger", "category",
  "difficulty", "tags", "code", "notes", "preview", "status",
];

const pickWritableFields = (body) =>
  Object.fromEntries(
    writableFields.filter((field) => Object.hasOwn(body, field)).map((field) => [field, body[field]]),
  );

export const getAnimations = async (req, res, next) => {
  try {
    const animations = await Animation.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: animations.length,
      data: animations,
    });
  } catch (error) {
    next(error);
  }
};

export const getAnimationBySlug = async (req, res, next) => {
  try {
    const animation = await Animation.findOne({
      slug: req.params.slug,
    });

    if (!animation) {
      res.status(404);
      throw new Error("Animation not found");
    }

    res.status(200).json({
      success: true,
      data: animation,
    });
  } catch (error) {
    next(error);
  }
};

export const createAnimation = async (req, res, next) => {
  try {
    const {
      name,
      slug,
      description,
      level,
      library,
      trigger,
      category,
      difficulty,
      tags,
      code,
      notes,
      preview,
      status,
    } = req.body;

    const existingAnimation = await Animation.findOne({ slug });

    if (existingAnimation) {
      res.status(409);

      throw new Error("An animation with this slug already exists");
    }

    const animation = await Animation.create({
      name,
      slug,
      description,
      level,
      library,
      trigger,
      category,
      difficulty,
      tags,
      code,
      notes,
      preview,
      status,
    });

    res.status(201).json({
      success: true,
      data: animation,
    });
  } catch (error) {
    next(error);
  }
};
export const updateAnimation = async (req, res, next) => {
  try {
    const animation = await Animation.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      pickWritableFields(req.body),
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!animation) {
      res.status(404);
      throw new Error("Animation not found");
    }

    res.status(200).json({
      success: true,
      data: animation,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleAnimationFavorite = async (req, res, next) => {
  try {
    const animation = await Animation.findOne({
      slug: req.params.slug,
    });

    if (!animation) {
      res.status(404);
      throw new Error("Animation not found");
    }

    animation.isFavorite = !animation.isFavorite;

    await animation.save();

    res.status(200).json({
      success: true,
      data: animation,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAnimation = async (req, res, next) => {
  try {
    const animation = await Animation.findOne({
      slug: req.params.slug,
    });

    if (!animation) {
      res.status(404);
      throw new Error("Animation not found");
    }

    await animation.deleteOne();

    res.status(200).json({
      success: true,
      message: "Animation deleted successfully",
      data: {
        id: animation._id,
        slug: animation.slug,
      },
    });
  } catch (error) {
    next(error);
  }
};
