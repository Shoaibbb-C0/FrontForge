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

export const createComponent = async (req, res, next) => {
  try {
    const {
      name,
      slug,
      description,
      level,
      category,
      difficulty,
      tags,
      style,
      industry,
      code,
      notes,
      reference,
      status,
    } = req.body;

    const existingComponent = await Component.findOne({ slug });

    if (existingComponent) {
      res.status(409);
      throw new Error("A component with this slug already exists");
    }

    const component = await Component.create({
      name,
      slug,
      description,
      level,
      category,
      difficulty,
      tags,
      style,
      industry,
      code,
      notes,
      reference,
      status,
    });

    res.status(201).json({
      success: true,
      data: component,
    });
  } catch (error) {
    next(error);
  }
};

export const updateComponent = async (req, res, next) => {
  try {
    const component = await Component.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

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
export const toggleFavorite = async (req, res, next) => {
  try {
    const component = await Component.findOne({
      slug: req.params.slug,
    });

    if (!component) {
      res.status(404);
      throw new Error("Component not found");
    }

    component.isFavorite = !component.isFavorite;

    await component.save();

    res.status(200).json({
      success: true,
      data: component,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComponent = async (req, res, next) => {
  try {
    const component = await Component.findOne({
      slug: req.params.slug,
    });

    if (!component) {
      res.status(404);
      throw new Error("Component not found");
    }

    await component.deleteOne();

    res.status(200).json({
      success: true,
      message: "Component deleted successfully",
      data: {
        id: component._id,
        slug: component.slug,
      },
    });
  } catch (error) {
    next(error);
  }
};