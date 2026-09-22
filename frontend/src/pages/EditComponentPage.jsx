import { useEffect, useState } from "react";
import previewRegistry from "../previews/previewRegistry";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

function EditComponentPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "";

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    level: 1,
    category: "Hero",
    difficulty: "beginner",
    tags: "",
    style: "",
    industry: "",
    jsx: "",
    css: "",
    javascript: "",
    previewType: "none",
    previewRegistryKey: "",
    previewHtml: "",
    previewCss: "",
    whatItIs: "",
    whyItWorks: "",
    whenToUse: "",
    whenNotToUse: "",
    responsiveBehavior: "",
    referenceWebsite: "",
    referenceUrl: "",
    status: "draft",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComponent = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/components/${slug}`
        );

        if (!response.ok) {
          throw new Error("Failed to load component");
        }

        const result = await response.json();
        const component = result.data;

        setFormData({
          name: component.name ?? "",
          slug: component.slug ?? "",
          description: component.description ?? "",
          level: component.level ?? 1,
          category: component.category ?? "Hero",
          difficulty: component.difficulty ?? "beginner",

          tags: component.tags?.join(", ") ?? "",
          style: component.style?.join(", ") ?? "",
          industry: component.industry?.join(", ") ?? "",

          jsx: component.code?.jsx ?? "",
          css: component.code?.css ?? "",
          javascript: component.code?.javascript ?? "",

          previewType: component.preview?.type ?? (
            Object.hasOwn(previewRegistry, component.slug) ? "registered" : "none"
          ),
          previewRegistryKey: component.preview?.registryKey ?? "",
          previewHtml: component.preview?.html ?? "",
          previewCss: component.preview?.css ?? "",

          whatItIs: component.notes?.whatItIs ?? "",
          whyItWorks: component.notes?.whyItWorks ?? "",
          whenToUse: component.notes?.whenToUse ?? "",
          whenNotToUse: component.notes?.whenNotToUse ?? "",
          responsiveBehavior:
            component.notes?.responsiveBehavior ?? "",

          referenceWebsite:
            component.reference?.websiteName ?? "",
          referenceUrl:
            component.reference?.url ?? "",

          status: component.status ?? "draft",
        });
      } catch (error) {
        console.error("Edit component fetch error:", error);

        setError(
          "FrontForge couldn't load this component."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchComponent();
  }, [API_URL, slug]);

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
        slug: formData.slug.trim().toLowerCase(),
        description: formData.description.trim(),
        level: Number(formData.level),
        category: formData.category,
        difficulty: formData.difficulty,

        tags: formData.tags
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        style: formData.style
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        industry: formData.industry
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        code: {
          jsx: formData.jsx,
          css: formData.css,
          javascript: formData.javascript,
        },

        preview: {
          type: formData.previewType,
          registryKey: formData.previewRegistryKey.trim(),
          html: formData.previewHtml,
          css: formData.previewCss,
        },

        notes: {
          whatItIs: formData.whatItIs,
          whyItWorks: formData.whyItWorks,
          whenToUse: formData.whenToUse,
          whenNotToUse: formData.whenNotToUse,
          responsiveBehavior: formData.responsiveBehavior,
        },

        reference: {
          websiteName: formData.referenceWebsite,
          url: formData.referenceUrl,
        },

        status: formData.status,
      };

      const response = await fetch(
        `${API_URL}/api/components/${slug}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to update component"
        );
      }

      navigate(`/components/${result.data.slug}`);
    } catch (error) {
      console.error("Update component error:", error);

      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-16 text-sm text-forge-muted">
        Loading component...
      </div>
    );
  }

  if (error && !formData.slug) {
    return (
      <div className="py-16 text-center">
        <h1 className="font-display text-3xl font-semibold">Component unavailable.</h1>
        <p className="mt-3 text-sm text-forge-muted">{error}</p>
      </div>
    );
  }

  return (
    <section>
      <header className="border-b border-forge-border pb-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-forge-accent">
          Library / Edit
        </span>

        <h1 className="mt-5 font-display text-[clamp(2.8rem,5vw,5rem)] font-semibold tracking-[-0.055em]">
          Edit component.
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-7 text-forge-muted">
          Update the component metadata, code, notes and reference information.
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
            required
          />

          <TextArea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <Select
              label="Level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              options={[
                { value: 1, label: "Level 1" },
                { value: 2, label: "Level 2" },
              ]}
            />

            <Select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={[
                "Navbar",
                "Hero",
                "Features",
                "Bento",
                "Portfolio",
                "Pricing",
                "Testimonials",
                "CTA",
                "Footer",
              ]}
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
          />

          <Field
            label="Styles"
            name="style"
            value={formData.style}
            onChange={handleChange}
          />

          <Field
            label="Industries"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
          />
        </FormSection>

        <FormSection title="Code">
          <TextArea
            label="React / JSX"
            name="jsx"
            value={formData.jsx}
            onChange={handleChange}
            rows={12}
          />

          <TextArea
            label="CSS"
            name="css"
            value={formData.css}
            onChange={handleChange}
            rows={8}
          />

          <TextArea
            label="JavaScript"
            name="javascript"
            value={formData.javascript}
            onChange={handleChange}
            rows={8}
          />
        </FormSection>

        <FormSection title="Preview">
          <Select
            label="Preview type"
            name="previewType"
            value={formData.previewType}
            onChange={handleChange}
            options={[
              { value: "none", label: "No preview" },
              { value: "html", label: "Automatic HTML / CSS" },
              { value: "registered", label: "Registered React preview" },
            ]}
          />

          {formData.previewType === "html" && (
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

          {formData.previewType === "registered" && (
            <Field
              label="Registry key"
              name="previewRegistryKey"
              value={formData.previewRegistryKey}
              onChange={handleChange}
              placeholder="editorial-split-hero"
            />
          )}
        </FormSection>

        <FormSection title="Learning notes">
          <TextArea
            label="What it is"
            name="whatItIs"
            value={formData.whatItIs}
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
            label="When not to use"
            name="whenNotToUse"
            value={formData.whenNotToUse}
            onChange={handleChange}
          />

          <TextArea
            label="Responsive behavior"
            name="responsiveBehavior"
            value={formData.responsiveBehavior}
            onChange={handleChange}
          />
        </FormSection>

        <FormSection title="Reference">
          <Field
            label="Website name"
            name="referenceWebsite"
            value={formData.referenceWebsite}
            onChange={handleChange}
          />

          <Field
            label="Reference URL"
            name="referenceUrl"
            value={formData.referenceUrl}
            onChange={handleChange}
          />
        </FormSection>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-forge-md bg-forge-accent px-5 py-3 text-sm font-medium text-white transition hover:bg-forge-accent-strong disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting
              ? "Saving..."
              : "Save changes"}
          </button>
        </div>
      </form>
    </section>
  );
}

function FormSection({ title, children }) {
  return (
    <section className="rounded-forge-lg border border-forge-border bg-forge-surface p-6">
      <h2 className="mb-6 font-display text-xl font-semibold tracking-[-0.035em]">
        {title}
      </h2>

      <div className="space-y-5">{children}</div>
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
        className="w-full rounded-forge-md border border-forge-border bg-forge-bg px-4 py-3 text-sm text-forge-text outline-none transition focus:border-forge-accent"
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

export default EditComponentPage;
