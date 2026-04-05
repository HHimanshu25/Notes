const asideMenu = document.querySelector('.aside')
const addButton = document.querySelector('.Add-note')
const liveNotePanel = document.querySelector('.live-note')
const current_title = document.querySelector('.current-note-title')
const current_content = document.querySelector('.current-note-content')

// Toggle aside menu
document.querySelector('.menu-acces').addEventListener('click', () => {
    asideMenu.classList.toggle('menu-open')
    addButton.classList.toggle('cross')
})

// Handle add button click (single handler)
addButton.addEventListener('click', () => {
    // Close aside if open
    if (asideMenu.classList.contains('menu-open')) {
        asideMenu.classList.remove('menu-open')
        addButton.classList.toggle('cross')
        return;        
    }

    // Toggle note panel
    
    
    
    try{
        if(addButton.classList.contains('cross'))
        {saveNote()} 
    }
    catch{}

    finally{        
        liveNotePanel.classList.toggle('open')                
        addButton.classList.toggle('cross')
        current_title.value = '';
        current_content.textContent ='';
    }

})

// Folder selection
document.body.addEventListener('click', (e) => {
    const folderElement = e.target.closest('.folder')
    if (!folderElement) return

    document.querySelectorAll('.folder')
        .forEach(f => f.classList.remove('active-folder'))

    folderElement.classList.add('active-folder')
    folder(folderElement.textContent)
})

document.querySelector('.notes-list').addEventListener('click', (e) => {

    let Note = e.target.closest('.note')
    if (!Note) return;

    let id = Note.dataset.id;    
    
    currentnote(id);
})