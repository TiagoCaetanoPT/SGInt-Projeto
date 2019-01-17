/* global THREE */
var cena = new THREE.Scene()
cena.background = new THREE.Color('white');

var raycaster = new THREE.Raycaster();
var rato = new THREE.Vector2();
var candidatos = [];


var camara = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 500 )
// var camara = new THREE.PerspectiveCamera(70, 800 / 600, 0.1, 500);
camara.position.set(-50, 0, -80);
camara.lookAt(0, 0, 0);

// aproveitar o canvas criado no HTML
var meuCanvas = document.getElementById('meuCanvas')
var renderer = new THREE.WebGLRenderer({ canvas: meuCanvas })
renderer.setSize(window.innerWidth, window.innerHeight-100);
// renderer.setSize(800, 600);

// Habilitar sombras
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

var controlos = new THREE.OrbitControls(camara, renderer.domElement)

controlos.minDistance = 0;
controlos.maxDistance = 85;

var carregador = new THREE.GLTFLoader()

// Saia Fechada
carregador.load(
    '../modelos/Casaco.gltf',
    function (gltf) {
        cena.add(gltf.scene)

        casacoFechado = cena.getObjectByName('Casaco');
        casacoFechado.position.set(0, 10, 0);
        casacoFechado.visible = true;
        // animacoes = gltf.animations
    }
)


// Saia Aberta
carregador.load(
    '../modelos/CasacoAberto.gltf',
    function (gltf) {
        cena.add(gltf.scene)

        casacoAberto = cena.getObjectByName('CasacoAberto');
        casacoAberto.position.set(0, 10, 0);
        casacoAberto.visible = false;
        // animacoes = gltf.animations
    }
)


// Loja
carregador.load(
    '../modelos/cena.gltf',
    function (gltf) {
        cena.add(gltf.scene)

        cena.traverse(function (elemento) {
            // Ray Caster
            if (elemento.name.includes('Botao')) {
                candidatos.push(elemento);
            }
        });
    }
)



// =================== Luzes ===================
// var directionalLight = new THREE.DirectionalLight('white');
// directionalLight.position.set(0, 4, 0);
// cena.add(directionalLight);

// var directionalLight1 = new THREE.DirectionalLight('white');
// directionalLight1.position.set(5, 4, 0);
// cena.add(directionalLight1);

// var directionalLight2 = new THREE.DirectionalLight('white');
// directionalLight2.position.set(-5, 4, 0);
// cena.add(directionalLight2);

var hemiLight = new THREE.HemisphereLight('white', 'black', 2);
hemiLight.position.set(0, 4, 0);
cena.add(hemiLight);

// var luzPonto1 = new THREE.PointLight('white');
// luzPonto1.position.set(-5, 4, 0);
// cena.add(luzPonto1);

var luzAmbiente = new THREE.AmbientLight('white', 0.5);
cena.add(luzAmbiente);

// Ray Castar
window.onclick = function (evento) {
    var limites = evento.target.getBoundingClientRect()
    rato.x = 2 * (evento.clientX - limites.left) / parseInt(meuCanvas.style.width) - 1;
    rato.y = 1 - 2 * (evento.clientY - limites.top) / parseInt(meuCanvas.style.height);

    // invocar raycaster
    pegarPrimeiro();
}



animar();


// =================== Funcoes ===================
function animar() {
    requestAnimationFrame(animar)
    
    renderer.render(cena, camara)
    
    casacoAberto.rotateY(0.001);
    casacoFechado.rotateY(0.001);

    renderer.setSize(window.innerWidth, window.innerHeight-100);
    // renderer.setSize(800, 600);

    elemento.name.includes();
}


// Pega o primeiro objedo atingido pelo raio
function pegarPrimeiro() {
    raycaster.setFromCamera(rato, camara);
    var intersetados = raycaster.intersectObjects(candidatos);
    if (intersetados.length > 0) {
        // fazer o que houver a fazer com o primeiro interesetado
        
        cena.getObjectByName('Casaco').children[4].material = intersetados[0].object.material;
        cena.getObjectByName('CasacoAberto').children[0].material = intersetados[0].object.material;
    }
}

// Trocar Saia Aberta por Fechada
function AbrirFechar() {
    casacoAberto.visible = !casacoAberto.visible;
    casacoFechado.visible = !casacoFechado.visible;
}