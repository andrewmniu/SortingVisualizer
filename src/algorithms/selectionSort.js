// Creates an array of indices that are being compared/swapped during sorting
const selectionSortAnimation = (arr) => {
  const animations = [];
  for (let i = 0; i < arr.length - 1; i++) {
    animations.push(["next", i]); // next position to select min value
    let min_idx = i;
    for (let j = i + 1; j < arr.length; j++) {
      animations.push(["search", j]); // searching for ith smallest value
      if (arr[j] < arr[min_idx]) {
        min_idx = j;
      }
    }

    animations.push(["swap", i, min_idx]); // swap ith position with ith smallest value
    const temp = arr[min_idx];
    arr[min_idx] = arr[i];
    arr[i] = temp;
  }
  console.log(animations.length);
  return animations;
};

export const selectionSort = (arr, speed, bars, colors) => {
  const animations = selectionSortAnimation(arr);
  let frame = 0; // animation frame
  for (let i = 0; i < animations.length; i++) {
    switch (animations[i][0]) {
      case "next":
      // highlights ith position
        setTimeout(() => {
          bars[animations[i][1]].style.backgroundColor = colors.compare;
        }, speed * frame);
        break;
      case "search":
      // animation to search for ith smallest value in rest of array
        setTimeout(() => {
          bars[animations[i][1]].style.backgroundColor = colors.compare;
        }, speed * frame);
        frame++;
        setTimeout(() => {
          bars[animations[i][1]].style.backgroundColor = colors.unsorted;
        }, speed * frame);
        break;
      case "swap":
      // swaps ith position for ith smallest value
        const [first, second] = animations[i].slice(1);
        setTimeout(() => {
          bars[first].style.backgroundColor = colors.swap;
          bars[second].style.backgroundColor = colors.swap;
        }, speed * frame)
        frame ++;
        setTimeout(() => {
          const tempHeight = bars[first].style.height;
          bars[first].style.height = bars[second].style.height;
          bars[second].style.height = tempHeight;
        }, speed * frame)
        frame ++;
        setTimeout(() => {
          bars[first].style.backgroundColor = colors.unsorted;
          bars[second].style.backgroundColor = colors.unsorted;
        }, speed * frame)
        break;
      default:
        console.log("error")
        break;
    }
    frame++;
  }
  return Math.round(speed * frame); // end time of sorting animation
};
