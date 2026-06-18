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
ingredientes:"Amendoim e banana.",
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
const Body = Matter.Body;

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

const tooltip =
document.getElementById("tooltip");

const pacocas = [];

const ground = Bodies.rectangle(
window.innerWidth/2,
window.innerHeight-120,
window.innerWidth,
80,
{
isStatic:true
}
);

const leftWall = Bodies.rectangle(
-40,
window.innerHeight/2,
80,
window.innerHeight,
{
isStatic:true
}
);

const rightWall = Bodies.rectangle(
window.innerWidth+40,
window.innerHeight/2,
80,
window.innerHeight,
{
isStatic:true
}
);

World.add(world,[
ground,
leftWall,
rightWall
]);

const loginBox = document.querySelector(".login-box");
const r = loginBox.getBoundingClientRect();

const bloqueioLogin = Bodies.rectangle(
    r.left + r.width / 2,
    r.top + r.height + 80,
    r.width + 300,
    40,
    {
        isStatic: true
    }
);

World.add(world, bloqueioLogin);

const paredeEsquerdaLogin = Bodies.rectangle(
    r.left - 100,
    r.top + r.height / 2,
    40,
    r.height + 300,
    {
        isStatic:true
    }
);

const paredeDireitaLogin = Bodies.rectangle(
    r.right + 100,
    r.top + r.height / 2,
    40,
    r.height + 300,
    {
        isStatic:true
    }
);

World.add(world,[
    paredeEsquerdaLogin,
    paredeDireitaLogin
]);

const login = document.querySelector(".login-box");
const rect = login.getBoundingClientRect();

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

const margem = 450;

const ladoEsquerdo =
Math.random() < 0.5;

if(ladoEsquerdo){

    x = Math.random() *
    Math.max(50, rect.left - margem);

}else{

    x =
    rect.right +
    margem +
    Math.random() *
    (window.innerWidth - rect.right - margem - 50);

}

const sabor =
sabores[
Math.floor(
Math.random()*sabores.length
)
];

const body = Bodies.circle(
x,
-150,
55,
{
restitution:0.3,
friction:0.9,
density:0.002
}
);

World.add(world, body);

const img =
document.createElement("img");

img.src = sabor.imagem;

img.classList.add("pacoca");

container.appendChild(img);

img.addEventListener("mouseenter",()=>{

tooltip.style.display = "block";

tooltip.innerHTML = `
<h3>${sabor.nome}</h3>

<p>
<strong>Ingredientes:</strong><br>
${sabor.ingredientes}
</p>

<p>
<strong>Preparo:</strong><br>
${sabor.preparo}
</p>
`;

});

img.addEventListener("mousemove",(e)=>{

    let x = e.clientX + 20;
    let y = e.clientY + 20;

    if(x + 300 > window.innerWidth){
        x = e.clientX - 300;
    }

    if(y + 180 > window.innerHeight){
        y = e.clientY - 180;
    }

    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";

});

img.addEventListener("click",()=>{

    alert("CLICOU NA PAÇOCA");

});

pacocas.push({
body,
element:img,
sabor
});

}

function atualizar(){

pacocas.forEach(item=>{

item.element.style.left =
(item.body.position.x - 80) + "px";

item.element.style.top =
(item.body.position.y - 80) + "px";

item.element.style.transform =
`rotate(${item.body.angle}rad)`;

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

modal.classList.add("hidden");

}
);

window.addEventListener(
"click",
(e)=>{

if(e.target === modal){

modal.classList.add("hidden");

}

}
);

document
.getElementById("entrar")
.addEventListener(
"click",
()=>{

pacocas.forEach(item=>{

Body.applyForce(
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