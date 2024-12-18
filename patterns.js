function canBeCreated(dimensions) {
  return dimensions[0] > 0 && dimensions[1] > 0;
}

function giveSize(size) {
  if (size[0] % 2 === 0) {
    return size[0] - 1;
  }

  return size[0];
}

function hallow(dimensions, i) {
  const row = ["*"];
  if (dimensions[0] === 1) {
    return row;
  }

  for (let j = 1; j < dimensions[0] - 1; j++) {
    const element = i === 0 || i === dimensions[1] - 1 ? "*" : " ";
    row.push(element);
  }

  row.push("*");
  return row;
}

function filled(dimensions, char) {
  const row = [];

  for (let j = 0; j < dimensions[0]; j++) {
    row.push(char);
  }

  return row;
}

function rightAlign(dimensions, char, length) {
  const row = [];

  row.push(char.repeat(dimensions[0]).padStart(length).split(""));

  return row;
}

function createRightAngledTriangle(dimensions) {
  const triangle = [];

  for (let i = 1; i <= dimensions[0]; i++) {
    triangle.push(rightAlign([i], "*", dimensions[0]));
  }
  return triangle;
}

function createTriangle(dimensions) {
  const triangle = [];

  for (let i = 1; i <= dimensions[0]; i++) {
    triangle.push(filled([i], "*"));
  }

  return triangle;
}

function getChar(charIndex) {
  const arrayOfElements = ["*", "-", " "];
  return arrayOfElements[charIndex];
}

function createAlternatingRectangle(dimensions, cardialNumber) {
  const rectangle = [];

  for (let i = 0; i < dimensions[1]; i++) {
    rectangle.push(filled(dimensions, getChar(i % cardialNumber)));
  }

  return rectangle;
}

function createHollowRectangle(dimensions) {
  const rectangle = [];

  for (let i = 0; i < dimensions[1]; i++) {
    rectangle.push(hallow(dimensions, i));
  }

  return rectangle;
}

function createFilledRectangle(dimensions) {
  const rectangle = [];

  for (let i = 0; i < dimensions[1]; i++) {
    rectangle.push(filled(dimensions, getChar(0)));
  }

  return rectangle;
}

function reverse(string) {
  let replacedString = string.replaceAll(",", "");
  let reverse = "";

  for (let index = replacedString.length - 2; index >= 0; index--) {
    reverse = reverse + replacedString[index];
  }

  reverse = reverse.trimEnd();
  return reverse;
}

function leftAlign(char, length) {
  const row = [];
  row.push((((char.padEnd(length)) + char).trimEnd()).split(""));

  return row;
}

function reverseForHollow(string) {
  let replacedString = string.replaceAll(",", "");
  let reverse = "";

  for (let index = replacedString.length - 2; index > 0; index--) {
    reverse = reverse + replacedString[index];
  }

  return reverse;
}

function hollowRow(i, dimensions) {
  const row = [];
  if (i < 2) {
    row.push("*".padStart(dimensions).split(""));
    return row;
  }

  if (i === 2) {
    row.push("* *".padStart(dimensions).split(""));
    return row;
  }

  if (i > 2) {
  const dim = [i, dimensions];
  const halfRow = hallow(dim, i);

  row.push(((halfRow.join()).padStart(dimensions)).replaceAll(",", "").split(""));
  }

  return row;
}

function diamondRow(length, dimensions) {
  let row = [];
  const halfRow = rightAlign([length], getChar(0), Math.ceil(dimensions[0] / 2));
  const otherHalf = reverse(halfRow.join());
  row.push(halfRow);
  
  row.push(otherHalf.split(""));
  
  
  console.log("diamond shaped row:", row)
  return row;
}

function createHollowDiamond(size) {
  const dimensions = [giveSize(size)];
  const diamond = [];
  for (let i = 1; i <= Math.ceil(dimensions[0]); i++) {
    console.log("the hollow loop is returning", hollowRow(i, dimensions[0]));
    diamond.push(hollowRow(i , dimensions[0]));
  }

  diamond.pop();
  console.log("half of the shape:", diamond)
  console.log("diamond length :", diamond.length)
  for (let index = diamond.length - 2; index >= 0; index--) {
    console.log("entered the reverse looop")
    diamond.push(diamond[index]);
  }

  return diamond;
}

function createDiamond(size) {
  const dimensions = [giveSize(size)];
  const diamond = [];
  for (let i = 1; i <= Math.ceil(dimensions[0] / 2); i++) {
    diamond.push(diamondRow(i, dimensions));
  }

  for (let index = diamond.length - 2; index >= 0; index--) {
    diamond.push(diamond[index]);
  }

  return diamond;
}

function allTriangles(style, dimensions) {
  if (style === "right-aligned-triangle") {
    return createRightAngledTriangle(dimensions);
  }

  return createTriangle(dimensions);
}

function allRectangles(style, dimensions) {
  if (!canBeCreated(dimensions)) {
    return "";
  }

  if (style === "filled-rectangle") {
    return createFilledRectangle(dimensions);
  }

  if (style === "hollow-rectangle") {
    return createHollowRectangle(dimensions);
  }

  if (style === "alternating-rectangle") {
    return createAlternatingRectangle(dimensions, 2);
  }

  if (style === "spaced-alternating-rectangle") {
    return createAlternatingRectangle(dimensions, 3)
  }
}

function allDiamonds(style, dimensions) {
  if (style === "hollow-diamond") {
    return createHollowDiamond(dimensions);
  }

  return createDiamond(dimensions)
}

function createShape(style, dimensions) {
  if (style.endsWith("rectangle")) {
    return allRectangles(style, dimensions);
  }

  if (style.endsWith("triangle")) {
    return allTriangles(style, dimensions);
  }

  if (style.endsWith("diamond")) {
    return allDiamonds(style, dimensions);
  }
}

function convertToString(shape) {
  let shapeToPrint = "";

  for (let index = 0; index < shape.length; index++) {
    if (index === shape.length - 1) {
      return shapeToPrint + (shape[index]);
    }
    shapeToPrint = shapeToPrint + shape[index] + "\n";
  }

  return shapeToPrint;
}

function createScreen(shape1, shape2, dimensions) {
  const screen = [];
  console.log("shape 1:",shape1);
  console.log("shape 2:",shape2);
  for (let index = 0; index < dimensions[1]; index++) {
    let row = ((shape1[index].join()).replaceAll(",", "")).padEnd(dimensions[0])
    row = row + " " + (shape2[index].join()).replaceAll(",", "");
    screen.push(row);
  }

  return screen;
}

function generatePattern(style1, dimensions, style2) {
  const shape1 = createShape(style1, dimensions);
  const shape2 = createShape(style2, dimensions);
  const dimensionsOfTheFinal = dimensions;
  if (dimensions.length === 1) {
    dimensionsOfTheFinal.push(dimensions[0]);
  }
  const screen = createScreen(shape1, shape2, dimensionsOfTheFinal);
  return convertToString(screen);
}

function testGeneratePattern(style1, dimensions, style2, expected, failed) {
  const actual = generatePattern(style1, dimensions, style2);
  if (actual !== expected) {
    failed.push([style1, dimensions, style2, actual, expected]);
  }
}

function testFilledRectangle(failed) {
  testGeneratePattern('filled-rectangle', [0, 0], '', failed);
  testGeneratePattern('filled-rectangle', [1, 0], '', failed);
  testGeneratePattern('filled-rectangle', [1, 1], '*', failed);
  testGeneratePattern('filled-rectangle', [1, 2], '*\n*', failed);
  testGeneratePattern('filled-rectangle', [2, 2], '**\n**', failed);
  testGeneratePattern('filled-rectangle', [2, 3], '**\n**\n**', failed);
}

function testHollowRectangle(failed) {
  testGeneratePattern('hollow-rectangle', [0, 0], '', failed);
  testGeneratePattern('hollow-rectangle', [1, 0], '', failed);
  testGeneratePattern('hollow-rectangle', [0, 1], '', failed);
  testGeneratePattern('hollow-rectangle', [1, 1], '*', failed);
  testGeneratePattern('hollow-rectangle', [1, 2], '*\n*', failed);
  testGeneratePattern('hollow-rectangle', [1, 3], '*\n*\n*', failed);
  testGeneratePattern('hollow-rectangle', [2, 2], '**\n**', failed);
  testGeneratePattern('hollow-rectangle', [3, 3], '***\n* *\n***', failed);
  testGeneratePattern('hollow-rectangle', [4, 4], '****\n*  *\n*  *\n****', failed);
}

function testAlternatingRectangle(failed) {
  testGeneratePattern('alternating-rectangle', [3, 3], '***\n---\n***', failed);
  testGeneratePattern('alternating-rectangle', [2, 2], '**\n--', failed);
  testGeneratePattern('alternating-rectangle', [1, 1], '*', failed);
  testGeneratePattern('alternating-rectangle', [1, 0], '', failed);
  testGeneratePattern('alternating-rectangle', [0, 1], '', failed);
  testGeneratePattern('alternating-rectangle', [0, 0], '', failed);
  testGeneratePattern('alternating-rectangle', [3, 1], '***', failed);
  testGeneratePattern('alternating-rectangle', [3, 1], '***', failed);
  testGeneratePattern('alternating-rectangle', [1, 3], '*\n-\n*', failed);
  testGeneratePattern('alternating-rectangle', [4, 4], '****\n----\n****\n----', failed);
}

function testTriangle(failed) {
  testGeneratePattern('triangle', [5], '*\n**\n***\n****\n*****', failed);
  testGeneratePattern('triangle', [4], '*\n**\n***\n****', failed);
  testGeneratePattern('triangle', [3], '*\n**\n***', failed);
  testGeneratePattern('triangle', [2], '*\n**', failed);
  testGeneratePattern('triangle', [1], '*', failed);
  testGeneratePattern('triangle', [0], '', failed);
}

function testRightAlignedTriangle(failed) {
  testGeneratePattern('right-aligned-triangle', [0], '', failed);
  testGeneratePattern('right-aligned-triangle', [1], '*', failed);
  testGeneratePattern('right-aligned-triangle', [2], ' *\n**', failed);
  testGeneratePattern('right-aligned-triangle', [3], '  *\n **\n***', failed);
  testGeneratePattern('right-aligned-triangle', [4], '   *\n  **\n ***\n****', failed);
  testGeneratePattern('right-aligned-triangle', [5], '    *\n   **\n  ***\n ****\n*****', failed);
}

function testSpacedAlternateRectangle(failed) {
  testGeneratePattern('spaced-alternating-rectangle', [0, 0], '', failed);
  testGeneratePattern('spaced-alternating-rectangle', [0, 1], '', failed);
  testGeneratePattern('spaced-alternating-rectangle', [1, 0], '', failed);
  testGeneratePattern('spaced-alternating-rectangle', [1, 1], '*', failed);
  testGeneratePattern('spaced-alternating-rectangle', [2, 1], '**', failed);
  testGeneratePattern('spaced-alternating-rectangle', [3, 1], '***', failed);
  testGeneratePattern('spaced-alternating-rectangle', [3, 1], '***', failed);
  testGeneratePattern('spaced-alternating-rectangle', [3, 3], '***\n---\n   ', failed);
  testGeneratePattern('spaced-alternating-rectangle', [1, 2], '*\n-', failed);
  testGeneratePattern('spaced-alternating-rectangle', [1, 3], '*\n-\n ', failed);
  testGeneratePattern('spaced-alternating-rectangle', [1, 5], '*\n-\n \n*\n-', failed);
  testGeneratePattern('spaced-alternating-rectangle', [2, 6], '**\n--\n  \n**\n--\n  ', failed);
}

function testDiamond(failed) {
  testGeneratePattern("diamond", [0], "", failed);
  testGeneratePattern("diamond", [1], "*", failed);
  testGeneratePattern("diamond", [2], "*", failed);
  testGeneratePattern("diamond", [3], " *\n***\n *", failed);
  testGeneratePattern("diamond", [4], " *\n***\n *", failed);
  testGeneratePattern("diamond", [5], "  *\n ***\n*****\n ***\n  *", failed);
  testGeneratePattern("diamond", [7], "   *\n  ***\n *****\n*******\n *****\n  ***\n   *", failed);
}

function testScreen(failed) {
  testGeneratePattern('filled-rectangle', [3, 3], 'hollow-rectangle', "", failed);
  // testGeneratePattern('diamond', [3], 'hollow-diamond', "  *\n", failed);
  // testGeneratePattern('diamond', [5], 'diamond', "  *\n", failed);
  // testGeneratePattern('diamond', [7], 'diamond', "  *\n", failed);
}

function testHollowDiamond(failed) {
  testGeneratePattern("hollow-diamond", [3], " *\n* *\n *", failed)
  testGeneratePattern("hollow-diamond", [5], "  *\n* *\n*   *\n* *\n  *", failed)
  testGeneratePattern("hollow-diamond", [7], "", failed);
}

function testAll() {
  const failed = [];
  testScreen(failed);
  // testFilledRectangle(failed);
  // testHollowRectangle(failed);
  // testAlternatingRectangle(failed);
  // testTriangle(failed);
  // testRightAlignedTriangle(failed);
  // testSpacedAlternateRectangle(failed);
  // testDiamond(failed);
  // testHollowDiamond(failed);
  console.table(failed);
}

testAll();