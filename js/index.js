import questions from '../answers.json' assert { type: "json" }
import { timer } from './timer.js';
import loader from './loader.js';
import makeQuiz from './makeQuiz.js';
import loadApiArray from './loadApiArray.js';

const burger = document.querySelector('.header__burger');
const nav = document.querySelector('nav');
const closeMenu = document.querySelector('.header__close');
const quiz = document.querySelector('.quiz');
const headerQuiz = document.querySelector('.header__quiz');
const readyEl = document.querySelector('.ready');

let currentQuestion = 1;

burger.addEventListener('click', () => {
  nav.classList.add('active')
  document.body.style.overflow = 'hidden'
})

closeMenu.addEventListener('click', closeBurger)

function closeBurger() {
  nav.classList.remove('active')
  document.body.style.overflow = ''
}

function documentListeners() {
  document.addEventListener('click', (ev) => {
    try {
      if (ev.target.classList.contains('header__list-item') || ev.target.parentElement.classList.contains('header__list-item')) {
        closeBurger()
      }

      if ((quiz.classList.contains('active') || readyEl.classList.contains('active')) && (ev.target.classList.contains('header__list-item') || ev.target.parentElement.classList.contains('header__list-item')) && (!ev.target.classList.contains('start') || !ev.target.parentElement.classList.contains('start'))) {
        quiz.classList.remove('active');
        headerQuiz.classList.remove('active');
        readyEl.classList.remove('active');

        document.body.style.overflow = '';
        currentQuestion = 1;
      }

      if (ev.target.classList.contains('start') || ev.target.parentElement.classList.contains('start')) {
        window.scrollTo(0, 0);
        quiz.classList.add('active');
        headerQuiz.classList.add('active');
        document.body.style.overflow = 'hidden';
        quiz.innerHTML = makeQuiz(questions[currentQuestion - 1], currentQuestion)
        openQuizButton()
      }

    } catch (err) {
      // console.log(err)
    }
  })
}

documentListeners()

function openQuizButton() {
  document.querySelectorAll('.radioInput').forEach(input => {
    input.addEventListener('input', () => {
      document.querySelector('.quiz__btn').disabled = false;
    })
  })

  document.querySelector('.quiz__btn').addEventListener('click', nextQuestion)
  currentQuestion++
}

function ready() {
  const title = document.querySelector('.header__title');
  title.classList.add('header__title-ready');
  title.textContent = 'ГОТОВО!';

  quiz.classList.remove('active');
  readyEl.classList.add('active');
  currentQuestion = 1;
}

async function addItems(arr) {
  return arr.map((el) => {
    return `<li>${el.title}</li>`
  }).join('');
}

async function getData() {
  const res = await fetch('https://swapi.dev/api/people/1/');
  const data = await res.json();
  return createDataElement(data)
}

async function createDataElement(obj) {
  const films = await loadApiArray(obj.films);
  const filmsEls = await addItems(films)
  return (`
    <div class="dataBlock">
      <p>Имя: ${obj.name}</p>
      <p>Пол: ${obj.gender}</p>
      <p>Рост: ${obj.height}</p>
      <p>Вес: ${obj.mass}</p>
      <p>Цвет глаз: ${obj.eye_color}</p>
      <p>Цвет волос: ${obj.hair_color}</p>
      <p>Год рождения: ${obj.birth_year}</p>
      <p>Films: </p>
      <ul class="dataList">
      ${filmsEls}
      </ul>
    </div>
    `)
}

function nextQuestion() {
  if (currentQuestion > questions.length) {
    quiz.innerHTML = loader();

    setTimeout(() => {
      ready()
      const deadline = new Date(new Date().getTime() + 10 * 60000);
      document.querySelector('.ready__button').disabled = false;
      timer(deadline)

      document.querySelector('.ready__button').addEventListener('click', async () => {
        document.querySelector('.footer').insertAdjacentHTML('beforebegin', await getData());
      })

    }, 3000)

  } else {
    quiz.innerHTML = makeQuiz(questions[currentQuestion - 1], currentQuestion)
    openQuizButton();
  }
}

