const NEW_FISH_TIMER = 8;
const FISH_RESET_TIMER = 6;
const EMPTY_COUNT_ARR = () => new Array(NEW_FISH_TIMER + 1).fill(0);

const sum = (values: number[]) =>
  values.reduce(
    (sum, value) => (!isNaN(value) ? sum + value : sum),
    0,
  );

const parseFishData = (data: string) => data.split(',').map(Number);

const formatFishesInCountArray = (fishes) =>
  fishes.reduce((sum, fish): number[] => {
    const isFirstFishWithTimer = sum[fish] === undefined;
    sum[fish] = isFirstFishWithTimer ? 1 : sum[fish] + 1;
    return sum;
  }, EMPTY_COUNT_ARR());

export const countFishGrowth = (fishData: string, days: number) => {
  const fishes = parseFishData(fishData);

  let fishesOnCounter = formatFishesInCountArray(fishes);

  for (let i = 0; i < days; i++) {
    let newFishes = 0;

    const updatedFishValues = fishesOnCounter.reduce(
      (sum, fishTimer, index): number[] => {
        if (index === 0) {
          newFishes = fishTimer;
          return sum;
        }

        sum[index - 1] = fishTimer;

        return sum;
      },
      EMPTY_COUNT_ARR(),
    );

    if (newFishes > 0) {
      updatedFishValues[NEW_FISH_TIMER] += newFishes;
      updatedFishValues[FISH_RESET_TIMER] += newFishes;
    }

    fishesOnCounter = updatedFishValues;
  }

  const numberOfFishes = sum(fishesOnCounter);

  return numberOfFishes;
};
