export default function linkToComponent() {
  return (tree) => {
    if (
      !tree.children.some(
        (el) => el.value?.includes("import Link from '@/components/common/Link.astro'") && el.type === 'mdxjsEsm',
      )
    ) {
      tree.children.unshift({
        type: 'mdxjsEsm',
        value: "import Link from '@/components/common/Link.astro';",
        data: {
          estree: {
            type: 'Program',
            body: [
              {
                type: 'ImportDeclaration',
                specifiers: [
                  {
                    type: 'ImportDefaultSpecifier',
                    local: {
                      type: 'Identifier',
                      name: 'Link',
                    },
                  },
                ],
                source: {
                  type: 'Literal',
                  value: '@/components/common/Link.astro',
                  raw: "'@/components/common/Link.astro'",
                },
              },
            ],
            sourceType: 'module',
          },
        },
      });
    }
    for (const child of tree.children) {
      recursiveWalk(child);
    }
    return tree;
  };
}

function recursiveWalk(element) {
  if (element.type === 'element' && element.tagName === 'a') {
    const href = element.properties.href;
    const isExternal = !href.startsWith('/');

    element.type = 'mdxJsxFlowElement';
    element.name = 'Link';
    element.data = {
      _mdxExplicitJsx: true,
    };

    element.properties.type = 'mdxJsxAttribute';
    element.attributes = [
      {
        type: 'mdxJsxAttribute',
        name: 'href',
        value: href,
      },
    ];
    if (isExternal) {
      element.attributes.push({
        type: 'mdxJsxAttribute',
        name: 'external',
        value: null,
      });
    }
    element.properties = undefined;
  } else if (element.children) {
    for (const child of element.children) {
      recursiveWalk(child);
    }
  }
}
