import Component from "../models/Component.js";

export const getComponents = async (req, res, next) => {
  try {
    const components = await Component.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: components.length,
      data: components,
    });
  } catch (error) {
    next(error);
  }
};

export const getComponentBySlug = async (req, res, next) => {
  try {
    const component = await Component.findOne({
      slug: req.params.slug,
    });

    if (!component) {
      res.status(404);
      throw new Error("Component not found");
    }

    res.status(200).json({
      success: true,
      data: component,
    });
  } catch (error) {
    next(error);
  }
};