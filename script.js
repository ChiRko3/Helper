const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
    {
        image: "./img/drink.jpg",
        text: "I'm Thirsty"
    },
    {
        image: './img/food.jpg',
        text: "I'm Hungry"
    },
    {
        image: './img/tired.jpg',
        text: "I'm Tired"
    },
    {
        image: './img/hurt.jpg',
        text: "I'm Hurt"
    },
    {
        image: './img/happy.jpg',
        text: "I'm Happy"
    },
    {
        image: './img/angry.jpg',
        text: "I'm Angry"
    },
    {
        image: './img/sad.jpg',
        text: "I'm Sad"
    },
    {
        image: './img/scared.jpg',
        text: "I'm Scared"
    },
    {
        image: './img/outside.jpg',
        text: 'I Want To Go Outside'
    },
    {
        image: './img/home.jpg',
        text: 'I Want To Go Home'
    },
    {
        image: './img/school.jpg',
        text: 'I Want To Go To School'
    },
    {
        image: './img/grandma.jpg',
        text: 'I Want To Go To Grandmas'
    }
];

data.forEach(createBox);
function createBox(item) {
    const newData = document.createElement('div');
    const { image, text } = item;
    newData.classList.add('box');
    newData.innerHTML = `
    <img src = "${image}" alt = "${text}">
    <p class = "info">${text}</p>
    `;
    newData.addEventListener('click',()=>{
        setSpeechText(text);
        speakText();
        newData.classList.add('active')
        setTimeout(()=> newData.classList.remove('active'),1000)
    })
    main.appendChild(newData);
}
const message = new SpeechSynthesisUtterance

let voices = [];
function getVoices(){
    voices = speechSynthesis.getVoices();

    voices.forEach(voice =>{
        let option = document.createElement('option')
        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;
        voicesSelect.appendChild(option);
    })
}

function setVoice(e){
    message.voice = voices.find(voice => voice.name === e.target.value);

}
function setSpeechText(text){
    message.text = text;
}

function speakText(){
    speechSynthesis.speak(message);
}

function readText(e){
    message.text = textarea.value
    speakText()
}

speechSynthesis.addEventListener('voiceschanged',getVoices);
toggleBtn.addEventListener('click',()=> document.getElementById('text-box').classList.toggle('show'));
closeBtn.addEventListener('click',()=> document.getElementById('text-box').classList.toggle('show'));
voicesSelect.addEventListener('change',setVoice)
readBtn.addEventListener('click', readText)
getVoices();