export const timer = (deadline) => {

  const addZero = (num) => {
    return num <= 9 ? '0' + num : num.toString();
  };

  const getTimeRemaining = (endTime) => {
    const time = Date.parse(endTime) - Date.parse(new Date().toString());
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);

    return { time, seconds, minutes };
  };

  const setClock = (endTime) => {
    const minutes = document.querySelector('#minutes');
    const seconds = document.querySelector('#seconds');

    const updateClock = () => {
      const time = getTimeRemaining(endTime);
      minutes.textContent = addZero(time.minutes);
      seconds.textContent = addZero(time.seconds);

      if (time.time <= 0) {
        minutes.textContent = '00';
        seconds.textContent = '00';

        clearInterval(timeInterval);
        document.querySelector('.ready__button').disabled = true;
      }
    };

    updateClock();


    const timeInterval = setInterval(updateClock, 1000);
  };

  setClock(deadline);
};
