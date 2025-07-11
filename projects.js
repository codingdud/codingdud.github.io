// Projects Configuration
const projects = [
    {
        name: "Portfolio Site",
        url: "https://codingdud.github.io/portfolio/",
        icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Crect fill='%23000080' width='32' height='32'/%3E%3Crect fill='%23ffffff' x='2' y='2' width='28' height='28'/%3E%3Cpath fill='%23000080' d='M4 4v24h24V4H4zm20 20H8V8h16v16z'/%3E%3C/svg%3E",
        smallIcon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Crect fill='%23000080' width='16' height='16'/%3E%3Crect fill='%23ffffff' x='1' y='1' width='14' height='14'/%3E%3Ctext x='8' y='10' text-anchor='middle' fill='%23000080' font-size='8'%3EP%3C/text%3E%3C/svg%3E"
    },
    {
        name: "WebGen Tool",
        url: "https://webgen-seven.vercel.app/",
        icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Crect fill='%23008000' width='32' height='32'/%3E%3Crect fill='%23ffffff' x='2' y='2' width='28' height='28'/%3E%3Cpath fill='%23008000' d='M4 4v24h24V4H4zm20 20H8V8h16v16z'/%3E%3Ctext x='16' y='18' text-anchor='middle' fill='%23008000' font-size='8' font-family='Arial'%3EWG%3C/text%3E%3C/svg%3E",
        smallIcon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Crect fill='%23008000' width='16' height='16'/%3E%3Crect fill='%23ffffff' x='1' y='1' width='14' height='14'/%3E%3Ctext x='8' y='10' text-anchor='middle' fill='%23008000' font-size='6'%3EWG%3C/text%3E%3C/svg%3E"
    }
];

// Generate project items for folder window
function generateFolderItems() {
    const folderContent = document.querySelector('.folder-content');
    folderContent.innerHTML = '';
    
    projects.forEach(project => {
        const item = document.createElement('div');
        item.className = 'folder-item';
        item.onclick = () => openProject(project.url);
        item.innerHTML = `
            <img src="${project.icon}" alt="${project.name}">
            <span>${project.name}</span>
        `;
        folderContent.appendChild(item);
    });
    
    // Add "More Projects" placeholder
    const moreItem = document.createElement('div');
    moreItem.className = 'folder-item';
    moreItem.onclick = () => alert('More projects coming soon!');
    moreItem.innerHTML = `
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Crect fill='%23ffff00' width='32' height='32'/%3E%3Cpath fill='%23000000' d='M16 4l12 24H4L16 4z'/%3E%3Ctext x='16' y='22' text-anchor='middle' fill='%23000000' font-size='16' font-family='Arial'%3E!%3C/text%3E%3C/svg%3E" alt="Coming Soon">
        <span>More Projects</span>
    `;
    folderContent.appendChild(moreItem);
}

// Generate start menu items
function generateStartMenuItems() {
    // No longer adding projects to start menu
}

// Update terminal projects list
function getProjectsList() {
    return projects.map((project, index) => 
        `${index + 1}. ${project.name} - ${project.url}`
    ).join('\n') + '\n3. More projects coming soon...\n';
}