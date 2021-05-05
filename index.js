'use strict';

const data = {
  input: '0',
  isPoint: false,
  isEqual: false
}

window.onload = init

function init() {
  // console.log(document.body)
    document.body.addEventListener('keydown', function(e) {
    // console.log(e)
    let keyValue = e.key
    const nums = [0,1,2,3,4,5,6,7,8,9]
    const operators = ['+', '-', '/', '*']

    let num = parseInt(keyValue)
    if (nums.includes(num)) inputNums(num)
    if (keyValue === 'Backspace') backspace()
    if (keyValue === '.') inputPoint()
    if (keyValue === 'Enter') inputEnter()
    if (operators.includes(keyValue)) inputOperator(keyValue)
  })
}
const eShowInput = document.getElementById('showInput')
const eShowResult = document.getElementById('showResult')

// 输入数字
function inputNums(num) {
  data.input += num

  if (data.input.length > 1 && data.input[0] === '0'){
    data.input = data.input.slice(1)
  }
  if (data.input[0]==='.') data.input = '0' + data.input

  if (data.isEqual) {
    data.input = '' + num
    data.isEqual = false
  }

  eShowInput.textContent = data.input
  computed()
  iBoundary()
}
// 退格处理
function backspace() {
  if (data.input === '0') return
  data.input = data.input.slice(0, -1)

  if (data.input.length === 0) {
    data.input = '0'
  }
  if (!data.input.includes('.')) data.isPoint = false
  eShowInput.textContent = data.input
  computed()
}
// 处理小数点
function inputPoint() {
  if (data.isPoint) return

  // if (/['+\-\*\/']/g.test(data.input))

  if (data.input[data.input.length - 1].match(/['+\-\*\/']/g)) {
    data.input = data.input + '0.'
  } else {
    data.input = data.input + '.'
  }

  eShowInput.textContent = data.input
  data.isPoint = true
}
// 处理输入的操作符
function inputOperator(oper) {
  // if (data.input[data.inp])
  let length = data.input.length
  if (isNaN(data.input[length - 1])) return
  eShowResult.textContent = ''
  data.isPoint = false
  data.isEqual = false
  // if (oper === '*') oper = 'x'
  // if (oper === '/') oper = '÷'
  // console.log(oper);
  // let eOper = ` <span class='theme-green'>${oper}</span>`
  data.input = data.input + oper
  eShowInput.textContent = data.input
  iBoundary()
}
function inputEnter() {
  // console.log('enter');8485
  if (!isNaN(data.input)) return
  data.isEqual = true
  data.input = eShowResult.textContent
  eShowInput.textContent = data.input
  eShowResult.textContent = ''
}
function computed() {
  let length = data.input.length
  if (isNaN(data.input) && !isNaN(data.input[length - 1])) {
    // data.input.replace(/['+\-\*\/']/g,)
    if (/['+\-']/g.test(data.input)) {
      let result = data.input.replace(/['+\-']/g, match => '*10' + match)+'*10'
      eShowResult.textContent = eval(`(${result})/10`)
    } else {
      eShowResult.textContent = eval(data.input)
    }
  } else {
    eShowResult.textContent = ''
  }
}
// 处理输入边界
function iBoundary () {
  // eShowInput.offsetWidth
  let width = eShowInput.offsetWidth;
  let scrollWidth = eShowInput.scrollWidth

  if (scrollWidth > width) {
    eShowInput.scrollTo(eShowInput.scrollWidth, 0)
  }
}
// 清空
function clearAll() {
  data.input = ''
  data.isEqual = false
  data.isPoint = false
  eShowInput.textContent = '0'
  eShowResult.textContent = ''
}