const data = [
  {
    "id": 0,
    "title": "Meeting Notes",
    "content": "Discuss project timeline, assign tasks, and finalize UI design decisions. Discuss project timeline, assign tasks, and finalize UI design decisions.",
    "date": "01/04/26"
  },
  {
    "id": 1,
    "title": "Grocery List",
    "content": "Milk, bread, eggs, fruits, and snacks for the week.",
    "date": "02/04/26",
    "folder": "work"
  },
  {
    "id": 2,
    "title": "Workout Plan",
    "content": "Morning run, push-ups, and stretching exercises for 30 minutes.",
    "date": "03/04/26",
    "folder": "work"
  },
  {
    "id": 3,
    "title": "Startup Idea",
    "content": "Build a smart note-taking app with AI suggestions and reminders.",
    "date": "04/04/26",
    "folder": "work"
  },
  {
    "id": 4,
    "title": "Exam Preparation",
    "content": "Revise software engineering topics and practice previous papers.",
    "date": "05/04/26"
  },
  {
    "id": 5,
    "title": "Daily Goals",
    "content": "Complete coding tasks, read 10 pages, and exercise.",
    "date": "06/04/26"
  },
  {
    "id": 6,
    "title": "Travel Plan",
    "content": "Visit Jaipur, explore forts, and try local food.",
    "date": "07/04/26"
  },
  {
    "id": 7,
    "title": "Book Summary",
    "content": "Learned about discipline, habits, and long-term thinking.",
    "date": "08/04/26"
  },
  {
    "id": 8,
    "title": "Project Tasks",
    "content": "Fix bugs, improve UI responsiveness, and deploy backend.",
    "date": "09/04/26"
  },
  {
    "id": 9,
    "title": "Ideas",
    "content": "Create a YouTube channel about coding and tech tutorials.",
    "date": "10/04/26"
  },
  {
    "id": 10,
    "title": "Shopping List",
    "content": "Buy shoes, t-shirt, and a backpack for college.",
    "date": "11/04/26"
  },
  {
    "id": 11,
    "title": "Reminder",
    "content": "Call friend at 7 PM and discuss upcoming plans.",
    "date": "12/04/26"
  },
  {
    "id": 12,
    "title": "Coding Practice",
    "content": "Solve 3 problems on arrays and objects in JavaScript.",
    "date": "13/04/26"
  },
  {
    "id": 13,
    "title": "Design Ideas",
    "content": "Try neumorphism style for cards and smooth animations.",
    "date": "14/04/26"
  },
  {
    "id": 14,
    "title": "Motivation",
    "content": "Stay consistent, focus on growth, and avoid distractions.",
    "date": "15/04/26"
  },
  {
    "id": 15,
    "title": "Backend Tasks",
    "content": "Implement authentication and secure API endpoints.",
    "date": "16/04/26"
  },
  {
    "id": 16,
    "title": "UI Improvements",
    "content": "Add animations, improve spacing, and refine color scheme.",
    "date": "17/04/26"
  },
  {
    "id": 17,
    "title": "Learning Plan",
    "content": "Study JavaScript deeply and practice daily coding.",
    "date": "18/04/26"
  },
  {
    "id": 18,
    "title": "Business Idea",
    "content": "Create a SaaS product for students to manage notes.",
    "date": "19/04/26"
  },
  {
    "id": 19,
    "title": "Reflection",
    "content": "Today I learned about UI bugs and how to fix them properly.",
    "date": "20/04/26"
  }
]
function allnotes() {

  document.querySelector('.notes-list').innerHTML = ''
  data.forEach(note => {
    document.querySelector('.notes-list').innerHTML += `
         <div class="note" data-id="${note.id}">
                <div class="note-title" >${note.title}</div>
                <p class="note-content">${note.content}</p>
                <div class="note-date">${note.date}</div>
            </div>`

  });
}
allnotes()


let data2 = JSON.parse(JSON.stringify(data))

data2.forEach(note => {
  note.title = note.title.toLocaleLowerCase()
  note.content = note.content.toLocaleLowerCase()
});
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

let nav = [
  { id: 1, name: 'Notes' },
  { id: 2, name: 'work' },
  { id: 3, name: 'Idea' },
  { id: 4, name: '+' }
]



function getfolder() {

  document.querySelector('.nav').innerHTML = ''
  nav.forEach(folder => {
    document.querySelector('.nav').innerHTML += `
          <div class="folder" data-id="${folder.id}">${folder.name}</div>`

  });
}

getfolder()

let currentNoteId = null;

function currentnote(id) {
  currentNoteId = id;

  if (!(liveNotePanel.classList.contains('open'))) {
    liveNotePanel.classList.toggle('open')
    addButton.classList.toggle('cross')
  }

  document.querySelector('.current-note-title').value = data[id].title;
  document.querySelector('.current-note-content').textContent = data[id].content;

}

function folder(name) {
  document.querySelector('.notes-list').innerHTML = ''
  data.forEach(note => {
    if (note.folder == `${name}`) {
      document.querySelector('.notes-list').innerHTML += `
      <div class="note" data-id="${note.id}">
      <div class="note-title" >${note.title}</div>
      <p class="note-content">${note.content}</p>
      <div class="note-date">${note.date}</div>
      </div>`
    }

  });
}

function saveNote() {
  console.log('saveNote called');

  if (current_content.textContent.trim() === '') return;

  // 🔵 UPDATE EXISTING NOTE
  if (currentNoteId != null) {


    let note = data.find(n => n.id == currentNoteId);

    if (!note) return;

    // Check if content changed
    if (
      note.title !== current_title.value ||
      note.content !== current_content.textContent
    ) {
      note.title = current_title.value;
      note.content = current_content.textContent;
      note.date = new Date().toLocaleDateString();

      console.log('Note updated');
    } else {
      console.log('No changes detected');
    }

  }
  // 🟢 CREATE NEW NOTE
  else {

    let newnote = {
      id: Date.now(), // better than data.length
      title: current_title.value || '',
      content: current_content.textContent,
      date: new Date().toLocaleDateString()
    };

    data.push(newnote);
    console.log('New note created');
  }

  allnotes(); // re-render UI
}