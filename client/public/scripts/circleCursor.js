const rootElement = getComputedStyle(document.querySelector(':root')),
      primaryColor = rootElement.getPropertyValue('--primary-color'),
      secondaryColor = rootElement.getPropertyValue('--secondary-color')

let mousePosX = 0,
    mousePosY = 0,
    mouseCircle = document.getElementById('cursorCircle')

document.addEventListener('popstate', (e) => {
    mouseCircle = document.getElementById('cursorCirle')
})

document.onmousemove = (e) => {

    mouseCircle = document.getElementById('cursorCircle')

    elementMouseIsOver = document.elementFromPoint(e.pageX, e.pageY)

    if (elementMouseIsOver.classList.contains('circleHover')) {
        mouseCircle.style.transform = 'translate(-50%, -50%) scale(1.8)'
        mouseCircle.style.borderColor = secondaryColor
    }
    else {
        mouseCircle.style.transform = 'translate(-50%, -50%) scale(1)'
        mouseCircle.style.borderColor = primaryColor
    }

    mousePosX = e.pageX
    mousePosY = e.pageY
}

let delay = 6,
    revisedMousePosX = 0,
    revisedMousePosY = 0

function delayMouseFollow() {

    requestAnimationFrame(delayMouseFollow);

    revisedMousePosX += (mousePosX - revisedMousePosX) / delay
    revisedMousePosY += (mousePosY - revisedMousePosY) / delay

    mouseCircle.style.top = revisedMousePosY + 'px'
    mouseCircle.style.left = revisedMousePosX + 'px'
}

delayMouseFollow()