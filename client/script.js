import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

// loading element rendering
function loader(element) {
    element.textContent = '';
    loadInterval = setInterval(() => {
        element.textContent += '.';

        if (element.textContent === '....') {
            element.textContent = '';
        }
    }, 300)
}

// typewriter rendering of chat output
function typeText(element, text) {
    let index = 0;

    let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.chartAt(index);
            index++;
        } else {
            clearInterval(interval);
        }
    }, 20)
}

// using timestamp to generate unique ID
function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
    
    return `id-${timestamp}-${hexadecimalString}`;
}

// stripe styling on interface
function chatStrip (isAi, value, uniqueId) {
    return (
        `
        <div class='wrapper ${isAi && 'ai'}'>
            <div class='chat'>
                <div className='profile'>
                    <img 
                        src='${isAi ? bot : user}'
                        alt='${isAi ? 'bot' : 'user'}'
                    />
                </div>
                    <div class='message' id=${uniqueId}>${value}</div>
            </div>
        </div>
        `
    )
}

// form submit handle function
const handleSubmit = async(e) => {
    e.preventDefault();

    const data = new FormData(form);
    
    // user's chat stripe
    chatContainer.innerHTML += chatStrip(false, data.get('prompt'));

    form.reset();

    // AI's chat stripe
    const uniqueId = generateUniqueId();
    chatContainer.innerHTML += chatStrip(true, ' ', uniqueId);

    // scroll functionality
    chatContainer.scrollTop = chatContainer.scrollHeight;

    const messageDiv = document.getElementById(uniqueId); 

    loader(messageDiv);
}

// submit on enter key press
form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
    if(e.keyCode === 13) {
        handleSubmit(e)
    }
});