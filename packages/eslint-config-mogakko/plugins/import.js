module.exports = {
  rules: {
    "import/no-empty-named-blocks": 2,
    "import/newline-after-import": [2, { count: 1 }],
    "no-duplicate-imports": 1,
    "sort-imports": [
      1,
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        allowSeparatedGroups: true,
      },
    ],
    "import/no-duplicates": [2, { "prefer-inline": true }],
    "import/order": [
      2,
      {
        groups: ["builtin", "external", "internal", ["parent", "sibling"], "index"],
        pathGroups: [
          {
            pattern: "{react,next}",
            group: "builtin",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        alphabetize: {
          order: "asc",
          caseInsensitive: false,
        },
        "newlines-between": "always",
      },
    ],
    "import/no-anonymous-default-export": [
      1,
      {
        allowObject: true,
      },
    ],
  },
};
