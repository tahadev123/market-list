export const generateRandomDelays = (length: number): number[] => {
  const delays: number[] = [];
  for (let i = 0; i < length; i++) {
    const delay = Number((Math.random() * 0.6 + 0.1).toFixed(2)); // بین 0.1 تا 0.7
    delays.push(delay);
  }
  return delays;
};