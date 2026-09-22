import mongoose from "mongoose";

const animationSchema = new mongoose.Schema(
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
      enum: [1, 2, 3],
      default: 1,
    },

    library: {
      type: String,
      enum: ["css", "gsap", "framer-motion", "javascript"],
      required: true,
    },

    trigger: {
      type: String,
      enum: ["load", "hover", "click", "scroll", "cursor", "continuous"],
      required: true,
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
      whatItDoes: {
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

      performanceNotes: {
        type: String,
        default: "",
      },

      accessibilityNotes: {
        type: String,
        default: "",
      },
    },

    preview: {
      type: {
        type: String,
        enum: ["none", "html", "registered"],
        default: "none",
      },

      registryKey: {
        type: String,
        default: "",
      },

      html: {
        type: String,
        default: "",
      },

      css: {
        type: String,
        default: "",
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

const Animation = mongoose.model("Animation", animationSchema);

export default Animation;
