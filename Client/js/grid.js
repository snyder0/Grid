let plot = []
  
let can = document.getElementById("canvas")
let ctx = can.getContext('2d')
let dragging = false
let lastX = 0
let lastY = 0
let translated = 0

let grid = (function(dX, dY){
	let can = document.createElement("canvas")
	let ctx = can.getContext('2d')
	can.width = dX
	can.height = dY

	// fill canvas color
	ctx.fillStyle = '#ffffff'
	ctx.fillRect(0, 0, dX, dY)

	// x axis
	ctx.strokeStyle = '#000000'
	ctx.moveTo(.5, 0.5)
	ctx.lineTo(dX + .5, 0.5)
	ctx.stroke()

	// y axis
	ctx.moveTo(.5, .5)
	ctx.lineTo(.5, dY + .5)
	ctx.stroke()

	return ctx.createPattern(can, 'repeat')
})(50, 100) // Size of cells

ctx.scale(1, -1)
ctx.translate(0, -1000) // Translate h of grid

can.onmousedown = function (e) {
	let evt = e || event
	dragging = true
	lastX = evt.offsetX
	lastY = 1000 - evt.offsetY
}

window.onmousemove = function (e) {
	let evt = e || event
	if (dragging) {
		let delta = evt.offsetX - lastX
		let posX = Math.ceil(lastX / 50) * 50 - 50
		let posY = Math.ceil(lastY / 100) * 100 - 100
		plot.push({ x: posX, y: posY })
		translated += delta
		//ctx.translate(delta, 0)
		lastX = evt.offsetX
		draw()
	}
}

window.onmouseup = function () {
	dragging = false
}

function draw() {
	ctx.clearRect(-translated, 0, 2000, 1000)
	ctx.rect(-translated, 0, 2000, 1000)
	ctx.fillStyle = grid
	ctx.fill()
	ctx.fillStyle = "#000000";
	for (let i = 0; i < plot.length; i++) {
		ctx.beginPath()
		ctx.rect(plot[i].x, plot[i].y, 50, 100)
		ctx.fill()
	}
}

draw()