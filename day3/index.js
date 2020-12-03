const fs = require("fs");

// Read file helper,
const readFile = () =>
  fs.promises
    .readFile(`${__dirname}/data.txt`, "utf8")
    .then((res) => res.split("\r\n"))
    .then((res) => res.map((field) => field.split("")))
    .catch((err) => console.log(err));

const move = (pos, pattern = { x: 3, y: 1 }) => ({
  x: pos.x + pattern.x,
  y: pos.y + pattern.y,
});

const mapStatus = (data, position) => {
  const mapWidth = data[0].length;

  const stepsDown = position.y;
  const stepsToRight =
    position.x < mapWidth ? position.x : position.x % mapWidth;

  const currentMapPosition = data[stepsDown][stepsToRight];

  return currentMapPosition;
};

const hitTree = (data, position) => {
  const mapPositionStatus = mapStatus(data, position);
  const TREE = "#";

  return mapPositionStatus === TREE;
};

const calculatePath = (data, pattern) => {
  return data.reduce(
    (result) => {
      // end of slope
      if (result.y === data.length - pattern.y) return result;

      // move unit
      const updatedPos = move(result, pattern);

      // look if hit tree
      const treeHit = hitTree(data, updatedPos);

      // return result to next item
      return {
        ...updatedPos,
        treesHit: treeHit ? result.treesHit + 1 : result.treesHit,
      };
    },
    {
      x: 0,
      y: 0,
      treesHit: 0,
    }
  );
};

const calculateTreesHitPerPaths = (data, patterns) => {
  return patterns.reduce((treesHit, pattern) => {
    const result = calculatePath(data, pattern);

    return treesHit * result.treesHit;
  }, 1); // start on one, since we are multiplying
};

const run = async () => {
  const data = await readFile();

  const patterns = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
  ];

  const result = calculatePath(data, patterns[1]);
  const result2 = calculateTreesHitPerPaths(data, patterns);

  console.log("part 1", result);
  console.log("part 2", result2);
};

run();
