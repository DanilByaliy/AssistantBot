const fs = require('fs');
const PImage = require('pureimage');

const font = PImage.registerFont('CourierNewPS-BoldMT.ttf','MyFont');

const img1 = PImage.make(2700, 3890);
const ctx = img1.getContext('2d');
  
const a = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const c = [6, 0];
const d = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des'];

let b, counter = 6;

function weekends(i, j) {
  ctx.fillStyle = '#bdbebd';

  ctx.beginPath();
  ctx.arc(120 + 225*i, 170 + 120*j, 45, 0, Math.PI/100, true);
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(120 + 225*i, 170 + 120*j, 50, 0, Math.PI, false);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(120 + 225*i, 170 + 120*j, 50, 0, Math.PI, true);
  ctx.stroke();
  ctx.closePath();
}

function weekdays(i, j) {
  ctx.beginPath();
  ctx.arc(120 + 225*i, 170 + 120*j, 50, 0, Math.PI, false);
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(120 + 225*i, 170 + 120*j, 50, 0, Math.PI, true);
  ctx.stroke();
  ctx.closePath();
}  

function printYear(callback) {

  font.load(() => { 
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 12;
    
    for (let i = 0; i < 13; i++) {
      for (let j = 0; j < a[i]; j++) {
        (c.includes(counter % 7)) ? weekends(i, j) : weekdays(i, j);
        b = (j < 9) ? 100 : 84;
        ctx.fillStyle = '#000000';
        ctx.font = "60pt MyFont";
        ctx.fillText([j+1].toString(), b + 225*i, 187 + 120*j);
        counter++;   
      }
    }

    for (let i = 0; i < 12; i++) {
      ctx.fillStyle = '#000000';
      ctx.font = "100pt MyFont";
      ctx.fillText(d[i], 25 + 225*i, 80);
    }
    
    PImage.encodePNGToStream(img1, fs.createWriteStream('year.png')).then(() => {
      console.log("wrote out the png file to out.png");
      callback();
    }).catch((e)=>{
      console.log("there was an error writing");
    });
  }); 
}

module.exports = { printYear }