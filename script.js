// CodingDud Portfolio - Retro Desktop Interface
// Initialize system
window.addEventListener('load', function() {
    simulateLoading();
    updateClock();
    setInterval(updateClock, 1000);
    generateFolderItems();
    generateStartMenuItems();
});

function simulateLoading() {
    const loadingSteps = [
        'Loading system files...',
        'Initializing desktop...',
        'Loading portfolio data...',
        'Starting services...',
        'Ready!'
    ];
    
    let progress = 0;
    let step = 0;
    const loading = document.getElementById('loading');
    const progressFill = document.getElementById('progressFill');
    const loadingText = document.getElementById('loadingText');
    
    const interval = setInterval(() => {
        progress += 20;
        progressFill.style.width = progress + '%';
        
        if (step < loadingSteps.length) {
            loadingText.textContent = loadingSteps[step];
            step++;
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loading.classList.add('hidden');
            }, 500);
        }
    }, 800);
}

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    document.getElementById('clock').textContent = timeString;
}

function openWindow(windowType) {
    const window = document.getElementById(windowType + 'Window');
    if (window) {
        window.classList.add('active');
        if (windowType === 'terminal') {
            document.getElementById('terminalInput').focus();
        } else if (windowType === 'snake') {
            initSnake();
        } else if (windowType === 'tetris') {
            initTetris();
        }
    }
}

function closeWindow(windowType) {
    const window = document.getElementById(windowType + 'Window');
    if (window) {
        window.classList.remove('active');
        if (windowType === 'snake') {
            snakeRunning = false;
        } else if (windowType === 'tetris') {
            tetrisRunning = false;
        }
    }
}

function openProject(url) {
    window.open(url, '_blank');
}

function handleTerminalInput(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('terminalInput');
        const output = document.getElementById('terminalOutput');
        const command = input.value.trim().toLowerCase();
        
        output.textContent += 'C:\\Portfolio>' + input.value + '\n';
        
        switch(command) {
            case 'help':
                output.textContent += `Available commands:
- help: Show this help message
- projects: List all projects
- portfolio: Open portfolio site
- webgen: Open WebGen tool
- about: Show about information
- clear: Clear terminal
- exit: Close terminal

`;
                break;
            case 'projects':
                output.textContent += `My Projects:
${getProjectsList()}
`;
                break;
            case 'portfolio':
                output.textContent += 'Opening portfolio site...\n';
                setTimeout(() => openProject('https://codingdud.github.io/portfolio/'), 1000);
                break;
            case 'webgen':
                output.textContent += 'Opening WebGen tool...\n';
                setTimeout(() => openProject('https://webgen-seven.vercel.app/'), 1000);
                break;
            case 'about':
                output.textContent += `CodingDud Portfolio System
Version 1.0 Retro Edition
Developer: CodingDud
A nostalgic interface for modern projects.

`;
                break;
            case 'clear':
                output.textContent = 'CodingDud Portfolio Terminal v1.0\nCopyright (C) 2024 CodingDud. All rights reserved.\n\nType \'help\' for available commands.\n\n';
                break;
            case 'exit':
                closeWindow('terminal');
                break;
            default:
                output.textContent += `'${input.value}' is not recognized as an internal command.
Type 'help' for available commands.

`;
        }
        
        input.value = '';
        output.scrollTop = output.scrollHeight;
    }
}

function toggleStartMenu() {
    const startMenu = document.getElementById('startMenu');
    const startButton = document.getElementById('startButton');
    
    if (startMenu.classList.contains('active')) {
        startMenu.classList.remove('active');
        startButton.classList.remove('active');
    } else {
        startMenu.classList.add('active');
        startButton.classList.add('active');
    }
}

function closeStartMenu() {
    const startMenu = document.getElementById('startMenu');
    const startButton = document.getElementById('startButton');
    startMenu.classList.remove('active');
    startButton.classList.remove('active');
}

function showHelp() {
    alert(`CodingDud Portfolio - Help

Desktop Icons:
• Double-click icons to open applications
• Drag windows to move them around

Terminal Commands:
• help - Show available commands
• projects - List all projects
• portfolio - Open portfolio site
• webgen - Open WebGen tool
• clear - Clear terminal
• exit - Close terminal

Start Menu:
• Click Start button to access all applications
• Quick access to projects and tools

Navigation:
• Use desktop icons or Start menu
• Terminal provides command-line interface
• All projects open in embedded browser`);
}

function refreshDesktop() {
    // Close all windows
    const windows = document.querySelectorAll('.window');
    windows.forEach(window => {
        window.classList.remove('active');
    });
    
    // Clear terminal
    const terminalOutput = document.getElementById('terminalOutput');
    if (terminalOutput) {
        terminalOutput.textContent = `CodingDud Portfolio Terminal v1.0
Copyright (C) 2024 CodingDud. All rights reserved.

Type 'help' for available commands.

`;
    }
    
    // Show refresh notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #c0c0c0;
        border: 2px outset #c0c0c0;
        padding: 10px;
        font-size: 11px;
        z-index: 9999;
        box-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    `;
    notification.textContent = 'Desktop refreshed!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Close start menu when clicking outside
document.addEventListener('click', function(e) {
    const startMenu = document.getElementById('startMenu');
    const startButton = document.getElementById('startButton');
    
    if (!startMenu.contains(e.target) && !startButton.contains(e.target)) {
        closeStartMenu();
    }
});

// Make windows draggable
let isDragging = false;
let currentWindow = null;
let startX, startY, startLeft, startTop;

document.addEventListener('mousedown', function(e) {
    const header = e.target.closest('.window-header');
    if (header && !e.target.classList.contains('window-button')) {
        isDragging = true;
        currentWindow = header.parentElement;
        startX = e.clientX;
        startY = e.clientY;
        startLeft = currentWindow.offsetLeft;
        startTop = currentWindow.offsetTop;
        currentWindow.style.zIndex = 1001;
    }
});

document.addEventListener('mousemove', function(e) {
    if (isDragging && currentWindow) {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        currentWindow.style.left = (startLeft + deltaX) + 'px';
        currentWindow.style.top = (startTop + deltaY) + 'px';
    }
});

document.addEventListener('mouseup', function() {
    isDragging = false;
    if (currentWindow) {
        currentWindow.style.zIndex = 1000;
        currentWindow = null;
    }
});