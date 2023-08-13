const treeContainer = document.getElementById('tree-container');
const exportButton = document.getElementById('export-button');
let treeData = {
    name: 'root',
    children: [
        {
            name: 'child1',
            children: [
                { name: 'child1-child1', data: "c1-c1 Hello" },
                { name: 'child1-child2', data: "c1-c2 JS" }
            ]
        },
        { name: 'child2', data: "c2 World" }
    ]
};

function renderTree(node, parent) {
    const tag = document.createElement('div');
    tag.classList.add('tag');
    
    const header = document.createElement('div');
    header.classList.add('tag-header');
    header.innerHTML = `
        <div>${node.name}</div>
        <div class="tag-actions">
            <button class="toggle-btn">v</button>
            <button class="add-child-btn">Add Child</button>
        </div>
    `;
    
    const content = document.createElement('div');
    content.classList.add('tag-content');
    if (node.data) {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = node.data;
        content.appendChild(input);
    }
    
    tag.appendChild(header);
    tag.appendChild(content);
    
    parent.appendChild(tag);
    
    if (node.children) {
        const childrenContainer = document.createElement('div');
        childrenContainer.classList.add('children-container');
        tag.appendChild(childrenContainer);
        node.children.forEach(childNode => {
            renderTree(childNode, childrenContainer);
        });
    }
    
    const toggleBtn = tag.querySelector('.toggle-btn');
    toggleBtn.addEventListener('click', () => {
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
        toggleBtn.textContent = content.style.display === 'none' ? '>' : 'v';
    });
    
    const addChildBtn = tag.querySelector('.add-child-btn');
    addChildBtn.addEventListener('click', () => {
        if (!node.children) {
            node.children = [];
        }
        node.children.push({ name: 'New Child', data: 'Data' });
        treeContainer.innerHTML = '';
        renderTree(treeData, treeContainer);
    });
    
    if (node.data) {
        const input = content.querySelector('input');
        input.addEventListener('input', () => {
            node.data = input.value;
        });
    }
}

renderTree(treeData, treeContainer);

exportButton.addEventListener('click', () => {
    const exportedData = JSON.stringify(treeData, ['name', 'children', 'data'], 2);
    console.log(exportedData);
});