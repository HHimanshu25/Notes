import { allnotesapi, noteupdate, notesave } from './noteAPI.js'
import { nav } from './noteAPI.js'

export function renderNotes(app) {
  app.innerHTML = `
<div class="note-container">

    <header>
        <div class="head">
            <span class="material-symbols-outlined menu-acces">menu</span>
            <div class="app_name">Notes</div>
            <div class="logo"></div>
        </div>
        <div class="search">
            <span class="material-symbols-outlined">search</span>
            <input type="search" placeholder="Search" class="search_bar" >
        </div>
    </header>
    <aside class="aside ">
        <div class="menu ">
            <div class="profile">
                <div class="profile-logo"></div>
                <div class="profile-detail">
                    <div class="user-name">Himanshu</div>
                    <button class="profile-manage">view profile</button>
                </div>
            </div>
            <ul class="note-list">
                <li><span class="material-symbols-outlined">notes</span>All Notes</li>
                <li><span class="material-symbols-outlined">work</span>Work</li>
                <li><span class="material-symbols-outlined">lightbulb</span>Idea</li>
                <li><span class="material-symbols-outlined">Favorite</span>Favorites</li>
                <li><span class="material-symbols-outlined">delete</span>Trash</li>
            </ul>
            <div class="setting"><span
                    class="material-symbols-outlined setting-icon">settings</span><span>Setting</span></div>
        </div>
    </aside>
    <nav class="nav">
        <!-- <div class="folder folder1 active-folder">Notes</div>
        <div class="folder folder2 " data-id="1">work</div> -->        
    </nav>
    <main>
        <div class="notes-list">

        

        </div>

    </main>
    <section class="live-note">
        <div class="current-note">
            <input type="text" placeholder=".title" class="current-note-title">            
            <div class="current-note-content" contenteditable="true" data-placeholder=".content"></div> 
        </div>
    </section>
    <footer>
        <button class="Add-note material-symbols-outlined">add</button>
    </footer>
    </div>`

  // let data

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



    try {
      if (addButton.classList.contains('cross')) { saveNote() }
    }
    catch { }

    finally {
      liveNotePanel.classList.toggle('open')
      addButton.classList.toggle('cross')
      current_title.value = '';
      current_content.textContent = '';
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
    // id = id[0]
    currentnote(id);
  })

  let currentNoteId = null;

  function currentnote(id) {
    currentNoteId = id;
    id = currentNoteId[0]

    if (!liveNotePanel.classList.contains('open')) {
      liveNotePanel.classList.toggle('open')
      addButton.classList.toggle('cross')
    }

    document.querySelector('.current-note-title').value = data[id].title;
    document.querySelector('.current-note-content').textContent = data[id].content;

  }




  let data;

  async function loadnote() {
    data = await allnotesapi();
    console.log(data);
    let count = 0;
    let html = '';
    data.forEach(note => {
      let date = note.date.split('T')[0]      
      html += `
         <div class="note" data-id="${count}${note._id}">
                <div class="note-title" >${note.title}</div>
                <p class="note-content">${note.content}</p>
                <div class="note-date">${date}</div>
            </div>`
      ++count;
    });
    document.querySelector('.notes-list').innerHTML = html;
    await copydata()
    console.log('i am call');
  }
  
  window.addEventListener('load', () => {
    loadnote()
  })
  
  function allnote() {    
    let html;
    data.forEach(note => {      
      html += `
         <div class="note" data-id="${count}${note._id}">
                <div class="note-title" >${note.title}</div>
                <p class="note-content">${note.content}</p>
                <div class="note-date">${note.date}</div>
            </div>`
      ++count;
    });
    document.querySelector('.notes-list').innerHTML = html;
    copydata()
    console.log('i am call');
  }

  let data2;
  async function copydata() {

    data2 = await JSON.parse(JSON.stringify(data))

    data2.forEach(note => {
      note.title = note.title.toLocaleLowerCase()
      note.content = note.content.toLocaleLowerCase()
    });

  }

  document.querySelector(".search_bar").addEventListener("input", () => {
    let ss = document.querySelector('.search_bar').value.toLocaleLowerCase();
    let tt = data2.filter(u => u.title.includes(ss))
    document.querySelector('.notes-list').innerHTML = ''
    tt.forEach(note => {
      document.querySelector('.notes-list').innerHTML += `
         <div class="note">
                <div class="note-title">${data[note.id].title}</div>
                <p class="note-content">${data[note.id].content}</p>
                <div class="note-date">${data[note.id].date}</div>
            </div>`

    });
  });



  function getfolder() {

    document.querySelector('.nav').innerHTML = ''
    nav.forEach(folder => {
      document.querySelector('.nav').innerHTML += `
          <div class="folder" data-id="${folder.id}">${folder.name}</div>`

    });
  }

  getfolder()


  function folder(name) {
    document.querySelector('.notes-list').innerHTML = ''
    data.forEach(note => {
      if (note.folder == `${name}`) {
        innerHTML += `
      <div class="note" data-id="${note.id}">
      <div class="note-title" >${note.title}</d
        document.querySelector('.notes-list').iv>
      <p class="note-content">${note.content}</p>
      <div class="note-date">${note.date}</div>
      </div>`
      }

    });
  }

  async function saveNote() {
    console.log('saveNote called');
    
    if (current_content.textContent.trim() === '') return;
    
    // 🔵 UPDATE EXISTING NOTE
    if (currentNoteId != null) {
      
      console.log(data);
      currentNoteId = currentNoteId.slice(1)
      
      let note = data.find(n => n._id == currentNoteId);
      console.log(note);

      if (!note) return;
      console.log('bhai note mil gya');
      // Check if content changed
      if (
        note.title !== current_title.value ||
        note.content !== current_content.textContent
      ) {
        note.title = current_title.value;
        note.content = current_content.textContent;                

        await noteupdate(note.title, note.content, currentNoteId)

        console.log('Note updated');
console.log(data);
         allnote()
      } else {
        console.log('No changes detected');
      }

    }
    // 🟢 CREATE NEW NOTE
    else {

      let newnote_title = current_title.value
      let newnote_content = current_content.textContent
      let tt = await notesave(newnote_title, newnote_content)
      console.log(tt);
      loadnote(); // re-render UI
    }

    console.log('yha tak to ye aagya hai ');
  }

  window.addEventListener('popstate', () => {
    alert('you going back')
  })
}