import './styles.css';

// Creating the Nav Bar
const navBar = (function() {

    // We want a nav bar with 3 buttons, home, menu, and contact
    const body = document.querySelector('body');
    const header = document.createElement('header');
    const logo = document.createElement('section');
    const logoText = document.createElement('p');
    const nav = document.createElement('nav');
    const home = document.createElement('button');
    const menu = document.createElement('button');
    const contact = document.createElement('button');

    // Editing Nodes
    // Logo Stuff
    logo.className = 'logo';
    logoText.innerText = 'Break-a-Bar';
    logoText.className = 'logo-text'

    // Nav Bar Buttons
    home.textContent = 'HOME';
    menu.textContent = 'MENU';
    contact.textContent = 'CONTACT';

    // Creating 3 li's for the ul

    // Appending elements in correct order
    body.prepend(header);
    header.append(logo, nav);
    logo.appendChild(logoText);
    nav.append(home, menu, contact);

    return {
        home: home,
        menu: menu,
        contact: contact,
    }
})();

// Creating event listeners for each button, then pulls the div content from each respective module
// On click, will delete div id=content and render in the new content
const navLogic = (function() {

})();