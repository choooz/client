const defaultConfig = require("./default.config.cjs");

const addNoScalingStroke = require("../plugins/add-no-scaling-stroke.cjs");

module.exports = {
  ...defaultConfig,
  svgoConfig: {
    /**
     * @see https://github.com/svg/svgo
     */
    plugins: [
      { active: true, name: "removeUselessStrokeAndFill" },
      {
        active: true,
        name: "convertColors",
        params: {
          currentColor: true,
        },
      },
      addNoScalingStroke,
    ],
  },
};
