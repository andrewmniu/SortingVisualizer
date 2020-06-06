export function mergeSort(arr, speed, bars, colors) {
  const animations = [];
  const sorted = mergeSortAnimation(arr, 0, arr.length - 1, animations);
  let frame = 0; // animation frame
  for (let i = 0; i < animations.length; i++) {
    const [first, second] = animations[i].slice(1);
    switch (animations[i][0]) {
      // highlights the two bars being compared
      case "next":
        setTimeout(() => {
          bars[first].style.backgroundColor = colors.compare;
          bars[second].style.backgroundColor = colors.compare;
        }, speed * frame);
        frame++;
        break;
      case "move":
        // moves the smallest of the two compared to kth index
        if (first < second) { // checks if first is smaller than second due to shifting
          setTimeout(() => {
            bars[first].style.backgroundColor = colors.swap;
            bars[second].style.backgroundColor = colors.swap;
          }, speed * frame);
          frame++;
          setTimeout(() => {
            const tempHeight = bars[first].style.height;
            bars[first].style.height = bars[second].style.height;
            // this shifts all the bars in between one to the right
            for (let j = second; j > first + 1; j--) {
              bars[j].style.height = bars[j - 1].style.height;
            }
            bars[first + 1].style.height = tempHeight;
          }, speed * frame);
        }
        break;
      default:
        console.log("error");
        break;
    }
    setTimeout(() => {
      bars[first].style.backgroundColor = colors.unsorted;
      bars[second].style.backgroundColor = colors.unsorted;
    }, speed * frame);
    frame++;
  }
  return [Math.round(speed * frame), sorted]; // end time of sorting animation
}

// Creates an array of indices that are being compared/swapped during sorting
// This is standard merge sort but it also passes in the animations array
function mergeSortAnimation(arr, l, r, animations) {
  if (l < r) {
    const m = Math.floor((l + r) / 2);

    mergeSortAnimation(arr, l, m, animations);
    mergeSortAnimation(arr, m + 1, r, animations);

    merge(arr, l, m, r, animations);
  }
  return arr;
}

// helper merge function
function merge(arr, l, m, r, animations) {
  const L = arr.slice(l, m + 1);
  const R = arr.slice(m + 1, r + 1);

  let i = 0;
  let j = 0;
  let k = l;

  let shift = 0; // accounts for left array shifting when merging
  while (i < L.length && j < R.length) {
    animations.push(["next", l + i + shift, m + 1 + j]); // two values being compared
    if (L[i] < R[j]) {
      arr[k] = L[i];
      animations.push(["move", k, l + i]); // move smaller value to current index\
      i++;
    } else {
      arr[k] = R[j];
      animations.push(["move", k, m + 1 + j]);
      shift ++;
      j++;
    }
    k++;
  }

  // add remaining elements
  while (i < L.length) {
    arr[k] = L[i];
    i++;
    k++;
  }
  while (j < R.length) {
    arr[k] = R[j];
    j++;
    k++;
  }
}
