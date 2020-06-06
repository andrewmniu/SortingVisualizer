export function quickSort(arr, speed, bars, colors){
  const animations = [];
  const sorted = quickSortAnimation(arr, 0, arr.length - 1, animations);
  let frame = 0; // animation frame
  for (let i = 0; i < animations.length; i++) {
    const [first, second] = animations[i].slice(1);
    switch (animations[i][0]) {
      // highlights pivot
      case "pivot":
        setTimeout(() => {
          bars[first].style.backgroundColor = "#000";
        }, speed * frame);
        break;
      // highlights bar being compared to pivot
      case "compare":
        setTimeout(() => {
          bars[first].style.backgroundColor = colors.compare;
        }, speed * frame);
        frame++;
        setTimeout(() => {
          bars[first].style.backgroundColor = colors.unsorted;
        }, speed * frame);
        break;
      // moves bars into correct partition and swaps pivot with correct index
      case "swap":
        setTimeout(() => {
          bars[first].style.backgroundColor = colors.swap;
          bars[second].style.backgroundColor = colors.swap;
        }, speed * frame);
        frame++;
        setTimeout(() => {
          const tempHeight = bars[first].style.height;
          bars[first].style.height = bars[second].style.height;
          bars[second].style.height = tempHeight;
        }, speed * frame);
        frame++;
        setTimeout(() => {
          bars[first].style.backgroundColor = colors.unsorted;
          bars[second].style.backgroundColor = colors.unsorted;
        }, speed * frame);
        break;
      default:
        console.log("error");
        break;
    }
    frame++;
  }
  return [Math.round(speed * frame), sorted]; // end time of sorting animation
};

// Creates an array of indices that are being compared/swapped during sorting
// This is standard quick sort but it also passes in the animations array
function quickSortAnimation(arr, low, high, animations) {
  if (low < high) {
    let p = partition(arr, low, high, animations);

    quickSortAnimation(arr, low, p - 1, animations);
    quickSortAnimation(arr, p + 1, high, animations);
  }
  return arr;
}

// partitions array around pivot
function partition(arr, low, high, animations) {
  const pivot = arr[high];
  animations.push(["pivot", high]); // pivot index
  let i = low; // low +_# of elements lower than pivot
  for (let j = low; j < high; j++) {
    animations.push(["compare", j]); // highlight element being compared to pivot
    if (arr[j] < pivot) {
      animations.push(["swap", i, j]); // move element into correct partition
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      i++;
    }
  }
  animations.push(["swap", i, high]); // place pivot element in correct index
  arr[high] = arr[i];
  arr[i] = pivot;
  return i;
}
