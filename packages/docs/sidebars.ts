import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  docs: [
    {
      type: "doc",
      id: "getting-started",
      label: "🎬 Getting started",
    },
    {
      type: "category",
      label: "⚙️ API",
      link: {
        type: "generated-index",
        title: "⚙️ API",
        description: "⚙️ API description",
        keywords: ["api"],
      },
      items: [
        {
          type: "category",
          label: "toast",
          link: {
            type: "generated-index",
            title: "toast",
            description: "toast description",
            keywords: ["api-toast"],
          },
          items: ["api/add", "api/remove", "api/removeAll"],
        },
        "api/toaster",
      ],
    },
    {
      type: "category",
      label: "📖 Guides",
      link: {
        type: "generated-index",
        title: "📖 Guides",
        description: "📖 Guides description",
        keywords: ["guides"],
      },
      items: [
        "guides/enter-exit-animation",
        "guides/body-animation",
        "guides/custom-animation",
        "guides/custom-id",
        "guides/right-to-left",
        "guides/change-position",
        "guides/choose-type",
        "guides/remove-programmatically",
        "guides/accessibility",
        "guides/limit-visible-toasts",
        "guides/auto-hiding",
        "guides/custom-icon",
        "guides/custom-toast",
      ],
    },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
