let notes = JSON.parse(localStorage.getItem('notes')) || []

let heading = document.querySelector(".notes input")
let para = document.querySelector('.textarea')

document.querySelector('.index').addEventListener('click',(e)=>{
    console.log(e.target.closest('.sm-notes').dataset.info)
    
})