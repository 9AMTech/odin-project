const add_button = document.querySelector('.add-books');
const add_form_section = document.querySelector('.add-form-section')
const add_form = document.querySelector('.add-form-section form');
const submit = document.querySelector('.submit');
const change_status = document.querySelector('.change-status');
const change_rating = document.querySelector('.change-rating');
const remove = document.querySelector('.delete');
const books = document.querySelector('.books');
let library = [];
let currentID = 0;


function Book(id, name, author, pages, status, rating) {
    this.id = id
    this.name = name
    this.author = author
    this.pages = pages
    this.status = status
    this.rating = rating
}

Book.prototype.change_status = (status) => {
    switch (status) {
        case 'Read':
            return 'Unread';
            break;
        case 'Unread':
            return 'Read';
            break;
        case 'No Response':
            return 'Read'
            break;
    }
}

Book.prototype.change_rating = (rating) => {
    if (rating === 5) {
        return rating = 1;
    }
    else {
        return rating + 1;
    }
}

// I noticed I was retyping the same concept, so I just made this giant function
// This will check if the object is empty, if so, it allows the user to 
// Pass in this data, the object key to check, the new value if it fails
// the failure message and the pass message to be updated on the page

const empty_check = (object_key, new_value, message_fail, message_pass) => {
    if (object_key === undefined) {
        object_key = new_value;
        return message_fail;
    }
    else {
        return message_pass;
    }
}


// Pull the data from the form and into an object, then put it in an array
add_form.addEventListener('submit', (e) => {
    e.preventDefault();
    let form = e.target;
    let fd = new FormData(form);


    const bookItem = new Book;
    bookItem['id'] = currentID;
    currentID++;

    for (key of fd.keys()) {
        bookItem[key] = fd.get(key);
        // console.log(key, fd.get(key));
    }

    // Creating Elements Within the DOM
    // Book Section
    const box = document.createElement('section');
    box.className += 'book center-align';
    box.dataset.id = bookItem['id'];


    // Book Title
    const title = document.createElement('h3');
    title.className += 'book-title';
    title.textContent += bookItem.title;


    // Book Author
    const author = document.createElement('h4');
    author.className += 'book-author';
    author.textContent += bookItem.author;


    // Book Pages
    const pages = document.createElement('p');
    pages.className += 'book-pages';
    if (bookItem[pages] === undefined) {
        bookItem.pages = '?';
        pages.textContent += `Pages : ${bookItem.pages}`;
    }
    else {
        pages.textContent += `Pages : ${bookItem.pages}`;
    }

    // pages.textContent = empty_check(
    //     bookItem[pages],
    //     '?',
    //     `Pages : ${bookItem.pages}`,
    //     `Pages : ${bookItem.pages}`
    // )



    // Book Status
    const status = document.createElement('p');
    status.className += 'book-status';
    if (bookItem[status] === undefined) {
        bookItem.status = 'No Response';
        status.textContent += `Status : ${bookItem.status}`;
    }
    else {
        status.textContent += `Status : ${bookItem.status.toUpperCase()}`;
    }

    // status.textContent = empty_check(
    //     bookItem[status],
    //     '?',
    //     `Pages : ${bookItem.status}`,
    //     `Pages : ${bookItem.status}`
    // )



    // Book Rating
    const rating = document.createElement('p');
    rating.className += 'book-status';
    if (bookItem[rating] === undefined) {
        bookItem.rating = 0;
        rating.textContent += `Rating : ${bookItem.rating} / 5`;
    }
    else {
        rating.textContent += `Rating : ${bookItem.rating} / 5`;
    }

    // rating.textContent = empty_check(
    //     bookItem[rating],
    //     '?',
    //     `Rating : ${bookItem.rating} / 5`,
    //     `Rating : ${bookItem.rating} / 5`
    // )


    // Buttons
    const button_status = document.createElement('button');
    button_status.className += 'change-status';
    button_status.textContent += 'CHANGE STATUS'

    const button_rating = document.createElement('button');
    button_rating.className += 'change-rating';
    button_rating.textContent += 'CHANGE RATING';

    const button_delete = document.createElement('button');
    button_delete.className += 'delete';
    button_delete.textContent += 'DELETE';

    // Adding everything to the DOM
    books.appendChild(box);
    box.append(title, author, pages, status, rating, button_status, button_rating, button_delete);


    // Adding event listeners to currently added items
    button_status.addEventListener('click', () => {
        bookItem.status = bookItem.change_status(bookItem.status);
        status.textContent = `Status : ${bookItem.status}`;
    })

    button_rating.addEventListener('click', () => {
        bookItem.rating = bookItem.change_rating(parseInt(bookItem.rating));
        rating.textContent = `Rating : ${bookItem.rating} / 5`;
    })

    button_delete.addEventListener('click', () => {
        let book_list = books.querySelectorAll('.book');
        let new_count = book_list.length;
        for (let x = 0; x <= new_count; x++) {
            if (bookItem.id == book_list[x].dataset.id) {
                books.removeChild(book_list[x]);
                return;
            }
        }
    })
})

add_button.addEventListener('click', () => {
    if (add_form_section.classList.contains('hide') === true) {
        add_form_section.className += ' display';
        add_form_section.classList.remove('hide');
    }
    else {
        add_form_section.className += ' hide';
        add_form_section.classList.remove('display');
    }
})
