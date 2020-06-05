export function heapSort(arr, speed, bars, colors) {
  const animations = [];
  heapSortAnimation(arr, animations);
  let frame = 0; // animation frame
  for (let i = 0; i < animations.length; i++) {
    const [first, second] = animations[i].slice(1);
    switch (animations[i][0]) {
      // highlights the two bars being compared
      case "compare":
        setTimeout(() => {
          bars[first].style.backgroundColor = colors.compare;
          bars[second].style.backgroundColor = colors.compare;
        }, speed * frame);
        frame++;
        break;
      // moves largest node to the root of subtree
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
        break;
      // pops max element and percolates last element down
      case "pop":
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
  return Math.round(speed * frame); // end time of sorting animation
}

// Creates an array of indices that are being compared/swapped during sorting
// This is standard heap sort but it also passes in the animations array
function heapSortAnimation(arr, animations) {
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr, arr.length, i, animations);
  }

  for (let i = arr.length - 1; i > 0; i--) {
    animations.push(["pop", 0, i]); // max element moving to the back of array
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    heapify(arr, i, 0, animations);
  }
}

// generates max heap
function heapify(arr, n, i, animations) {
  let largest = i;
  const l = 2 * i + 1;
  const r = 2 * i + 2;
  if (l < n) {
    animations.push(["compare", largest, l]); // shows comparison
    if (arr[l] > arr[largest]) {
      largest = l;
    }
  }
  if (r < n) {
    animations.push(["compare", largest, r]); // shows comparison
    if (arr[r] > arr[largest]) {
      largest = r;
    }
  }

  if (largest !== i) {
    animations.push(["swap", i, largest]); // reordering
    const temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp;

    heapify(arr, n, largest, animations);
  }
}
