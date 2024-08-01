const randomIntegerNumber = (number) =>
  Math.floor(Math.random() * number);

const createIntegerIndex = () => {
  let index = 1;
  return () => index++;
};

export { randomIntegerNumber, createIntegerIndex };
