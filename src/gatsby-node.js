const crypto = require('crypto');
const jsYaml = require('js-yaml');
const _ = require(`lodash`);

async function onCreateNode({ node, boundActionCreators, loadNodeContent }) {
  const { createNode, createParentChildLink } = boundActionCreators

  if (node.internal.mediaType !== 'text/yaml') {
    return;
  }

  const obj = jsYaml.load(await loadNodeContent(node));
  const contentDigest = crypto
    .createHash(`md5`)
    .update(JSON.stringify(obj))
    .digest(`hex`);
  const yamlNode = {
    ...obj,
    id: obj.id ? obj.id : `${node.id} >>> YAML`,
    children: [],
    parent: node.id,
    internal: {
      contentDigest,
      // Note `node.dir` vs `node.name`
      type: _.upperFirst(_.camelCase(`${node.dir}Yaml`)),
    },
  };

  createNode(yamlNode)
  createParentChildLink({ parent: node, child: yamlNode })
}

exports.onCreateNode = onCreateNode;
