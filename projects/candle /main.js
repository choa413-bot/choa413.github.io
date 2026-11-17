let body = document.querySelector("body");
let candleBody = document.querySelector(".candle-body");
let flame = document.querySelector(".flame");


function updateClock() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();


  if (hours < 5) {
    body.className = "night";           
  } else if (hours < 12) {
    body.className = "morning";        
  } else if (hours < 18) {
    body.className = "afternoon";     
  } else if (hours < 23) {
    body.className = "evening";         
  } else {
    body.className = "night";          
  }


  let newHeight = 250 - hours * 9 - minutes * 0.15;
  candleBody.style.height = newHeight + "px";


  let flameHeight = 50 + Math.floor(Math.random() * 13);
  flame.style.height = flameHeight + "px";


  console.log("Hours:", hours);
  console.log("Minutes:", minutes);
  console.log("Seconds:", seconds);
}

updateClock();
setInterval(updateClock, 1000);
