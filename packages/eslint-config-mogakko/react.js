const base = require("./index.js");

module.exports = {
  ...base,
  globals: {
    React: "readonly",
  },
  extends: [
    ...base.extends,
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  rules: {
    ...base.rules,
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0,
    "react/self-closing-comp": [
      1,
      {
        component: true,
        html: true,
      },
    ],
    "react/display-name": 0,
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
    "react/jsx-curly-brace-presence": [
      "warn",
      { props: "never", children: "ignore", propElementValues: "always" },
    ],
    "jsx-a11y/aria-props": 1,
    "jsx-a11y/aria-proptypes": 1,
    "jsx-a11y/aria-unsupported-elements": 1,
    "jsx-a11y/role-has-required-aria-props": 1,
    "jsx-a11y/role-supports-aria-props": 1,
  },
  settings: {
    ...base.settings,
    react: {
      version: "detect",
    },
  },
};
