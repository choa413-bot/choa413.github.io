
let candleBody = document.querySelector(".candle-body");
let flame = document.querySelector(".flame");
let glow = document.querySelector(".glow");


let MAX_CANDLE_HEIGHT = 300;  
let MIN_CANDLE_HEIGHT = 40;   

let SKY = [
  { hour: 0,    top: [11, 16, 38],    bottom: [26, 31, 60] },     
  { hour: 5,    top: [20, 26, 62],    bottom: [58, 53, 96] },     
  { hour: 6.25, top: [78, 92, 150],   bottom: [244, 162, 97] },  
  { hour: 8,    top: [111, 168, 220], bottom: [252, 217, 168] },  
  { hour: 11,   top: [58, 140, 220],  bottom: [168, 216, 240] }, 
  { hour: 14,   top: [47, 128, 216],  bottom: [142, 203, 240] },  
  { hour: 17,   top: [84, 130, 200],  bottom: [236, 200, 170] },  
  { hour: 18.75,top: [91, 90, 168],   bottom: [242, 142, 92] },   
  { hour: 20,   top: [42, 42, 94],    bottom: [122, 74, 122] },   
  { hour: 22,   top: [19, 24, 56],    bottom: [42, 42, 85] },    
  { hour: 24,   top: [11, 16, 38],    bottom: [26, 31, 60] }      
];


function getHour() {
  let params = new URLSearchParams(window.location.search);
  let fake = params.get("time");
  if (fake) {
    let parts = fake.split(":");
    return Number(parts[0]) + Number(parts[1] || 0) / 60;
  }
  let date = new Date();
  return date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
}


function blend(a, b, amount) {
  return [
    Math.round(a[0] + (b[0] - a[0]) * amount),
    Math.round(a[1] + (b[1] - a[1]) * amount),
    Math.round(a[2] + (b[2] - a[2]) * amount)
  ];
}

function toRgb(c) {
  return "rgb(" + c[0] + ", " + c[1] + ", " + c[2] + ")";
}


function getSkyColors(hour) {
  for (let i = 0; i < SKY.length - 1; i++) {
    let a = SKY[i];
    let b = SKY[i + 1];
    if (hour >= a.hour && hour <= b.hour) {
      let amount = (hour - a.hour) / (b.hour - a.hour);
      return {
        top: blend(a.top, b.top, amount),
        bottom: blend(a.bottom, b.bottom, amount)
      };
    }
  }
  return { top: SKY[0].top, bottom: SKY[0].bottom };
}


let glowStrength = 1;

function updateClock() {
  let hour = getHour();

  let sky = getSkyColors(hour);
  document.body.style.background =
    "linear-gradient(to bottom, " + toRgb(sky.top) + ", " + toRgb(sky.bottom) + ")";
  document.body.style.backgroundAttachment = "fixed";

  let progress = hour / 24;
  let height = MAX_CANDLE_HEIGHT - (MAX_CANDLE_HEIGHT - MIN_CANDLE_HEIGHT) * progress;
  candleBody.style.height = height + "px";

 
  let brightness = (sky.top[0] + sky.top[1] + sky.top[2] + sky.bottom[0] + sky.bottom[1] + sky.bottom[2]) / (6 * 255);
  glowStrength = 0.2 + 0.8 * (1 - Math.min(brightness * 1.6, 1));
}

function flicker() {
  let scaleX = 0.88 + Math.random() * 0.24;   
  let scaleY = 0.85 + Math.random() * 0.3;    
  let tilt = (Math.random() - 0.5) * 6;       

  flame.style.transform =
    "scale(" + scaleX + ", " + scaleY + ") rotate(" + tilt + "deg)";

  glow.style.opacity = glowStrength * (0.75 + Math.random() * 0.25);


  setTimeout(flicker, 80 + Math.random() * 100);
}

updateClock();
setInterval(updateClock, 1000);
flicker();
