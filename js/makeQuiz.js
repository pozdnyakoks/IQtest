import questions from '../answers.json' assert { type: "json" }

function decode(str) {
  let txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}


export default function makeQuiz(obj, ind) {
  const answers = obj.type === 'color' ?
    obj.answers.map(answer => {
      return (`
     <div class="colorAnswers">
        <label class="color" style="background-color: ${answer}">
          <input class="radioInput" type="radio" name="${obj.question}">
        </label>
      </div>
  `)
    }).join('') :

    obj.answersType === 'square' ?
      obj.answers.map(answer => {
        return (`<label class="squareAnswerLabel">
            <input class="radioInput" type="radio" name=${obj.question}>
            ${answer}
          </label>`)
      }).join('') :

      obj.answers.map(answer => {
        return (`<label class="answerLabel">
            <input class="radioInput" type="radio" name=${obj.question}>
            <span class="pseudoRadio"></span>
            ${answer}
          </label>`)
      }).join('')


  return (`
  <div class="container">
        <div class="progress">
          <div style="width: ${(100 / (questions.length + 1)) * ind}%" class="progressBar"></div>
        </div>
        <p class="question">${decode(obj.question)}</p>
        ${obj.img ? `<img src=${obj.img} alt=${obj.question} style='margin: 0 auto'>` : ''}
        ${obj.type === 'color' ?
      `<div class="colorAnswers">${answers}</div>` :
      obj.answersType === 'square' ? `<div class="squares">${answers}</div>` :
        `<div class="answers">${answers}</div>`}

        <button id='id${obj.id}' class="main__btn quiz__btn" disabled>ДАЛЕЕ</button>  
      </div>
      </div>`)
}

