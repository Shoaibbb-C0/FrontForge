import mongoose from "mongoose";

const componentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must use lowercase letters, numbers, and hyphens"],
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    level: {
      type: Number,
      enum: [1, 2],
      default: 1,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    style: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    industry: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    code: {
      jsx: {
        type: String,
        default: "",
      },

      css: {
        type: String,
        default: "",
      },

      javascript: {
        type: String,
        default: "",
      },
    },

    notes: {
      whatItIs: {
        type: String,
        default: "",
      },

      whyItWorks: {
        type: String,
        default: "",
      },

      whenToUse: {
        type: String,
        default: "",
      },

      whenNotToUse: {
        type: String,
        default: "",
      },

      responsiveBehavior: {
        type: String,
        default: "",
      },
    },
    preview: {
      // Keep legacy records without metadata distinguishable from explicit none.
      type: new mongoose.Schema({
        type: {
          type: String,
          enum: ["none", "html", "registered"],
          default: "none",
        },

        registryKey: {
          type: String,
          default: "",
          trim: true,
        },

        html: {
          type: String,
          default: "",
        },

        css: {
          type: String,
          default: "",
        },
      }, { _id: false }),
      default: undefined,
    },

    reference: {
      websiteName: {
        type: String,
        default: "",
      },

      url: {
        type: String,
        default: "",
        validate: {
          validator: (value) => !value || /^https?:\/\//i.test(value),
          message: "Reference URL must start with http:// or https://",
        },
      },
    },

    isFavorite: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["draft", "complete"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  },
);

const Component = mongoose.model("Component", componentSchema);

export default Component;
