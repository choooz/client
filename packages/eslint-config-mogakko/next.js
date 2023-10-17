const reactConfig = require("./react.js");
module.exports = {
  ...reactConfig,
  extends: [
    ...reactConfig.extends,
    "plugin:@next/next/recommended",
    "plugin:@next/next/core-web-vitals",
  ],
  rules: {
    ...reactConfig.rules,
    "@next/next/no-html-link-for-pages": 0,
  },
};
