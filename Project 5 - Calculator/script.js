const calc = document.querySelector('#calculator');
const buttons = document.querySelectorAll('.number');
const screen = document.querySelector('.screen');
const clear = document.querySelector('.all-clear');
const enter = document.querySelector('.equal-sign');
const operator = document.querySelectorAll('.operator');
const backspace = document.querySelector('.backspace');

let number1 = '';
let number2 = '';
let sign = '';
let result = 0;
let counter_buttons = 0;
let counter_operator = 0;
let counter_continue = 0;
let keybind_property = '';
let placeholder;

const keybinds = {
    // Key Buttons
    '1': 'number',
    '2': 'number',
    '3': 'number',
    '4': 'number',
    '5': 'number',
    '6': 'number',
    '7': 'number',
    '8': 'number',
    '9': 'number',
    '0': 'number',

     // Decimal Point
    '.': 'number',

    // Enter Button
    'Enter': 'equal-sign',

    // Backspace Button
    'Backspace': 'backspace',

    // Clear button
    'c': 'all-clear',
    'C': 'all-clear',


    // Operators are in order, Multiply Add Subtract Divide
    '*': 'operator',
    '+': 'operator',
    '-': 'operator',
    '/': 'operator',
}

const button_logic = (button) => {

    placeholder = placeholder_checker(button);

    if (screen.value == 0 || screen.value == '>:(') {
        screen.value = '';
    }
    else if (counter_continue === 1) {
        screen.value = '';
        counter_continue = 0;
        counter_buttons = 1;
        counter_operator = 1;
    }
    else if (placeholder === '.' && (screen.value).includes('.')) return;
    screen.value += placeholder;
    button = document.querySelector(`button[value="${placeholder}"]`);
    button.style.backgroundImage = 'linear-gradient( 135deg, #FFD26F 10%, #3677FF 120%)';
};

const operator_logic = (button) => {
    placeholder = placeholder_checker(button);
    if (counter_buttons === 0) {
        number1 = screen.value;
        counter_continue = 1;
    }
    else if (counter_buttons === 1) {
        number2 = screen.value;
        counter_operator = 0;
        counter_buttons = 0;
        counter_continue = 1;
        number1 = number_checker(number1);
        number2 = number_checker(number2);
        screen.value = operate(number1, number2, sign)
        number1 = screen.value;
    }

    // ======================THIS LINE IS BROKEN===================================
    // For some reason this line of code is giving you an error when typing with a keyboard
    // But works as intended through buttons, find out why
    button = document.querySelector(`button[value="${placeholder}"]`);
    button.style.backgroundImage = 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)';
    sign = placeholder;

};

const enter_logic = () => {
    enter.style.backgroundImage = 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)';
    number2 = screen.value;
    number1 = number_checker(number1);
    number2 = number_checker(number2);
    if (number2 == 0) {
        screen.value = '>:(';
    }
    else {
        screen.value = operate(number1, number2, sign);
    }
    counter_buttons = 0;
    counter_operator = 0;

}

const clear_logic = () => {
    clear.style.backgroundImage = 'linear-gradient(to top, #f43b47 26%, #453a94 120%)';
    reset();
}

const backspace_logic = () => {
    if (screen.value == 0) return;

    screen.value = screen.value.slice(0, -1);

    if (screen.value == '') {
        screen.value = 0;
    };
    backspace.style.backgroundImage = 'linear-gradient(to top, #f43b47 26%, #453a94 120%)';
}

const keyboard_logic = (e) => {
    if (keybinds.hasOwnProperty(e.key) == true) {
        keybind_property = e.key;

        switch (keybinds[keybind_property]) {

            case 'number':
                button_logic(e);
                break;

            case 'operator':
                operator_logic(e);
                break;

            case 'equal-sign':
                enter_logic(e);
                break;

            case 'all-clear':
                clear_logic(e);
                break;

            case 'backspace':
                backspace_logic(e);
                break;
        }
    };
}

const keyboard_clear = (x) => {
    placeholder = placeholder_checker(x);
    let current_button = document.querySelector(`button[value="${placeholder}"]`);
    current_button.addEventListener('keyup', () => {
        current_button.style.backgroundImage = 'none';
    });
}

const mouse_clear = (x) => {
    x.addEventListener('mouseout', () => {
        x.style.backgroundImage = 'none';
    });
    x.addEventListener('mouseup', () => {
        x.style.backgroundImage = 'none';
    });
};

const operate = (a, b, operator) => {
    switch (operator) {

        case "+":
            return a + b;

        case "-":
            return a - b;

        case "*":
            return a * b;

        case "/":
            return a / b;
    }
}

const number_checker = (x) => {
    if (x === '') {
        return x = 0.0;
    }
    else if (x === '.') {
        return x = 0.0;
    }
    else return parseFloat(x);
}


// This is to help our program differentiate whether we get a 
// keyboard input or a mouse input
const placeholder_checker = (x) => {
    if ('value' in x) {
        return x.value;
    }
    else if ('key' in x) {
        return x.key;
    }
}

const reset = () => {
    screen.value = '0';
    number1 = '';
    number2 = '';
    counter_buttons = 0;
    counter_operator = 0;
}

buttons.forEach((button) => {
    button.addEventListener('mousedown', () => {
        button_logic(button);
    });

    mouse_clear(button);
    keyboard_clear(button);
1});

operator.forEach((button) => {
    button.addEventListener('mousedown', () => {
        operator_logic(button);
    });
    mouse_clear(button);
    keyboard_clear(button);
});


enter.addEventListener('mousedown', () => {
    enter_logic();
})
mouse_clear(enter);
keyboard_clear(enter);

clear.addEventListener('mousedown', () => {
    clear_logic();
});

mouse_clear(clear);
keyboard_clear(clear);

backspace.addEventListener('mousedown', () => {
    backspace_logic();
});

mouse_clear(backspace);
keyboard_clear(backspace);

document.addEventListener('keydown', (e) => {
    keyboard_logic(e);
});

document.addEventListener('keydown', (e) => {
    keyboard_clear(e);
});

// keyboard_clear(document);

