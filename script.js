let time = 5
let timeInterval
let currentColor
let currentDiffColor
let gameStarted
let numOfCell = 4
let allColors = {
  'Red colors': ['lightsalmon', 'salmon', 'darksalmon', 'lightcoral', 'indianred', 'crimson', 'firebrick', 'red', 'darkred'],
  'Orange colors': ['coral', 'tomato', 'orangered', 'gold', 'orange', 'darkorange'],
  'Yellow colors': ['lightyellow', 'lemonchiffon', 'lightgoldenrodyellow', 'papayawhip', 'moccasin', 'peachpuff', 'palegoldenrod', 'khaki', 'darkkhaki', 'yellow'],
  'Green colors': ['lawngreen', 'chartreuse', 'limegreen', 'lime', 'forestgreen', 'green', 'darkgreen', 'greenyellow', 'yellowgreen', 'springgreen', 'mediumspringgreen', 'lightgreen', 'palegreen', 'darkseagreen', 'mediumseagreen', 'seagreen', 'olive', 'darkolivegreen', 'olivedrab'],
  'Cyan colors': ['lightcyan', 'cyan', 'aqua', 'aquamarine', 'mediumaquamarine', 'paleturquoise', 'turquoise', 'mediumturquoise', 'darkturquoise', 'lightseagreen', 'cadetblue', 'darkcyan', 'teal'],
  'Blue colors': ['powderblue', 'lightblue', 'lightskyblue', 'skyblue', 'deepskyblue', 'lightsteelblue', 'dodgerblue', 'cornflowerblue', 'steelblue', 'royalblue', 'blue', 'mediumblue', 'darkblue', 'navy', 'midnightblue', 'mediumslateblue', 'slateblue', 'darkslateblue'],
  'Purple colors': ['lavender', 'thistle', 'plum', 'violet', 'orchid', 'fuchsia', 'magenta', 'mediumorchid', 'mediumpurple', 'blueviolet', 'darkviolet', 'darkorchid', 'darkmagenta', 'purple', 'indigo'],
  'Pink colors': ['pink', 'lightpink', 'hotpink', 'deeppink', 'palevioletred', 'mediumvioletred'],
  'White colors': ['snow', 'honeydew', 'mintcream', 'azure', 'aliceblue', 'ghostwhite', 'whitesmoke', 'seashell', 'beige', 'oldlace', 'floralwhite', 'ivory', 'antiquewhite', 'linen', 'lavenderblush', 'mistyrose'],
  'Gray colors': ['gainsboro', 'lightgray', 'silver', 'darkgray', 'gray', 'dimgray', 'lightslategray', 'slategray', 'darkslategray', 'black'],
  'Brown colors': ['cornsilk', 'blanchedalmond', 'bisque', 'navajowhite', 'wheat', 'burlywood', 'tan', 'rosybrown', 'sandybrown', 'goldenrod', 'peru', 'chocolate', 'saddlebrown', 'sienna', 'brown', 'maroon'],
}
let wrapWidth = 400
let level = 1
$('document').ready(function () {
  initCells()
  $('#time').html(time)
  $('#wrap-cell').hide()
  $('#game-over-panel').hide()
  $('#btn-start-game').click(function () {
    startGame()
    $('#btn-start-game').hide(100)
    gameStarted = true
  })
  // $('.cell').click(onClickedCell)
})

function startGame () {
  time = 5
  level = 1
  $('#time').html(time)
  $('#level').html(level)
  initCells()
  $('#wrap-cell').show(100)
  $('#game-over-panel').hide()
  timeInterval = setInterval(function () {
    time -= 1
    $('#time').html(time)
    if (time <= 0) {
      time = 0
      $('#time').html(time)
      clearInterval(timeInterval)
      $('#btn-start-game').show(100)
      gameStarted = false
      $('#game-over-panel').show(100)
    }
  }, 1000)
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

var randomProperty = function (obj) {
  var keys = Object.keys(obj);
  return obj[keys[ keys.length * Math.random() << 0]];
};

function onClickedCell (e) {
  if (gameStarted && e && e.target && e.target.style.backgroundColor === currentDiffColor) {      
    time += 1.5
    level++
    $('#time').html(time)
    $('#level').html(level)
    initCells()
  }
}

function initCells () {
  let colorGroup = randomProperty(allColors)

  let cellPerRow = parseInt(level / 5) + 2
  numOfCell = cellPerRow * cellPerRow
  currentColor = getRandomColor(colorGroup)
  currentDiffColor = getRandomColor(colorGroup)
  while (currentDiffColor === currentColor) {
    currentDiffColor = getRandomColor(colorGroup)
  }

  let randomAnswerIdx = getRndInteger(0, numOfCell - 1)
  let htmlText = ''
  for (let i = 0; i < numOfCell; i++) {
    htmlText += `<div class="cell" style="width: ${(wrapWidth/cellPerRow) - 2}px;height: ${(wrapWidth/cellPerRow) - 2}px;background-color: ${i === randomAnswerIdx ? currentDiffColor : currentColor}"></div>`
  }
  $('#wrap-cell').html(htmlText)
  $('.cell').click(onClickedCell)
}

function getRandomColor (arrayColor = []) {
  return arrayColor[Math.floor(Math.random() * arrayColor.length)];
}