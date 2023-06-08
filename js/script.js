/*
 ______ __  __  ______  __    __  ______  ______    
/\__  _/\ \_\ \/\  ___\/\ "-./  \/\  ___\/\  ___\   
\/_/\ \\ \  __ \ \  __\\ \ \-./\ \ \  __\\ \___  \  
   \ \_\\ \_\ \_\ \_____\ \_\ \ \_\ \_____\/\_____\ 
    \/_/ \/_/\/_/\/_____/\/_/  \/_/\/_____/\/_____/ 
*/

function setTheme(themeName) {
  localStorage.setItem("theme", themeName);
  document.documentElement.className = themeName;
}

function toggleTheme() {
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-light");
  } else {
    setTheme("theme-dark");
  }
}

(function () {
  if (localStorage.getItem("theme") === "theme-light") {
    setTheme("theme-light");
  } else {
    setTheme("theme-dark");
  }
})();

/* 
 ______  ______  ______  ______  __      __        
/\  ___\/\  ___\/\  __ \/\  __ \/\ \    /\ \       
\ \___  \ \ \___\ \  __<\ \ \/\ \ \ \___\ \ \____  
 \/\_____\ \_____\ \_\ \_\ \_____\ \_____\ \_____\ 
  \/_____/\/_____/\/_/ /_/\/_____/\/_____/\/_____/ 
*/

const bg = document.querySelector("#background");

window.addEventListener("scroll", function () {
  scroll = window.pageYOffset;
  const newPosition = scroll * 0.4;
  document.querySelector("#background").style.transform =
    "translateY(" + newPosition + "px)";
});

/*
 ______ ______  ______  ______  ______  __  __   __    
/\__  _/\  ___\/\  __ \/\  __ \/\  __ \/\ \/\ "-.\ \   
\/_/\ \\ \  __\\ \  __<\ \  __<\ \  __ \ \ \ \ \-.  \  
   \ \_\\ \_____\ \_\ \_\ \_\ \_\ \_\ \_\ \_\ \_\\"\_\ 
    \/_/ \/_____/\/_/ /_/\/_/ /_/\/_/\/_/\/_/\/_/ \/_/ 
 */

const terrain = document.getElementById("terrain");
const ctx = terrain.getContext("2d");
ctx.fillStyle = "transparent";
const { width, height } = terrain;
const colors = { top: "#78b444", right: "#6ba33a", left: "#629a32" };
const amplitude = 32;
const frequence = 1 / 15;
const w = 16;
const h = 8;
const renderDistance = 28;
const yoff = renderDistance * h;

const grass = new Image();
grass.src =
  "https://raw.githubusercontent.com/ImSumire/Spicy-Journey/main/res/sprites/Terrain/grass.png";
const water = new Image();
water.src =
  "https://raw.githubusercontent.com/ImSumire/Spicy-Journey/main/res/sprites/Terrain/water.png";

function updateTerrain(t) {
  t += 0.26;
  t %= 6.28;

  ctx.clearRect(0, 0, width, height);

  // background
  ctx.fillRect(0, 0, width, height);

  // Field
  ctx.save();
  ctx.translate(width / 2, height / 2);
  for (let x = 0; x < renderDistance; x++) {
    for (let y = 0; y < renderDistance; y++) {
      const z =
        amplitude +
        noise.perlin2(x * frequence, y * frequence) * amplitude -
        0.2;

      // drawBox(ctx, { x, y, z, w, h }, colors);

      if (z < 34) {
        ctx.drawImage(grass, x * w - y * w, y * h + x * h + z - yoff);
      } else {
        ctx.drawImage(
          water,
          x * w - y * w,
          y * h + x * h + Math.cos(x - y * 0.8 + t) * 1.5 - (yoff - 37)
        );
      }
    }
  }
  ctx.restore();

  setTimeout(() => {
    updateTerrain(t);
  }, 50); // 20 per second
}

updateTerrain.cache = {};

updateTerrain(0);

/* 
__  ______  ______  __   __    
/\ \/\  ___\/\  __ \/\ "-.\ \   
\ \ \ \ \___\ \ \/\ \ \ \-.  \  
 \ \_\ \_____\ \_____\ \_\\"\_\ 
  \/_/\/_____/\/_____/\/_/ \/_/ 
 */

var icon = document.querySelector("link[rel~='icon']");
const icons = [];
for (let x = 0; x < 6; x++) {
  icons.push(
    `https://raw.githubusercontent.com/ImSumire/Spicy-Journey/main/res/sprites/Characters/right/${x}.png`
  );
}
var index = 0;

function updateIcon() {
  icon.href = icons[index % 6];
  index += 1;

  setTimeout(() => {
    requestAnimationFrame(updateIcon);
  }, 200); // 5 per second
}

updateIcon();

/* 
__      ______  ______  __   ________  ______    
/\ \    /\  ___\/\  __ \/\ \ / /\  ___\/\  ___\   
\ \ \___\ \  __\\ \  __ \ \ \'/\ \  __\\ \___  \  
 \ \_____\ \_____\ \_\ \_\ \__| \ \_____\/\_____\ 
  \/_____/\/_____/\/_/\/_/\/_/   \/_____/\/_____/ 
 */

const leavesImg = [];
for (let x = 0; x < 9; x++) {
  leavesImg.push(`img/${x}.png`);
}

class Leaf {
  constructor(x, y, dx, dy, rotation) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.rotation = rotation;
  }

  create() {
    this.image = document.createElement("img");
    this.image.src = leavesImg[randint(0, 8)];
    this.image.classList.add("leaf");
    this.image.style.transform = "scale(20)";

    this.image.style.left = "0";
    this.image.style.top = "0";

    document.body.appendChild(this.image);
  }

  update() {
    this.image.style.display = "";
    this.x += this.dx;
    this.y += this.dy;

    this.rotation += 8;

    this.image.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;

    if (this.y > window.innerHeight + 100 || this.x < -100) {
      this.x = randint(0, window.innerWidth);
      this.y = -20;
      this.image.style.display = "none";
    }
  }
}

function randint(a, b) {
  return Math.floor(Math.random() * (b - a)) + a;
}

function uniform(a, b) {
  return Math.random() * (b - a) + a;
}

const leaves = [];

for (let i = 0; i < 8; i++) {
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  const dx = uniform(-0.4, -2.4) * 8;
  const dy = uniform(1, 3) * 8;
  const rotation = randint(0, 360);

  const leaf = new Leaf(x, y, dx, dy, rotation);
  leaf.create();
  leaves.push(leaf);
}

function animate() {
  for (const leaf of leaves) {
    leaf.update();
  }

  setTimeout(() => {
    requestAnimationFrame(animate);
  }, 100); // 10 per second
}

animate();
