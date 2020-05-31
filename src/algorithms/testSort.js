export const testSort = (unsorted, output) => {
  const expected = [...unsorted].map(Number).sort((a,b) => a-b);
  let equal = true;
  equal = JSON.stringify(expected) === JSON.stringify(output);
  console.log(`expected: ${expected}`);
  console.log(`bubble: ${output}`);
  console.log(`Equal: ${equal}`);
}
