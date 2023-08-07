"use strict";

const addNoScalingStroke = {
  name: "addNoScalingStroke",
  description: "Adds a stroke to the icon that is not scaled when the icon is resized",
  fn: (root, params) => {
    return {
      element: {
        enter: (node, parent) => {
          if (["path", "circle", "rect"].find((value) => value === node.name)) {
            node.attributes["vector-effect"] = "non-scaling-stroke";
          }
        },
      },
    };
  },
};

module.exports = addNoScalingStroke;
