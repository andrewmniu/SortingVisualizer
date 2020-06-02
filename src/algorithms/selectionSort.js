const selectionSortAnimation = (arr) => {
  const animations = [];
  for (let i = 0; i < arr.length - 1; i++) {
    animations.push(["next", i]);
    let min_idx = i;
    for (let j = i + 1; j < arr.length; j++) {
      animations.push(["search", j]);
      if (arr[j] < arr[min_idx]) {
        min_idx = j;
      }
    }

    const temp = arr[min_idx];
    arr[min_idx] = arr[i];
    arr[i] = temp;
    animations.push(["swap", i, min_idx]);
  }
  console.log(animations.length);
  return animations;
};

export const selectionSort = (arr, speed, bars, colors) => {
  const animations = selectionSortAnimation(arr);
  let frame = 0;
  for (let i = 0; i < animations.length; i++) {
    switch (animations[i][0]) {
      case "next":
        setTimeout(() => {
          bars[animations[i][1]].style.backgroundColor = colors.compare;
        }, speed * frame);
        break;
      case "search":
        setTimeout(() => {
          bars[animations[i][1]].style.backgroundColor = colors.compare;
        }, speed * frame);
        frame++;
        setTimeout(() => {
          bars[animations[i][1]].style.backgroundColor = colors.unsorted;
        }, speed * frame);
        break;
      case "swap":
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
  return speed * frame;
};
