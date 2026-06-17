const sabores = [
{
nome:"Tradicional",
imagem:"images/tradicional.png",
ingredientes:"Amendoim torrado e açúcar.",
preparo:"Receita tradicional prensada."
},
{
nome:"Chocolate",
imagem:"images/chocolate.png",
ingredientes:"Amendoim e cacau.",
preparo:"Mistura artesanal com chocolate."
},
{
nome:"Morango",
imagem:"images/morango.png",
ingredientes:"Amendoim e morango.",
preparo:"Prensagem saborizada."
},
{
nome:"Coco",
imagem:"images/coco.png",
ingredientes:"Amendoim e coco ralado.",
preparo:"Receita tropical."
},
{
nome:"Café",
imagem:"images/cafe.png",
ingredientes:"Amendoim e café.",
preparo:"Torra especial."
},
{
nome:"Doce de Leite",
imagem:"images/doce-de-leite.png",
ingredientes:"Amendoim e doce de leite.",
preparo:"Cobertura cremosa."
},
{
nome:"Leite Ninho",
imagem:"images/leite-ninho.png",
ingredientes:"Amendoim e leite em pó.",
preparo:"Receita gourmet."
},
{
nome:"Nutella",
imagem:"images/nutella.png",
ingredientes:"Amendoim e creme de avelã.",
preparo:"Recheio premium."
},
{
nome:"Banana",
imagem:"images/banana.png",
ingredientes:"Amendoim e banana."
,
preparo:"Receita artesanal."
},
{
nome:"Gourmet",
imagem:"images/gourmet.png",
ingredientes:"Ingredientes selecionados.",
preparo:"Produção premium."
}
];

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Runner = Matter.Runner;

const engine = Engine.create();
const world = engine.world;

engine.gravity.y = 1.2;

const runner = Runner.create();
Runner.run(runner, engine);

const container =
document.getElementById("pacoca-container");

const modal =
document.getElementById("modal");

const modalImg =
document.getElementById("modal-img");

const modalTitle =
document.getElementById("modal-title");

const ingredientes =
document.getElementById("ingredientes");

const preparo =
document.getElementById("preparo");

const fechar =
document.getElementById("fechar");

const pacocas = [];

const ground = Bodies.rectangle(
window.innerWidth / 2,
window.innerHeight - 40,
window.innerWidth,
80,
{
isStatic:true
}
);

const leftWall = Bodies.rectangle(
-40,
window.innerHeight / 2,
80,
window.innerHeight,
{
isStatic:true
}
);

const rightWall = Bodies.rectangle(
window.innerWidth + 40,
window.innerHeight / 2,
80,
window.innerHeight,
{
isStatic:true
}
);

World.add(world, [
ground,
leftWall,
rightWall
]);

function criarPacoca(){

if(pacocas.length >= 40){

const antiga = pacocas.shift();

World.remove(world, antiga.body);

antiga.element.remove();
}

const login =
document.querySelector(".login-box");

const rect =
login.getBoundingClientRect();

let x;

do{

x = Math.random() * (window.innerWidth - 200);

}
while(
x > rect.left - 200 &&
x < rect.right + 200
);

const sabor =
sabores[Math.floor(
Math.random() * sabores.length
)];

const body = Bodies.circle(
x,
-150,
80,
{
restitution:0.4,
friction:0.5,
density:0.002
}
);

World.add(world, body);

const img =
document.createElement("img");

img.src = sabor.imagem;

img.classList.add("pacoca");

img.style.width = "160px";
img.style.height = "160px";

container.appendChild(img);

img.addEventListener("click",()=>{

modal.classList.remove("hidden");

modalImg.src = sabor.imagem;

modalTitle.innerText =
sabor.nome;

ingredientes.innerText =
"Ingredientes: " +
sabor.ingredientes;

preparo.innerText =
"Preparo: " +
sabor.preparo;

});

pacocas.push({
body,
element:img,
sabor
});

}

function atualizar(){

pacocas.forEach(item=>{

const body = item.body;

const img = item.element;

img.style.left =
(body.position.x - 80) + "px";

img.style.top =
(body.position.y - 80) + "px";

img.style.transform =
`rotate(${body.angle}rad)`;

});

requestAnimationFrame(atualizar);

}

atualizar();

document
.getElementById("email")
.addEventListener(
"input",
criarPacoca
);

document
.getElementById("senha")
.addEventListener(
"input",
criarPacoca
);

fechar.addEventListener(
"click",
()=>{

modal.classList.add(
"hidden"
);

}
);

window.addEventListener(
"click",
(e)=>{

if(e.target === modal){

modal.classList.add(
"hidden"
);

}

}
);

document
.getElementById("entrar")
.addEventListener(
"click",
()=>{

pacocas.forEach(item=>{

Matter.Body.applyForce(
item.body,
item.body.position,
{
x:(Math.random()-0.5)*0.05,
y:-0.08
}
);

});

}
);

window.addEventListener(
"resize",
()=>{

Matter.Body.setPosition(
ground,
{
x:window.innerWidth/2,
y:window.innerHeight-40
}
);

}
);