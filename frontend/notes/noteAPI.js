const NOTE_API = "http://localhost:3000/note"
let user_id = localStorage.getItem('token')

export async function allnotesapi() {  
  console.log(user_id);
  let data = await fetch(`${NOTE_API}/allnotes/${user_id}`)  
  return await data.json();  
}

export async function noteupdate(title, content,id) {
  await fetch(`${NOTE_API}/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title,
      content
    })
  })
}

export async function notesave(title, content) {
  let user_id = localStorage.getItem('token')
  await fetch(`${NOTE_API}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title,
      content,
      user_id
    })

  })
}


export const nav = [
  { id: 1, name: 'Notes' },
  { id: 2, name: 'work' },
  { id: 3, name: 'Idea' },
  { id: 4, name: '+' }
]

