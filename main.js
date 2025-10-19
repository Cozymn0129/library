class Book {
    constructor(title, author, page, status) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.page = page;
        this.read = status;
    }

    toggleReadStatus() {
        this.read = !this.read;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(title, author, page, status) {
        const newBook = new Book(title, author, page, status);
        this.books.push(newBook);
        this.displayLibrary();
    }

    removeBook(id) {
        const index = this.books.findIndex(book => book.id === id);
        if (index != -1) {
            this.books.splice(index, 1);
        }
        this.displayLibrary();
    }

    displayLibrary() {
        const libraryDiv = document.getElementById('library');
        libraryDiv.innerHTML = '<button id="newBookBtn">New Book</button>';

        this.books.forEach(book => {
            // create a card
            const card = document.createElement('div');
            card.classList.add('book-card');
            card.innerHTML = `
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Pages: ${book.page}</p>
                <p>Status: <span class="status">${book.read ? 'read' : 'not read yet'}</span></p>
                <button class="toggle-btn">Toggle Read Status</button>
                <button class="remove-btn">Remove</button>
            `;
            libraryDiv.appendChild(card);

            // remove button
            const removeBtn = card.querySelector('.remove-btn');
            removeBtn.addEventListener('click', () => {
                removeBook(book.id);
            })

            // toggle button
            const toggleBtn = card.querySelector('.toggle-btn');
            const statusSpan = card.querySelector('.status');
            toggleBtn.addEventListener('click', () => {
                book.toggleReadStatus();
                statusSpan.textContent = book.read;
            });
        });

        // new button
        const newBookBtn = document.getElementById('newBookBtn');
        newBookBtn.addEventListener('click', () => {
            bookForm.showModal(); // show the modal
        });
    }
}

const library = new Library();
library.displayLibrary();

const bookForm = document.getElementById('bookForm');
const addBookForm = document.getElementById('addBookForm');

addBookForm.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent default load and data processing

    const formData = new FormData(addBookForm);
    const title = formData.get('title');
    const author = formData.get('author');
    const page = formData.get('page');
    const status = formData.get('status') === 'on';

    library.addBook(title, author, page, status);
    bookForm.close();
    addBookForm.reset();
});
