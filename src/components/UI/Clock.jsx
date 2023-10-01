import React, { useState, useEffect } from "react";

const Clock = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval;
    const countDown = () => {
      const destination = new Date("Oct 10, 2023").getTime();

      const interval = setInterval(() => {
        const now = new Date().getTime();
        const difference = destination - now;

        if (difference <= 0) {
          clearInterval(interval);
          setDays(0);
          setHours(0);
          setMinutes(0);
          setSeconds(0);
        } else {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setDays(days);
          setHours(hours);
          setMinutes(minutes);
          setSeconds(seconds);
        }
      }, 1000);
    };

    countDown();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock_wrapper d-flex align-items-center gap-3">
      <div className="clock_data d-flex align-items-center gap-3">
        <div className="text-center">
          <h1 className="text-white fs-3">{days}</h1>
          <h4 className="text-white fs-6">days</h4>
        </div>
        <span className="text-white fs-3">:</span>
      </div>

      <div className="clock_data d-flex align-items-center gap-3">
        <div className="text-center">
          <h1 className="text-white fs-3">{hours}</h1>
          <h4 className="text-white fs-6">Hours</h4>
        </div>
        <span className="text-white fs-3">:</span>
      </div>

      <div className="clock_data d-flex align-items-center gap-3">
        <div className="text-center">
          <h1 className="text-white fs-3">{minutes}</h1>
          <h4 className="text-white fs-6">Minutes</h4>
        </div>
        <span className="text-white fs-3">:</span>
      </div>

      <div className="clock_data d-flex align-items-center gap-3">
        <div className="text-center">
          <h1 className="text-white fs-3">{seconds}</h1>
          <h4 className="text-white fs-6">Seconds</h4>
        </div>
      </div>
    </div>
  );
};

export default Clock;
