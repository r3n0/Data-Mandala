let serial;
let latestData = 'waiting for data';

let timestamp;

let tabla;

const columnas = ['timeStamp', 'humedad', 'temperatura', 'sonido'];

function setup() {
	createCanvas(windowWidth, windowHeight);

	tabla = new p5.Table();
	for (let i = 0; i < columnas.length; i++) {
		tabla.addColumn(columnas[i]);
	}

	serial = new p5.SerialPort();

	serial.list();
	serial.open('/dev/tty.usbmodem83301');

	serial.on('connected', serverConnected);

	serial.on('list', gotList);

	serial.on('data', gotData);

	serial.on('error', gotError);

	serial.on('open', gotOpen);

	serial.on('close', gotClose);
}

function serverConnected() {
	print('Connected to Server');
}

function gotList(thelist) {
	print('List of Serial Ports:');

	for (let i = 0; i < thelist.length; i++) {
		print(i + ' ' + thelist[i]);
	}
}

function gotOpen() {
	print('Serial Port is Open');
}

function gotClose() {
	print('Serial Port is Closed');
	latestData = 'Serial Port is Closed';
}

function gotError(theerror) {
	print(theerror);
}

function gotData() {
	let currentString = serial.readLine();
	trim(currentString);
	if (!currentString) return;
	console.log(currentString);
	latestData = currentString;

	timestamp =
		day().toString().padStart(2, '0') +
		'/' +
		month().toString().padStart(2, '0') +
		'/' +
		year().toString().padStart(2, '0') +
		' ' +
		hour().toString().padStart(2, '0') +
		':' +
		minute().toString().padStart(2, '0') +
		':' +
		second().toString().padStart(2, '0');

	// print(timestamp);

	const inputNumbers = currentString.split(',');
	const soudMaped = Math.abs(int(map(inputNumbers[2], 300, 600, 0, 100)));
	inputNumbers[2] = soudMaped;
	// print(inputNumbers[2]);

	let newRow = tabla.addRow();
	newRow.setString(columnas[0], timestamp);

	for (let i = 0; i < inputNumbers.length; i++) {
		newRow.setNum(columnas[i + 1], inputNumbers[i]);
	}
	// print(newRow);
}

function draw() {
	background(255, 255, 255);
	fill(0, 0, 0);
	text(latestData, 10, 10);
	// Polling method
	/*
 if (serial.available() > 0) {
  let data = serial.read();
  ellipse(50,50,data,data);
 }
 */
}

function keyPressed() {
	if ((key = 's')) {
		saveTable(tabla, `HTS - ${timestamp}.csv`);
	}
}
