const NOTE_API   = "http://localhost:3000/note"
const FOLDER_API = "http://localhost:3000/folder"

export async function allnotesapi() {  
  let token = localStorage.getItem('toke')      
  let user_id = localStorage.getItem('user_id')      
  let data = await fetch(`${NOTE_API}/allnotes/${user_id}`,
    {
      method:"GET",
      "Authorization": `Bearer ${token}`
    }
  )  
// console.log('data is come',data);
  return data.json();  
}

export async function noteupdate(title, content,id) {
  let data = await fetch(`${NOTE_API}/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ 
      title,
      content
    })
  })
  return data.json()
}

export async function notesave(title, content) {
  let token = localStorage.getItem('toke')      
  let user_id = localStorage.getItem('user_id')      
   let data = await fetch(`${NOTE_API}/notes`, {    
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },    
    body: JSON.stringify({
      title,
      content,
      user_id
    })
  })
  let response = await data.json()
  if(response.message){
    console.log(response.error);
  }
  else{
    console.log(response);
  }
  
}

export async function newfolder(name) {
  let title = name;
  let res = await fetch(`${FOLDER_API}/save`,{
    method:"POST",
    headers:{
      "Content-Type": "application/json"
    },
    body:JSON.stringify({
      title
    })
  })
  let data = await res.json()
  console.log(data);
}


export async function getfolders() {
  let res = await fetch(`${FOLDER_API}/folders`)
  return await res.json()
}

