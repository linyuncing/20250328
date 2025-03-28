let seaweeds = []; // 儲存水草的陣列
let colors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff']; // 指定的顏色範圍

function setup() { // 初始值設定
  let canvas = createCanvas(windowWidth, windowHeight); // 畫布大小
  canvas.style('position', 'absolute');
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '1'); // 設置畫布層級高於 iframe
  clear(); // 清除背景，讓畫布透明

  // 初始化 60 條水草
  for (let i = 0; i < 60; i++) {
    seaweeds.push({
      x: random(width), // 隨機的水平位置
      height: random(200, 400), // 隨機的高度
      amplitude: random(5, 5), // 搖動幅度固定為 5
      frequency: random(0.01, 0.03), // 隨機的搖動頻率
      color: color(random(colors) + hex(floor(random(50, 150)), 2)), // 隨機選擇顏色並加入透明度
      thickness: random(20, 40) // 隨機的粗細
    });
  }

  // 創建 iframe
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  iframe.style('position', 'absolute');
  iframe.style('width', '100%');
  iframe.style('height', '100%');
  iframe.style('top', '0%');
  iframe.style('left', '0%');
  iframe.style('border', 'none');
  iframe.style('z-index', '0'); // 設置 iframe 層級低於畫布
  iframe.style('pointer-events', 'auto'); // 確保 iframe 可正常操作
}

function draw() { // 畫圖
  clear(); // 清除背景，保持透明效果

  // 繪製每條水草
  for (let seaweed of seaweeds) {
    let baseX = seaweed.x; // 水草的基底水平位置
    let baseY = height; // 水草的基底垂直位置 (畫布底部)

    // 設定水草的顏色和粗細
    stroke(seaweed.color);
    strokeWeight(seaweed.thickness);
    noFill();

    // 使用 beginShape() 繪製彎曲的水草
    beginShape();
    for (let y = 0; y <= seaweed.height; y += 10) { // 每隔 10px 繪製一個點
      let offsetX = sin(frameCount * seaweed.frequency + y * 0.1) * seaweed.amplitude; // 計算彎曲
      vertex(baseX + offsetX, baseY - y); // 繪製頂點
    }
    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 畫布大小隨著視窗改變
}
