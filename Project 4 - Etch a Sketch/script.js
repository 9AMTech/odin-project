// Defining Functions


// create_grid is a function that will create a section.grid , append it to container
// then will create num amount of rows and tiles forming a grid for our etcha sketch
const create_grid = (num) => {
    
    const grid = document.createElement('section');
    grid.className += 'grid';
    container.appendChild(grid);


    // Creating X Rows
    while(r <= num) {
        const row = document.createElement('section');
        row.className += 'row';
        grid.appendChild(row);
        // console.log('Row ' + r);
    
        // Creating X Tiles within the X Rows
        while(t <= num) {
            const tile = document.createElement('section');
            tile.className += 'tile';
            row.appendChild(tile);
            // console.log('Tile' + t);
            t++;
        }


    t = 1;
    r++;
    }
    r = 1;
    return grid;
}

// ========================== HSL VERSION ================================ 
// change_on_hover is a function that will add functionality to our etch a sketch
// this will be a random color every time it's highlighted
// this will be changed to turn the tiles darker by 10% until they reach a full black color
// const change_on_hover = () => {

//     const tiles = document.querySelectorAll('.tile');
//     tiles.forEach((x) => {
//             x.addEventListener('mouseover' , () => {
//                     let p = 0;
//                     hue = random_hue();
//                     const hsl_color = 'hsl(' + hue + ' , '+ p +'% , ' + p + '%)';
//                     p += 10;
//                     x.style.backgroundColor = hsl_color;
//                     console.log(hsl_color);
//                 }
//             )
//         }
//     )
// }


// ========================== HEX VERSION ================================ 
// change_on_hover is a function that will add functionality to our etch a sketch
// this will be a random color every time it's highlighted
// this will be changed to turn the tiles darker by 10% until they reach a full black color
const change_on_hover = () => {

    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((x) => {
            x.addEventListener('mouseover' , () => {
                    x.style.backgroundColor = random_color_HEX();
                }
            )
        }
    )
}


// create_button is a function that will create a button above the grid
// that allows the user to change the size of the grid at the click of a button
const create_button = () => {

    const new_grid = document.createElement('button');

    new_grid.textContent = 'Change Size!';
    new_grid.className = 'grid-size-button';
    new_grid.addEventListener('click' , () => {
        let size = prompt('How big do you want the grid size to be?');
        while (size > 100 || size <= 0) {
            size = prompt('Please enter a number between 1 and 100!');
        }

         // Deleting the current grid and creating a new one

        old_grid = container.querySelector('.grid');
        old_grid.remove();
        create_grid(size);
        change_on_hover();
    })

    // Inserting the new grid into container
    container.prepend(new_grid);
}

// ========================== HSL VERSION ================================ 
// random_hue is a function that does just like it says
// it'll generate a random hue value, 1-360 with random hue and random saturation
// and x lightness, x being the passed through increment value percentage

// const random_hue = () => {
//     let hue = Math.floor(Math.random() * 360);
//     console.log(hue)
//     return hue;
// }


// // remove_all_children is a function that does just like it says
// // it's a loop that'll essentially delete all first children within a node
// const remove_all_children = (parent) => {
//     while (parent.firstChild) {
//         parent.removeChild(parent.firstChild);
//     }
// }


// ========================== HEX VERSION ================================ 
// random_color_HEX is  function that will generate 
// a random hex color for function change_on_hover
const random_color_HEX = () => {
    let color = '#';
    let letters = '1234567890ABCDEF';

    for (var i = 1; i <= 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
    





// Main Code

let container = document.querySelector('#container');


// r = Rows and t = Tiles
let r = 1;
let t = 1;

create_grid(16);
change_on_hover();
create_button();