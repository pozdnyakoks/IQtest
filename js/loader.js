export default function loader() {
  return (`
  <div class="container">
   <div class="progress">
      <div style="width: 100%" class="progressBar"></div>
    </div>
    <p class="loading">Обработка результатов</p>
    <img class="loader" alt="loading" src='./images/loader.svg'>
    <p class="loading__desc">Определение стиля мышления ..................................................................</p>    
</div>
  `)
}