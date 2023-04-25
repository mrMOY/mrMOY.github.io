function setup() {
  createCanvas(windowWidth, windowHeight)
  circulo1x = width / 4;
  circulo2x = width / 2;
  circulo3x = (width / 4) * 3;
  circuloY = height / 2;
  r = 150;
}

function draw() {

  background("rgb(101, 137, 225)");
  stroke("rgb(167, 44, 123)");
  strokeWeight(3);

  circuloPM(circulo1x, circuloY, r);
  circuloPM(circulo2x, circuloY, r);
  circuloPM(circulo3x, circuloY, r);

  nLineas = parseInt(prompt("En cuantas partes se va a dividir la pizza? "));
  angulo = 2 * PI / nLineas;

  // circulo dda
  for (let i = 0; i < nLineas; i++) {
    let xLinea = circulo2x + r * cos(i * angulo);
    let yLinea = circuloY + r * sin(i * angulo);
    DDA(circulo2x, circuloY, xLinea, yLinea);
  }
  // circulo bresenham
  for (let i = 0; i < nLineas; i++) {
    let xLinea = circulo3x + r * cos(i * angulo);
    let yLinea = circuloY + r * sin(i * angulo);
    bresenham(circulo3x, circuloY, xLinea, yLinea);
  }
  //circulo pm
  for (let i = 0; i < nLineas; i++) {
      let xLinea = circulo1x + r * cos(i * angulo);
      let yLinea = circuloY + r * sin(i * angulo);
      lineacirculoPM(circulo1x, circuloY, xLinea, yLinea);
  }
  
  textSize(40);
  textAlign(CENTER, TOP);
  stroke("rgb(255, 0, 0)");
  fill("rgb(0, 255, 216 )");
  text("Funcion DDA", circulo1x, circuloY - r - 70);
  text("Funcion Bresenham", circulo2x, circuloY - r - 70);
  text("Funcion Punto Medio", circulo3x, circuloY - r - 70);
  text("Numero de partes: "+ nLineas  , width / 2, circuloY - r - 170);
  


  noLoop()
}




function circuloPM(x, y, radio){
  let xTemp = 0
  let yTemp = radio
  let d = 1 - radio

  while (xTemp <= yTemp) {
      point(x + xTemp, y + yTemp)
      point(x + yTemp, y + xTemp)
      point(x - xTemp, y + yTemp)
      point(x - yTemp, y + xTemp)
      point(x + xTemp, y - yTemp)
      point(x + yTemp, y - xTemp)
      point(x - xTemp, y - yTemp)
      point(x - yTemp, y - xTemp)
      
      if (d < 0) {
          d += 2 * xTemp + 3
      } else {
          d += 2 * (xTemp - yTemp) + 5
          yTemp--
      }
      xTemp++
  }
}

function lineacirculoPM(x1,y1, x2,y2) {
  aumentoX = 0

  if (x1 > x2)
      aumentoX = -1
  else if(x1 < x2)
      aumentoX = 1
  
  if (x1 === x2) {
      x = x1

      if (y1 > y2) {
          aumentoY = -1
      }
      else{
          aumentoY = 1
      }

      if(aumentoY == 1) {
          for (var y = y1; y < y2; y += aumentoY) {
              point(x, y)
          }
      }
      else {
          for (var y = y1; y > y2; y += aumentoY) {
              point(x, y)
          }
      }
      
  }
  else {
      m = (y2 - y1) / (x2 - x1)
      b = y1 - (m * x1)
      if(aumentoX == 1){
          for (var x = x1; x < x2; x += aumentoX) {
              y = (m * x) + b
              point(x,y)
          }
      }
      else{
          for (var x = x1; x > x2; x += aumentoX) {
              y = (m * x) + b
              point(x,y)
          }
      }
  }
}

function DDA(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let pasos = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
  let aumentoX = dx / pasos;
  let m = dy / pasos;
  let x = x1;
  let y = y1;
  
  for (let i = 0; i <= pasos; i++) {
      point(x, y);
      x += aumentoX;
      y += m;
  }
}

function bresenham(x1, y1, x2, y2) {
  let dx = abs(x2 - x1)
  let dy = abs(y2 - y1)
  let aumentoX = (x1 < x2) ? 1 : -1
  let aumentoY = (y1 < y2) ? 1 : -1
  let err = dx - dy

  if(aumentoX == 1){
      if(aumentoY == 1){
          while (x1 <= x2 && y1 <= y2) {
              point(x1, y1)
              let e2 = 2 * err
              if (e2 > -dy) {
                  err -= dy
                  x1 += aumentoX
              }
              if (e2 < dx) {
                  err += dx
                  y1 += aumentoY
              }
          }
      }
      else if(aumentoY == -1){
          while (x1 <= x2 && y1 >= y2) {
              point(x1, y1)
              let e2 = 2 * err
              if (e2 > -dy) {
                  err -= dy
                  x1 += aumentoX
              }
              if (e2 < dx) {
                  err += dx
                  y1 += aumentoY
              }
          }
      }
  }
  else if(aumentoX == -1){
      if(aumentoY == 1){
          while (x1 >= x2 && y1 <= y2) {
              point(x1, y1)
              let e2 = 2 * err
              if (e2 > -dy) {
                  err -= dy
                  x1 += aumentoX
              }
              if (e2 < dx) {
                  err += dx
                  y1 += aumentoY
              }
          }
      }
      else if(aumentoY == -1){
          while (x1 >= x2 && y1 >= y2) {
              point(x1, y1)
              let e2 = 2 * err
              if (e2 > -dy) {
                  err -= dy
                  x1 += aumentoX
              }
              if (e2 < dx) {
                  err += dx
                  y1 += aumentoY
              }
          }
      }
  }
}