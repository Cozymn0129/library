const myLibrary = [];

function Book(title, author, page, status) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = status;
}

Book.prototype.toggleReadStatus = function () {
    this.read = !this.read;
}

function addBookToLibrary(title, author, page, status) {
    const newBook = new Book(title, author, page, status);
    myLibrary.push(newBook);
}

displayLibrary();

function displayLibrary() {
    const libraryDiv = document.getElementById('library');
    libraryDiv.innerHTML = '';

    myLibrary.forEach(book => {
        // create a card
        const card = document.createElement('div');
        card.classList.add('book-card');
        card.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.page}</p>
            <p>Status: <span class="status">${book.read}</span></p>
            <button class="toggle-btn">Toggle Read Status</button>
            <button class="remove-btn">Remove</button>
        `;
        libraryDiv.appendChild(card);

        // remove button
        const removeBtn = card.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => {
            removeBook(book.id);
        })

        const toggleBtn = card.querySelector('.toggle-btn');
        const statusSpan = card.querySelector('.status');
        toggleBtn.addEventListener('click', () => {
            book.toggleReadStatus();
            statusSpan.textContent = book.read;
        });
    });
}

const newBookBtn = document.getElementById('newBookBtn');
const bookForm = document.getElementById('bookForm');
const addBookForm = document.getElementById('addBookForm');

newBookBtn.addEventListener('click', () => {
    bookForm.showModal(); // show the modal
});

addBookForm.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent default load and data processing

    const formData = new FormData(addBookForm);
    const title = formData.get('title');
    const author = formData.get('author');
    const page = formData.get('page');
    const status = formData.get('status') ? 'read' : 'not read yet';

    addBookToLibrary(title, author, page, status);
    displayLibrary();
    bookForm.close();
    addBookForm.reset();
});

function removeBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    if (index != -1) {
        myLibrary.splice(index, 1);
    }
    displayLibrary();
}
