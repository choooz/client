const path = require("path");

/**
 *
 * @param {string} cat
 * @returns
 */
const catToCamel = (cat) => {
  return cat
    .split("-")
    .map((item) => {
      return item[0].toUpperCase() + item.slice(1);
    })
    .join("");
};
function defaultIndexTemplate(filePaths) {
  const exportEntries = filePaths.map((filePath) => {
    // console.log({filePath}, path.extname(filePath))
    const basename = path.basename(filePath, path.extname(filePath));
    const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename;
    const reg = new RegExp(`(\\w+\-\\w+|\\w+)(?=\/${basename})`);
    const catName = catToCamel(reg.exec(filePath)[0]);
    return `export { default as ${exportName}Icon } from './${basename}'`;
  });
  return exportEntries.join("\n");
}

module.exports = defaultIndexTemplate;
