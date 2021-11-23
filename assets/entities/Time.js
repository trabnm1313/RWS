import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

export default (props) => {
  const [timeLeft, setTime] = useState(5); //second
  const [status, setStatus] = useState(true);

  useEffect(() => {
    if (status) {
      let timer = setInterval(() => {
        tick();
        clearInterval(timer);
      }, 1000);
    }
  });

  function tick() {
    let x = timeLeft;
    x--;

    // when the time ran out
    if (x === 0) {
      setStatus(false);
      console.log("Timeout");
      setTime(0);
    } else {
      setTime(x);
    }
  }

  return (
    <>
      <Text>{timeLeft}</Text>
    </>
  );
};
