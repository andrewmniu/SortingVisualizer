// export const bubbleSort = (arr) => {
//   for(let i=0; i < arr.length; i++){
//     for(let j=0; j < arr.length-i; j++){
//       if(arr[j] > arr[j+1]){
//         const temp = arr[j];
//         arr[j] = arr[j+1];
//         arr[j+1] = temp;
//       }
//     }
//   }
//   return arr;
// }

const bubbleSortAnimation = (arr) => {
  const animations = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      animations.push([j, j + 1]);
      let swap = arr[j] > arr[j + 1];
      animations.push(swap);
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
  console.log(animations.length)
  for (let i = 0; i < animations.length; i++) {
    const [first, second] = animations[i];
    setTimeout(() => {
      bars[first].style.backgroundColor = colors.compare;
      bars[second].style.backgroundColor = colors.compare;
    }, speed * (i / 3));
    i++;
    setTimeout(() => {
      if (animations[i]) {
        bars[first].style.backgroundColor = colors.swap;
        bars[second].style.backgroundColor = colors.swap;
        const tempHeight = bars[first].style.height;
        bars[first].style.height = bars[second].style.height;
        bars[second].style.height = tempHeight;
      }
    }, speed * (i / 3));
    setTimeout(() => {
      bars[first].style.backgroundColor = colors.unsorted;
      bars[second].style.backgroundColor = colors.unsorted;
    }, speed * ((i + 1) / 3));
  }
  return Math.round(speed * animations.length/3);
}
