import { config, fields, collection } from "@keystatic/core";

/**
 * Keystatic admin for on-page SEO.
 * Local: edit at `/keystatic` during `npm run dev`.
 * Production: set KEYSTATIC_GITHUB_REPO=infojobpool/premium-modular-studio
 * and complete GitHub auth (see https://keystatic.com/docs/github-mode).
 */
const githubRepo = process.env.KEYSTATIC_GITHUB_REPO as `${string}/${string}` | undefined;

export default config({
  storage: githubRepo ? { kind: "github", repo: githubRepo } : { kind: "local" },
  ui: {
    brand: { name: "Vivid In2wrio SEO" },
    navigation: {
      "Page SEO": ["pageSeo"],
    },
  },
  collections: {
    pageSeo: collection({
      label: "Page SEO",
      slugField: "slug",
      path: "content/seo/*",
      format: { data: "yaml" },
      schema: {
        slug: fields.slug({
          name: {
            label: "Slug",
            description: "URL-safe id (e.g. hyderabad-services). Do not change after publish.",
          },
        }),
        pagePath: fields.text({
          label: "Page path",
          description: "Public path, e.g. /hyderabad/services",
          validation: { isRequired: true },
        }),
        title: fields.text({
          label: "Title",
          description: "Browser tab + Google title (~50–60 characters)",
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: "Meta description",
          description: "Search snippet (~150–160 characters)",
          multiline: true,
          validation: { isRequired: true },
        }),
        focusKeyword: fields.text({
          label: "Focus keyword",
          description: "Target phrase for this page (for your notes; also added to keywords)",
        }),
        keywords: fields.array(fields.text({ label: "Keyword" }), {
          label: "Extra keywords",
          itemLabel: (props) => props.value || "Keyword",
        }),
        openGraphTitle: fields.text({ label: "Open Graph title override" }),
        openGraphDescription: fields.text({
          label: "Open Graph description override",
          multiline: true,
        }),
        indexInSearch: fields.checkbox({
          label: "Index in search engines",
          defaultValue: true,
        }),
        followLinks: fields.checkbox({
          label: "Follow links",
          defaultValue: true,
        }),
      },
    }),
  },
});
