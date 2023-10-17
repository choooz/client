require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  env: {
    es2021: true,
  },
  parser: "@typescript-eslint/parser",
  extends: ["plugin:@typescript-eslint/recommended", "plugin:import/typescript", "prettier"],
  plugins: ["sort-keys", "import", "jsx-a11y"],
  rules: {
    ...require("./plugins/import").rules,
    "prefer-template": 1,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/consistent-type-imports": 0,
    "no-unused-vars": 0,
    "@typescript-eslint/no-unused-vars": [
      2,
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          "{}": false,
        },
        extendDefaults: true,
      },
    ],
    "sort-keys": 0,
    "sort-keys/sort-keys-fix": [1, "asc", { caseSensitive: false, natural: false, minKeys: 6 }],
    curly: [1, "all"],
    eqeqeq: [1, "smart"],
  },
};
