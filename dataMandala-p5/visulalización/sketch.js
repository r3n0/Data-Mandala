let data;
let columnas;
let h_path = [];
let t_path = [];
let s_path = [];

const madalaBase = 7;
const diametro = 400;
const radio = diametro / 2;

function preload() {
	data = loadTable('./data.csv', 'csv', 'header');
}

function setup() {
	createCanvas(800, 800, SVG);
	angleMode(DEGREES);
	print(data);
}

function draw() {
	noFill();
	createPath();

	stroke(100);
	drawPaths(h_path, madalaBase);
	stroke(180);
	drawPaths(t_path, madalaBase * 2);
	stroke(210);
	drawPaths(s_path, madalaBase * 2);

	saveSVG();
	noLoop();
}

function createPath() {
	let velocidad = p5.Vector.random2D();

	for (let j = 1; j < data.columns.length; j++) {
		let posicion = p5.Vector.random2D();
		posicion.setMag(random(radio));
		velocidad.setMag(random(2, 15));

		for (let i = 1; i < data.rows.length; i++) {
			const v = data.rows[i].obj[data.columns[j]];
			let valor = v ? int(v) : 0;

			const maxAngle = 10;
			let angle;

			if (j == 1) {
				angle = map(valor, 57, 63, -maxAngle, maxAngle);
			} else if (j == 2) {
				angle = map(valor, 27, 29, -maxAngle, maxAngle);
			} else if (j == 3) {
				angle = map(valor, 10, 223, -maxAngle, maxAngle);
			}

			velocidad.rotate(angle);
			posicion.add(velocidad);

			if (j == 1) {
				h_path.push(createVector(posicion.x, posicion.y));
			} else if (j == 2) {
				t_path.push(createVector(posicion.x, posicion.y));
			} else if (j == 3) {
				s_path.push(createVector(posicion.x, posicion.y));
			}
		}
	}
}

function drawPaths(pathList, divisiones) {
	push();

	translate(width / 2, height / 2);
	let angle = 360 / divisiones;
	for (let k = 0; k < 2; k++) {
		for (let j = 0; j < divisiones; j++) {
			rotate(angle);
			beginShape();
			for (let i = 0; i < pathList.length; i++) {
				vertex(pathList[i].x, pathList[i].y);
			}
			endShape();
		}
		scale(1, -1);
	}
	pop();
}

function saveSVG() {
	save(`datamandala.svg`);
}
