var animacoes = []
var acoes = []
var mixers = []
var clock = new THREE.Clock()


var cena = new THREE.Scene()
var mixer = new THREE.AnimationMixer(cena)

var raycaster = new THREE.Raycaster();
var rato = new THREE.Vector2();
var candidatos = [];


// Cor de fundo do canvas
cena.background = new THREE.Color('black');

var camara = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 500);
camara.position.set(-100, 4, 0)
camara.lookAt(0, 0, 0)

// aproveitar o canvas criado no HTML
var meuCanvas = document.getElementById('meuCanvas')
var renderer = new THREE.WebGLRenderer({ canvas: meuCanvas })
renderer.setSize(window.innerWidth, window.innerHeight);

// Ativar sombras
renderer.shadowMap.enabled = true;

var controlos = new THREE.OrbitControls(camara, renderer.domElement)
controlos.minDistance = 0;
controlos.maxDistance = 100;

// controlos.minAzimuthAngle = 0;
// controlos.maxAzimuthAngle = Math.PI / 2;

controlos.maxPolarAngle = Math.PI / 2;
controlos.minPolarAngle = -Math.PI / 2;

var carregador = new THREE.GLTFLoader()
carregador.load(
    'modelos/cena.gltf',
    function (gltf) {
        cena.add(gltf.scene)

        saia = cena.getObjectByName('Saia');
        // animacoes = gltf.animations

        // Ray Caster
        if (elemento.name.includes('Botao')) {
            candidatos.push(elemento);
        }
    }
)


// =================== Luzes ===================
var directionalLight = new THREE.DirectionalLight('white');
directionalLight.position.set(0, 4, 0);
cena.add(directionalLight);

var directionalLight1 = new THREE.DirectionalLight('white');
directionalLight1.position.set(5, 4, 0);
cena.add(directionalLight1);

var directionalLight2 = new THREE.DirectionalLight('white');
directionalLight2.position.set(-5, 4, 0);
cena.add(directionalLight2);

var luzPonto1 = new THREE.PointLight('white')
luzPonto1.position.set(-5, 4, 0)
cena.add(luzPonto1)

var luzAmbiente = new THREE.AmbientLight('white', 0.5)
cena.add(luzAmbiente)


// Ray Castar
window.onclick = function (evento) {
    rato.x = (evento.clientX / window.innerWidth) * 2 - 1;
    rato.y = -(evento.clientY / window.innerHeight) * 2 + 1;
    // invocar raycaster
    pegarPrimeiro();
}



// Tem de ser a ultima instrução
animar();




// =================== Funções ===================
function animar() {
    requestAnimationFrame(animar);
    renderer.render(cena, camara);
    elemento.name.includes();

}


// Pega o primeiro objedo atingido pelo raio
function pegarPrimeiro() {
    raycaster.setFromCamera(rato, camara);
    var intersetados = raycaster.intersectObjects(candidatos);
    if (intersetados.length > 0) {
        // fazer o que houver a fazer com o primeiro interesetado
        //. . . intersetados[0].object . . .
        window.open('Saia3D.html');
    }
}




