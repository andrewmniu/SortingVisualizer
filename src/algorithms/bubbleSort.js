// Creates an array of indices that are being compared/swapped during sorting
const bubbleSortAnimation = (arr) => {
  const animations = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      animations.push([j, j + 1]); // two adjacent values being compared
      let swap = arr[j] > arr[j + 1];
      animations.push(swap); // whether the two values are out of order
      if (swap) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  console.log(animations.length);
  return animations;
};

export const bubbleSort = (arr, speed, bars, colors) => {
  const animations = bubbleSortAnimation(arr);
  let frame = 0; // animation frame
  for (let i = 0; i < animations.length; i++) {
    const [first, second] = animations[i];
    // highlight two bars being compared
    setTimeout(() => {
      bars[first].style.backgroundColor = colors.compare;
      bars[second].style.backgroundColor = colors.compare;
    }, speed * frame);
    frame++;
    i++;
    // indicate if they need to be swapped and swap them
    setTimeout(() => {
      if (animations[i]) {
        bars[first].style.backgroundColor = colors.swap;
        bars[second].style.backgroundColor = colors.swap;
        const tempHeight = bars[first].style.height;
        bars[first].style.height = bars[second].style.height;
        bars[second].style.height = tempHeight;
      }
    }, speed * frame);
    frame++;
    // return back to normal color
    setTimeout(() => {
      bars[first].style.backgroundColor = colors.unsorted;
      bars[second].style.backgroundColor = colors.unsorted;
    }, speed * frame);
    frame++;
  }
  return Math.round(speed * frame); // end time of sorting animation
}
