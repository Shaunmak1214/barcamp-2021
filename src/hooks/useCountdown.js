import { useEffect, useRef } from 'react';

const useCountdown = (date) => {
  const daysRef = useRef(null);
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);

  let interval = useRef();
  const countDownTimer = () => {
    const countDownDate = new Date(date).getTime();
    //@ts-ignore
    interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = countDownDate - now;

      const calDays = Math.floor(distance / (1000 * 60 * 60 * 24));
      const calHours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const calMinutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60),
      );
      const calSeconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        daysRef.current.innerText = calDays;
        hoursRef.current.innerText = calHours;
        minutesRef.current.innerText = calMinutes;
        secondsRef.current.innerText = calSeconds;
      }
    }, 1000);
  };

  useEffect(() => {
    countDownTimer();

    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return { daysRef, hoursRef, minutesRef, secondsRef };
};

export default useCountdown;
