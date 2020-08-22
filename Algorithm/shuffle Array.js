
// Fisher-Yates (aka Knuth) Shuffle
function shuffle(array) {
  let currentIndex = array.length
  while(currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    let temp = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temp
  }
  return array
}
            

// Durstenfeld shuffle, an optimized version of Fisher-Yates
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1)) {
      let temp = array[i]
      array[i] = array[randomIndex]
      array[randomIndex] = temp
    }
  }
  return array
}

// ES6 
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)) {
      [array[i], array[j]] =[array[j], array[i]]
    }
  }
  return array
}
