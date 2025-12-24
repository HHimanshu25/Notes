let activeid = null
let heading = document.querySelector(".notes input")
let para = document.querySelector('.textarea')

document.querySelector('.index').addEventListener('click', (e) => {
    let smNote = e.target.closest('.sm-notes');
    if (smNote) {
        let id = smNote.dataset.info;
        id = id.split('box')[1]
        activeid = id;
        let item = JSON.parse(localStorage.getItem(`note${id}`))


        heading.value = item.heading
        para.textContent = item.para

        document.querySelectorAll('.sm-notes').forEach(n => n.classList.remove('active'));
        smNote.classList.add('active');

    }


});
function write() {
    if (activeid === null) return;

    let item = JSON.parse(localStorage.getItem(`note${activeid}`));
    if (!item) return;

    item.heading = heading.value;
    item.para = para.textContent;

    localStorage.setItem(`note${activeid}`, JSON.stringify(item));
    load();
}

document.querySelector('.note').addEventListener('input', write);


document.querySelector('.new-note-btn').addEventListener('click', () => {
    addnotes()
})
function addnotes() {
    let noteno = localStorage.getItem('noteno') || 0
    let date = new Date();
    let formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;


    let content = {
        heading: 'New notes',
        para: 'Write somethings',
        date: formattedDate

    }

    console.log(noteno)
    localStorage.setItem(`note${noteno}`, JSON.stringify(content))

    localStorage.setItem('noteno', ++noteno)
    activeid = noteno;
    heading.value = content.heading;
    para.textContent = '';
    load()
}
function load() {
    let len = parseInt(localStorage.getItem('noteno')) || 0;
    console.log(len - 1);
    document.querySelector('.index').innerHTML = ''
    for (let i = len - 1; i >= 0; i--) {
        let item = localStorage.getItem(`note${i}`);
        // let item = localStorage.removeItem(`note${i}`);
        if (item) {
            // Parse JSON string back into an object
            let note = JSON.parse(item);

            document.querySelector('.index').innerHTML += `
                <div class="sm-notes" data-info="box${i}">
                    <div class="nav-heading">${note.heading}</div>
                    <div class="nav-smco">${note.para}</div>
                    <div class="date">${note.date}</div>
                    <button class="delete-btn">&times;</button>
                </div>
            `;
        }
    }
}
document.querySelector('.index').addEventListener('click', (e) => {
    if (!e.target.classList.contains('delete-btn')) return;

    e.stopPropagation();

    let box = e.target.closest('.sm-notes');
    let id = box.dataset.info.replace('box', '');

    localStorage.removeItem(`note${id}`);

    if (activeid === id) {
        activeid = null;
        heading.value = '';
        para.textContent = '';
    }

    load();
});


load()

document.querySelector('.search input').addEventListener('input', (e) => {
    let value = e.target.value.toLowerCase();
    document.querySelectorAll('.sm-notes').forEach(note => {
        let title = note.querySelector('.nav-heading').textContent.toLowerCase();
        note.style.display = title.includes(value) ? 'block' : 'none';
    });
});
