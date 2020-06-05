export function insertionSort(arr, speed, bars, colors) {
  const animations = insertionSortAnimation(arr);
  let frame = 0; // animation frame
  for (let i = 0; i < animations.length; i++) {
    // highlights next bar to be inserted
    if (animations[i].length === 1) {
      setTimeout(() => {
        bars[animations[i]].style.backgroundColor = colors.compare;
      }, speed * frame);
      // returns bar to normal color if it is already in the right spot
      if (i + 1 >= animations.length || animations[i + 1].length === 1) {
        frame++;
        setTimeout(() => {
          bars[animations[i]].style.backgroundColor = colors.unsorted;
        }, speed * frame);
      }
    } else {
      const [first, second] = animations[i];
      // highlights comparisons for insert
      setTimeout(() => {
        bars[first].style.backgroundColor = colors.swap;
        bars[second].style.backgroundColor = colors.swap;
      }, speed * frame);
      frame++;
      // switches values
      setTimeout(() => {
        const tempHeight = bars[first].style.height;
        bars[first].style.height = bars[second].style.height;
        bars[second].style.height = tempHeight;
      }, speed * frame);
      frame++;
      // returns bars to normal colors
      setTimeout(() => {
        bars[first].style.backgroundColor = colors.unsorted;
        bars[second].style.backgroundColor = colors.unsorted;
      }, speed * frame);
    }
    frame++;
  }
  return Math.round(speed * frame); // end time of sorting animation
}

// Creates an array of indices that are being compared/swapped during sorting
function insertionSortAnimation(arr) {
  const animations = [];
  for (let i = 1; i < arr.length; i++) {
    const next = arr[i];
    let j = i - 1;
    animations.push([i]); // next value being inserted
    while (j >= 0 && next < arr[j]) {
      arr[j + 1] = arr[j];
      animations.push([j, j + 1]); // comparisons to insert at right spot
      j--;
    }
    arr[j + 1] = next;
  }
  return animations;
}
