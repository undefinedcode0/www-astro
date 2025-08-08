export default function rehypeAnimationDelay() {
  return (tree) => {
    let index = 1;
    const maxDelay = 1000;
    const increment = 50;
    
    function traverse(node) {
      if (node.type === 'element' && node.properties) {
        const delay = Math.min(maxDelay, index * increment);
        const existingStyle = node.properties.style || '';
        
        if (!existingStyle.includes('animation-delay')) {
          node.properties.style = `${existingStyle}animation-delay: ${delay}ms;`;
          index++;
        }
      }
      
      if (node.children) {
        node.children.forEach(traverse);
      }
    }
    
    traverse(tree);
    return tree;
  };
}
