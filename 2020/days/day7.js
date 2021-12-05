const formatBagItems = (bagItems) =>
  bagItems
    .split(', ')
    .map((bagItem) => {
      const cleanItem = bagItem.replace(/bag(s)?|\./g, '').trim();

      if (cleanItem === 'no other') return '';

      // the + is a quick way to convert to number
      const amount = +cleanItem.substring(0, 1);
      const bag = cleanItem.substring(1).trim();

      return {
        amount,
        bag,
      };
    })
    .filter((item) => item);

const parseData = (data) =>
  data
    .split('\n')
    .filter((line) => line.trim())
    .reduce((sum, group) => {
      const splitGroup = group
        .split('bags contain')
        .map((item) => item.trim());

      const formatedGroup = {
        type: splitGroup[0],
        items: formatBagItems(splitGroup[1]),
      };

      return [...sum, formatedGroup];
    }, []);

const getBagsThatAllowsBag = (bags, requiredBag) => {
  const allowingBags = bags
    .filter((bag) =>
      bag.items.some((item) => item.bag === requiredBag),
    )
    .reduce((sum, bag) => [...sum, bag.type], []);

  return allowingBags;
};

const getBagsToStoreBagIn = (bags, requiredBag) => {
  const allowingBags = getBagsThatAllowsBag(bags, requiredBag);

  // loop through all bags, and look if either type, or and child includes are allowing bag
  const bagsForStorage = bags
    .filter((bag) => {
      const allowBag = allowingBags.includes(bag.type);
      // quick return to save some performance
      if (allowBag) return true;

      const bagItemsAllowBag = bag.items.some((item) =>
        allowingBags.includes(item.bag),
      );

      return bagItemsAllowBag;
    })
    .reduce((sum, bag) => [...sum, bag.type], []);

  return bagsForStorage;
};

const validateAllBags = (bags, allowedBags) => {
  // remove the initial value, because that is the bag we want to fit
  const reducerValue = allowedBags.length === 1 ? [] : allowedBags;
  const result = allowedBags.reduce(
    (sum, value) => [...sum, ...getBagsToStoreBagIn(bags, value)],
    reducerValue,
  );

  const uniqueBags = [...new Set(result)];

  if (allowedBags.length === uniqueBags.length) return uniqueBags;

  return validateAllBags(bags, uniqueBags);
};

const countContainingBags = (currentBag, bags) => {
  const { items } = currentBag;

  // sum all of the bags in the current bag
  const sumOfItems = items.reduce((sum, item) => {
    if (item.amount === 0) return 0;

    return sum + item.amount;
  }, 0);

  // if there is no bags, then we are at the end
  if (sumOfItems === 0) return sumOfItems;

  return (
    // first, take amount of bags in current bag
    sumOfItems +
    items.reduce((sum, item) => {
      // for each bag in the current bag, get the bag
      const currentChildBag = bags.find(
        (bag) => bag.type === item.bag,
      );

      // take the amonth of the item, and multiply it with all the childBags
      // after that, add it to sum, so get value of all childbags in the current bag
      return (
        sum + item.amount * countContainingBags(currentChildBag, bags)
      );
    }, 0)
  );
};

const solution1 = (data) => {
  const bags = parseData(data);

  const result = validateAllBags(bags, ['shiny gold']);

  return result.length;
};

const solution2 = (data) => {
  const bags = parseData(data);

  // find the shiny gold
  const myBag = bags.find((bag) => bag.type === 'shiny gold');

  // get all the bags that my bag contains
  const result = countContainingBags(myBag, bags);

  return result;
};

export {
  parseData,
  getBagsThatAllowsBag,
  getBagsToStoreBagIn,
  solution1,
  solution2,
};
