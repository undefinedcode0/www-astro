export default function rehypeAnimationDelay() {
  return (tree) => {
    let index = 1;
    tree.children.forEach((child) => {
      if (child.type === 'element') {
        const delay = Math.min(20 * 50, index * 50);
        if (child.properties) {
          child.properties.style = `${child.properties?.style || ''}animation-delay: ${delay}ms;`;
          index += 1;
        }
      }
    });
    return tree;
  };
}
