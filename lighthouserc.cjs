module.exports = {
  ci: {
    collect: {
      staticDistDir: ".output/public",
      staticServerPort: 4174,
      numberOfRuns: 1,
      url: [
        "http://localhost:4174/",
        "http://localhost:4174/menu/",
        "http://localhost:4174/find-us/",
        "http://localhost:4174/story/",
        "http://localhost:4174/catering/"
      ],
      settings: {
        chromeFlags: "--headless=new --no-sandbox",
        onlyCategories: ["performance", "accessibility", "best-practices", "seo"]
      }
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.85 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.95 }]
      }
    },
    upload: {
      target: "filesystem",
      outputDir: ".lighthouseci"
    }
  }
};
