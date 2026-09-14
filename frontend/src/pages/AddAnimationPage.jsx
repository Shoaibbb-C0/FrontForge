import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddAnimationPage() {
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "";

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",

    level: 1,
    library: "css",
    trigger: "hover",
    category: "microinteraction",
    difficulty: "beginner",

    tags: "",

    jsx: "",
    css: "",
    javascript: "",

    whatItDoes: "",
    whyItWorks: "",
    whenToUse: "",
    performanceNotes: "",
    accessibilityNotes: "",

    previewType: "none",
    previewRegistryKey: "",
    previewHtml: "",
    previewCss: "",

    status: "draft",
  });

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError("");

      const payload = {
        name: formData.name.trim(),

        slug: formData.slug
          .trim()
          .toLowerCase(),

        description:
          formData.description.trim(),

        level: Number(formData.level),

        library: formData.library,
        trigger: formData.trigger,
        category: formData.category,
        difficulty: formData.difficulty,

        tags: formData.tags
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        code: {
          jsx: formData.jsx,
          css: formData.css,
          javascript: formData.javascript,
        },

        notes: {
          whatItDoes: formData.whatItDoes,
          whyItWorks: formData.whyItWorks,
          whenToUse: formData.whenToUse,
          performanceNotes:
            formData.performanceNotes,
          accessibilityNotes:
            formData.accessibilityNotes,
        },

        preview: {
          type: formData.previewType,
          registryKey:
            formData.previewRegistryKey.trim(),
          html: formData.previewHtml,
          css: formData.previewCss,
        },

        status: formData.status,
      };

      const response = await fetch(
        `${API_URL}/api/animations`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to create animation"
        );
      }

      navigate(
        `/animations/${result.data.slug}`
      );
    } catch (error) {
      console.error(
        "Create animation error:",
        error
      );

      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <header className="border-b border-forge-border pb-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-forge-accent">
          Motion / Create
        </span>

        <h1 className="mt-5 font-display text-[clamp(2.8rem,5vw,5rem)] font-semibold tracking-[-0.055em]">
          Add animation.
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-7 text-forge-muted">
          Add a reusable motion pattern to your
          FrontForge animation library.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-4xl space-y-8 py-8"
      >
        {error && (
          <div className="rounded-forge-md border border-forge-danger/40 bg-forge-danger/10 p-4 text-sm text-forge-danger">
            {error}
          </div>
        )}

        <FormSection title="Basic information">
          <Field
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Field
            label="Slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="css-hover-lift"
            required
          />

          <TextArea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Select
              label="Level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              options={[
                {
                  value: 1,
                  label: "Level 1",
                },
                {
                  value: 2,
                  label: "Level 2",
                },
                {
                  value: 3,
                  label: "Level 3",
                },
              ]}
            />

            <Select
              label="Library"
              name="library"
              value={formData.library}
              onChange={handleChange}
              options={[
                {
                  value: "css",
                  label: "CSS",
                },
                {
                  value: "gsap",
                  label: "GSAP",
                },
                {
                  value: "framer-motion",
                  label: "Framer Motion",
                },
                {
                  value: "javascript",
                  label: "JavaScript",
                },
              ]}
            />

            <Select
              label="Trigger"
              name="trigger"
              value={formData.trigger}
              onChange={handleChange}
              options={[
                "load",
                "hover",
                "click",
                "scroll",
                "cursor",
                "continuous",
              ]}
            />

            <Field
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />

            <Select
              label="Difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              options={[
                "beginner",
                "intermediate",
                "advanced",
              ]}
            />
          </div>
        </FormSection>

        <FormSection title="Classification">
          <Field
            label="Tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="hover, card, microinteraction"
          />
        </FormSection>

        <FormSection title="Code">
          <TextArea
            label="React / JSX"
            name="jsx"
            value={formData.jsx}
            onChange={handleChange}
            rows={10}
          />

          <TextArea
            label="CSS"
            name="css"
            value={formData.css}
            onChange={handleChange}
            rows={10}
          />

          <TextArea
            label="JavaScript"
            name="javascript"
            value={formData.javascript}
            onChange={handleChange}
            rows={10}
          />
        </FormSection>

        <FormSection title="Preview">
          <Select
            label="Preview type"
            name="previewType"
            value={formData.previewType}
            onChange={handleChange}
            options={[
              {
                value: "none",
                label: "No preview",
              },
              {
                value: "html",
                label:
                  "Automatic HTML / CSS",
              },
              {
                value: "registered",
                label:
                  "Registered preview",
              },
            ]}
          />

          {formData.previewType ===
            "html" && (
            <>
              <TextArea
                label="Preview HTML"
                name="previewHtml"
                value={formData.previewHtml}
                onChange={handleChange}
                rows={12}
              />

              <TextArea
                label="Preview CSS"
                name="previewCss"
                value={formData.previewCss}
                onChange={handleChange}
                rows={10}
              />
            </>
          )}

          {formData.previewType ===
            "registered" && (
            <Field
              label="Registry key"
              name="previewRegistryKey"
              value={
                formData.previewRegistryKey
              }
              onChange={handleChange}
              placeholder="gsap-fade-up"
            />
          )}
        </FormSection>

        <FormSection title="Learning notes">
          <TextArea
            label="What it does"
            name="whatItDoes"
            value={formData.whatItDoes}
            onChange={handleChange}
          />

          <TextArea
            label="Why it works"
            name="whyItWorks"
            value={formData.whyItWorks}
            onChange={handleChange}
          />

          <TextArea
            label="When to use"
            name="whenToUse"
            value={formData.whenToUse}
            onChange={handleChange}
          />

          <TextArea
            label="Performance notes"
            name="performanceNotes"
            value={
              formData.performanceNotes
            }
            onChange={handleChange}
          />

          <TextArea
            label="Accessibility notes"
            name="accessibilityNotes"
            value={
              formData.accessibilityNotes
            }
            onChange={handleChange}
          />
        </FormSection>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-forge-md bg-forge-accent px-5 py-3 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting
              ? "Saving..."
              : "Add animation"}
          </button>
        </div>
      </form>
    </section>
  );
}

function FormSection({
  title,
  children,
}) {
  return (
    <section className="rounded-forge-lg border border-forge-border bg-forge-surface p-6">
      <h2 className="mb-6 font-display text-xl font-semibold tracking-[-0.035em]">
        {title}
      </h2>

      <div className="space-y-5">
        {children}
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  required = false,
  placeholder = "",
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-forge-muted">
        {label}
      </span>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-forge-md border border-forge-border bg-forge-bg px-4 py-3 text-sm text-forge-text outline-none transition placeholder:text-forge-subtle focus:border-forge-accent"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  value,
  onChange,
  required = false,
  rows = 5,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-forge-muted">
        {label}
      </span>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className="w-full resize-y rounded-forge-md border border-forge-border bg-forge-bg px-4 py-3 font-mono text-sm leading-6 text-forge-text outline-none transition focus:border-forge-accent"
      />
    </label>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-forge-muted">
        {label}
      </span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-forge-md border border-forge-border bg-forge-bg px-4 py-3 text-sm text-forge-text outline-none focus:border-forge-accent"
      >
        {options.map((option) => {
          const optionValue =
            typeof option === "object"
              ? option.value
              : option;

          const optionLabel =
            typeof option === "object"
              ? option.label
              : option;

          return (
            <option
              key={optionValue}
              value={optionValue}
            >
              {optionLabel}
            </option>
          );
        })}
      </select>
    </label>
  );
}

export default AddAnimationPage;