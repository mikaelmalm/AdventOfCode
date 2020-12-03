const fs = require("fs");

// Read file helper,
const readFile = () =>
  fs.promises
    .readFile(`${__dirname}/data.txt`, "utf8")
    .then((res) => res.split("\r\n"))
    .then((res) => res.map((field) => field.split("")))
    .catch((err) => console.log(err));

const move = (pos) => ({
  x: pos.x + 3,
  y: pos.y + 1,
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

const calculatePath = (data) => {
  return data.reduce(
    (result) => {
      // end of slope
      if (result.y === data.length - 1) return result;

      // move unit
      const updatedPos = move(result);

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

const run = async () => {
  const data = await readFile();

  const result = calculatePath(data);

  console.log(result);
};

run();
