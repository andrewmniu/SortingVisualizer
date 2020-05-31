const insertionSortAnimations = (arr) => {
  const animations = [];
  for (let i = 1; i < arr.length; i++){
    const next = arr[i];
    let j = i - 1;
    animations.push([i]);
    while(j >= 0 && next < arr[j]){
      arr[j+1] = arr[j];
      animations.push([j, j+1])
      j--;
    }
    arr[j+1] = next;
  }
  console.log(animations.length);
  return animations;
}

export const insertionSort = (arr, SPEED, bars, colors) => {
  const animations = insertionSortAnimations(arr);
  let frame = 0;
  for (let i = 0; i < animations.length; i++){
    if(animations[i].length == 1){
      setTimeout(() =>{
        bars[animations[i]].style.backgroundColor = colors.compare;
      }, SPEED * frame);
      if(i+1 >= animations.length || animations[i+1].length == 1){
        frame++;
        setTimeout(() =>{
          bars[animations[i]].style.backgroundColor = colors.unsorted;
        }, SPEED * frame);
      }
    }
    else {
      const [first, second] = animations[i];
      setTimeout(() => {
        bars[first].style.backgroundColor = colors.swap;
        bars[second].style.backgroundColor = colors.swap;
      }, SPEED * frame)
      frame ++;
      setTimeout(() => {
        const tempHeight = bars[first].style.height;
        bars[first].style.height = bars[second].style.height;
        bars[second].style.height = tempHeight;
      }, SPEED * frame)
      frame ++;
      setTimeout(() => {
        bars[first].style.backgroundColor = colors.unsorted;
        bars[second].style.backgroundColor = colors.unsorted;
      }, SPEED * frame)
    }
    frame++
  }
  return SPEED * frame;
}
