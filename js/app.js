const $ = document
const body = $.body
const saveCodeBtn = $.querySelector('.save')
const rotateBtn = $.querySelector('.rotate')
const themeMode = $.querySelector('.theme-mode')
const run = $.querySelector('.run')
const liveBtn = $.querySelector('.live-btn')
const containerSize = $.querySelector('.container-size')
const sectionCode = $.querySelector('.section-code')
const bar = $.querySelector('.section-code__bar')
const sectionCodeEditable = $.querySelector('.section-code__editable')
const containerCode = $.querySelector('.container-code')
const sectionCodeResult = $.querySelector('.section-code__result')
const iframe = $.querySelector('.iframe')

let containerCodeEditableTexts = ['<!DOCTYPE html>','<html>','<head>','<title>Page Title</title>','</head>','<body>','','<h1>This is a Heading</h1>','<p>This is a paragraph.</p>','','</body>','</html>'] 

function defaultCode(containerCodeEditableTexts){
    containerCode.innerHTML = ''
    containerCodeEditableTexts.forEach( containerCodeEditableText => containerCode.innerText += containerCodeEditableText + '\n'  )
}
defaultCode(containerCodeEditableTexts)

function saveCode(){
    containerCodeEditableTexts = containerCode.innerText.split(' <');
    localStorage.setItem('oldCodes' , JSON.stringify(containerCodeEditableTexts))
}

function rotate(){
    sectionCode.classList.toggle('section-code--horizontal')
    sectionCode.classList.contains('section-code--horizontal') ? defaultSize('100%' , 'calc(50% - .5rem)') : defaultSize('calc(50% - .5rem)' , '100%')
}

function setTheme(){
    body.classList.toggle('theme-dark')
    body.classList.contains('theme-dark') ? localStorage.setItem('theme-dark' , 'dark') : localStorage.removeItem('theme-dark')
}

function checkInput(){
    const inputCheckbox = liveBtn.querySelector('#checkbox')
    if(inputCheckbox.checked){
        inputCheckbox.checked = false
        sectionCodeEditable.removeEventListener('keyup' , runCode)
    }else{
        inputCheckbox.checked = true
        sectionCodeEditable.addEventListener('keyup' , runCode)
    }
}

function runCode(){
    console.log(1);
    const html = containerCode.innerText;
    iframe.src = "data:text/html;charset=utf-8," + encodeURI(html)
}

function defaultSize(width , height){
    sectionCodeEditable.style.width = width
    sectionCodeResult.style.width = width
    sectionCodeEditable.style.height = height
    sectionCodeResult.style.height = height
}

function resizeSectionCode(){
    sectionCode.classList.contains('section-code--horizontal') ? sectionCode.addEventListener('mousemove' , setNewHeight) : sectionCode.addEventListener('mousemove' , setNewWidth)
    containerSize.style.display = 'block'
}

function setNewHeight(event){
    bar.style.cursor = 'row-resize'
    sectionCodeEditable.style.height = ((event.pageY - bar.scrollHeight) * .1)  + 'rem'
    sectionCodeResult.style.height = 'calc('+ 100 +'% - '+ (event.pageY * .1) +'rem)'
    containerSize.innerText = 'Result Size = ' + sectionCodeEditable.scrollWidth + ' * ' + (event.pageY - bar.scrollHeight)
    console.log(sectionCodeResult.style.height)
}

function setNewWidth(event){
    sectionCodeEditable.style.width = (event.pageX - bar.scrollWidth) * .1 + 'rem'
    sectionCodeResult.style.width = 'calc('+ 100 +'% - '+ (event.pageX * .1) +'rem)'
    containerSize.innerText = 'Result Size = ' + (event.pageX - bar.scrollWidth) + ' * ' + sectionCodeEditable.scrollHeight
}

function mouseUpHandler(){
    sectionCode.classList.contains('section-code--horizontal') ? sectionCode.removeEventListener('mousemove' , setNewHeight) : sectionCode.removeEventListener('mousemove' , setNewWidth)
    setTimeout(() => containerSize.style.display = 'none' , 1000)
}

function loaded(){
    let theme = localStorage.getItem('theme-dark')
    theme ? body.classList.add('theme-dark') : null
    let oldCodes = JSON.parse(localStorage.getItem('oldCodes'))
    containerCodeEditableTexts = (oldCodes) ? oldCodes : ['<!DOCTYPE html>','<html>','<head>','<title>Page Title</title>','</head>','<body>','','<h1>This is a Heading</h1>','<p>This is a paragraph.</p>','','</body>','</html>'] 
    defaultCode(containerCodeEditableTexts)
}

saveCodeBtn.addEventListener('click' , saveCode)
rotateBtn.addEventListener('click' , rotate)
themeMode.addEventListener('click' , setTheme)
run.addEventListener('click' , runCode)
liveBtn.addEventListener('click' , checkInput)
bar.addEventListener('mousedown' , resizeSectionCode)
sectionCode.addEventListener('mouseup' , mouseUpHandler)
window.addEventListener('DOMContentLoaded' , loaded)