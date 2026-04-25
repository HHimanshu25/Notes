import { allnotesapi, noteupdate, notesave, getfolders, delenoteapi } from './noteAPI.js'
import { renderLogin } from '../auth/login.js'
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
    <aside class="aside">
        <div class="menu ">
            <div class="profile">
                <div class="profile-logo"></div>
                <div class="profile-detail">
                    <div class="user-name">Himanshu</div>
                    <button class="profile-manage">view profile</button>
                </div>
            </div>
            <div class="note-list">
            <ul class="note-list-folders">            
               
            </ul>
                <div>Favorites</div>
                <div>Recent delete</div>
                <div>account setting</div>
                <div>Edit profile</div>
                <div>Change password</div>
                <div>Delete account</div>
                <div>Logout</div>
                
               
                
            </div>
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
  // const logout = document.querySelector('.note-list').children[4]
  app.querySelector('.user-name').textContent = localStorage.getItem('user_name')

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


  // logout button

  // logout.addEventListener('click', () => {
  //   localStorage.removeItem('token')
  //   renderLogin(app)
  // })

  // Folder selection


  document.body.addEventListener('click', (e) => {
    const folderElement = e.target.closest('.folder')
    if (!folderElement) return

    document.querySelectorAll('.folder')
      .forEach(f => f.classList.remove('active-folder'))

    folderElement.classList.add('active-folder')
    folder(folderElement.textContent)
  })


  async function getfolder() {
    let count = 2;
    document.querySelector('.nav').innerHTML = ''
    let html = '<div class="folder" data-id="0">+</div>    <div class="folder" data-id="1">Notes</div>'

    let nav = await getfolders()
    if (!nav) {
      nav.forEach(folder => {
        html += `
        <div class="folder" data-id="${count}">${folder.title}</div>`
        ++count;
        console.log('me to abh bhi chel rha hu');
      });
    }
    document.querySelector('.nav').innerHTML = html
    document.querySelector('.nav').children[1].classList.add('active-folder')
  }

  getfolder()

  function folder(name) {
    let html = document.querySelector('.notes-list').innerHTML = ''
    data.forEach(note => {
      if (note.folder == `${name}`) {
        html += `
      <div class="note" data-id="${note.id}">      
      <div class="note-title" >${note.title}</div>
      <p class="note-content">${note.content}</p>
      <div class="note-date">${note.date}</div>
      </div>`
      }
      else if (name == 'Notes') {
        allnote()
      }
      else {
        html = 'Note not found'
      }

    });
  }


  // current note

  document.querySelector('.notes-list').addEventListener('click', (e) => {
    let note = e.target.closest('.note')
    if (!note) return;
    let id = note.dataset.id;

    if (e.target.classList.contains('delete-notes')) {
      e.stopPropagation();
      note.remove()
      deletnote(id)

    }
    else if (e.target.classList.contains('note')) {
      currentnote(id);

    }

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
    // console.log(data);   
    let count = 0;
    let html = '';
    if (data.done) {
      data = data.note
      console.log(data);
      data.forEach(note => {
        let date = note.date.split('T')[0]
        html += `
        <div class="note" data-id="${count}${note._id}">
        <button class="delete-notes">x</button>
        <div class="note-title" >${note.title}</div>
        <p class="note-content">${note.content}</p>
        <div class="note-date">${date}</div>
        </div>`
        ++count;
      });
    }
    else if (!data.done) {
      console.log(data.message);
      html = `<div class = "notfound">note not found</div>`
    }
    document.querySelector('.notes-list').innerHTML = html;

    await copydata()
    // console.log('i a fro backend data');
  }

  loadnote()


  function allnote() {
    let html;
    let count = 0;
    data.forEach(note => {
      html += `
         <div class="note" data-id="${count}${note._id}">
         <button class="delete-notes">x</button>
                <div class="note-title" >${note.title}</div>
                <p class="note-content">${note.content}</p>
                <div class="note-date">${note.date}</div>
            </div>`
      ++count;
    });
    document.querySelector('.notes-list').innerHTML = html;
    copydata()
    // console.log('mujh array ko kisi ne call hi nhi kiya');
  }

  let data2;
  async function copydata() {

    data2 = await JSON.parse(JSON.stringify(data))
    // console.log(data2);

    data2.forEach(note => {
      note.title = note.title.toLocaleLowerCase()
      note.content = note.content.toLocaleLowerCase()
    });
    // console.log(data2);

  }
  // console.log('kya hai');
  // setTimeout(() => {
  //   // console.log(data);
  //   console.log(data2);

  // }, 5000);

  document.querySelector(".search_bar").addEventListener("input", () => {
    let ss = document.querySelector('.search_bar').value.toLocaleLowerCase();
    let tt = data2.filter(u => u.title.includes(ss))
    // console.log(tt);
    document.querySelector('.notes-list').innerHTML = ''
    tt.forEach(note => {
      document.querySelector('.notes-list').innerHTML += `
         <div class="note">
                <div class="note-title">${note.title}</div>
                <p class="note-content">${note.content}</p>
                <div class="note-date">${note.date}</div>
            </div>`

    });
  });

  // note save and update code

  async function saveNote() {
    // console.log('saveNote called');

    if (current_content.textContent.trim() === '') return;

    // 🔵 UPDATE EXISTING NOTE
    if (currentNoteId != null) {

      // console.log(data);
      currentNoteId = currentNoteId.slice(1)

      let note = data.find(n => n._id == currentNoteId);
      // console.log(note);

      if (!note) return;
      // console.log('bhai note mil gya');
      // Check if content changed
      if (
        note.title !== current_title.value ||
        note.content !== current_content.textContent
      ) {
        note.title = current_title.value;
        note.content = current_content.textContent;

        await noteupdate(note.title, note.content, currentNoteId)

        // console.log('Note updated');
        console.log(data);
        allnote()
      } else {
        // console.log('No changes detected');
      }

    }
    // 🟢 CREATE NEW NOTE
    else {

      let newnote_title = current_title.value
      let newnote_content = current_content.textContent
      let tt = await notesave(newnote_title, newnote_content)
      // console.log(tt);
      loadnote(); // re-renderx UI
    }

    // console.log('yha tak to ye aagya hai ');
  }

  // app.addEventListener('click',(e)=>{
  //   if(e.target.classList.contains('delete-notes'))
  //     deletnote();
  // })


  async function deletnote(id) {
    console.log('bhai me deleter funtion or me call ho gyua hui');
    let noteid = id;
    noteid = noteid.slice(1)
    console.log(noteid);

    let note = data.find(n => n._id == noteid)

    if (!note) return;

    let res = await delenoteapi(noteid)
    noteid = id[0]
    if (res.done) {
      console.log(res.message);
    }

  }

}

