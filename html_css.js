const path = require("path");

module.exports = function({
  selector = 'link[rel="stylesheet"][href]'
} = {}) {
  return function(vinyl) {
    let { cwd, references } = vinyl;

    return {
      selector : selector,
      handle : (elem, vinyl) => {
        let href = elem.attr("href");

        vinyl.input.reference(vinyl.path, href);

        elem.attr("href",
          path.join(
            path.dirname(href),
            path.basename(href, path.extname(href))+".css"
          )
        )
      }
    }
  }
}
