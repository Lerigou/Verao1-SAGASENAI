let frames = 0;
var pontuacao = 0;
const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav';

const som_PULO = new Audio();
som_PULO.src = './efeitos/jump.wav';

const som_PONTO = new Audio();
som_PONTO.src = './efeitos/ponto.wav';

const sprites = new Image();
sprites.src = './Imagem/spritess.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


// [Plano de Fundo]
const planoDeFundo = {
  spriteX: 348, //procura
  spriteY: 0, //procura
  largura: 320, //recorta
  altura: 480, //recorta
  x: 0, //imprime
  y: 0, //imprime
  desenha() {
    contexto.fillRect(0,0, canvas.width, canvas.height)

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      planoDeFundo.x, planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );
  },
};

// [Chao]
function criaChao() {
  const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    atualiza() {
      const movimentoDoChao = 1;
      const repeteEm = chao.largura / 2;
      const movimentacao = chao.x - movimentoDoChao;
      
      chao.x = movimentacao % repeteEm;
    },
    desenha() {
      contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        chao.x, chao.y,
        chao.largura, chao.altura,
      );
  
      contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        (chao.x + chao.largura), chao.y,
        chao.largura, chao.altura,
      );
    },
  };
  return chao;
}

function fazColisao(superHeroi, chao) {
  const superHeroiY = superHeroi.y + superHeroi.altura;
  const chaoY = chao.y;

  if(superHeroiY >= chaoY) {
    return true;
  }
  document.getElementById('score').value = pontuacao;

  return false;
}

function criaSuperHeroi() {
  const superHeroi = {
    spriteX: 2, //procura
    spriteY: 2,
    largura: 30, //recorta
    altura: 23,
    x: 10, //imprime
    y: 50,
    pulo: 4.6,
    pula() {
      console.log('Voa mlk!');
      console.log('Velocidade antes: ', superHeroi.velocidade);
      superHeroi.velocidade =  - superHeroi.pulo;
      console.log('Velocidade depois: ', superHeroi.velocidade);
    },
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
      if(fazColisao(superHeroi, globais.chao)) {
        console.log('Tem que voar!');
        som_HIT.play();

        setTimeout(() => {
          mudaParaTela(Telas.INICIO);
        }, 500);
        return;
      }
  
      superHeroi.velocidade = superHeroi.velocidade + superHeroi.gravidade;
      superHeroi.y = superHeroi.y + superHeroi.velocidade;
    },
    movimentos: [
      { spriteX: 0, spriteY: 0, }, 
      { spriteX: 0, spriteY: 26, }, 
      { spriteX: 0, spriteY: 52, }, 
      { spriteX: 0, spriteY: 26, },
    ],
    frameAtual: 0,
    atualizaOFrameAtual() {     
      const intervaloDeFrames = 10;
      const passouOIntervalo = frames % intervaloDeFrames === 0;

      if(passouOIntervalo) {
        const baseDoIncremento = 1;
        const incremento = baseDoIncremento + superHeroi.frameAtual;
        const baseRepeticao = superHeroi.movimentos.length;
        superHeroi.frameAtual = incremento % baseRepeticao
      }
    },
    desenha() {
      superHeroi.atualizaOFrameAtual();
      const { spriteX, spriteY } = superHeroi.movimentos[superHeroi.frameAtual];

      contexto.drawImage(
        sprites,
        spriteX, spriteY, // Sprite X, Sprite Y
        superHeroi.largura, superHeroi.altura, // Tamanho do recorte na sprite
        superHeroi.x, superHeroi.y,
        superHeroi.largura, superHeroi.altura,
      );
    }
  }
  return superHeroi;  
}

/// [mensagemGetReady]
const mensagemGetReady = {
  sX: 134,
  sY: 0,
  w: 174,
  h: 152,
  x: (canvas.width / 2) - 174 / 2,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGetReady.sX, mensagemGetReady.sY,
      mensagemGetReady.w, mensagemGetReady.h,
      mensagemGetReady.x, mensagemGetReady.y,
      mensagemGetReady.w, mensagemGetReady.h
    );
  }
}

// 
// [Canos]
// 

function criaCanos() {
  const canos = {
    largura: 52,
    altura: 400,
    chao: {
      spriteX: 0,
      spriteY: 169,
    },
    ceu: {
      spriteX: 52,
      spriteY: 169,
    },
    espaco: 80,
    desenha() {
      canos.pares.forEach(function(par) {
        const yRandom = par.y;
        const espacamentoEntreCanos = 100;
  
        // [Cano do Céu]
        const canoCeuX = par.x;
        const canoCeuY = yRandom; 
        contexto.drawImage(
          sprites, 
          canos.ceu.spriteX, canos.ceu.spriteY,
          canos.largura, canos.altura,
          canoCeuX, canoCeuY,
          canos.largura, canos.altura,
        )
        
        // [Cano do Chão]
        const canoChaoX = par.x;
        const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom; 
        contexto.drawImage(
          sprites, 
          canos.chao.spriteX, canos.chao.spriteY,
          canos.largura, canos.altura,
          canoChaoX, canoChaoY,
          canos.largura, canos.altura,
        )

        par.canoCeu = {
          x: canoCeuX,
          y: canos.altura + canoCeuY
        }
        par.canoChao = {
          x: canoChaoX,
          y: canoChaoY
        }
      })
    },
    temColisaoComOSuperHeroi(par) {
      const cabecaDoHeroi = globais.superHeroi.y;
      const peDoHeroi = globais.superHeroi.y + globais.superHeroi.altura;
      
      if(globais.superHeroi.x >= par.x) {
        // console.log(globais.superHeroi.x, par.x, cabecaDoHeroi, par.canoCeu.y, peDoHeroi, par.canoChao.y)
        if(cabecaDoHeroi <= par.canoCeu.y) {
          som_HIT.play();
          return true;
        } 

        if(peDoHeroi >= par.canoChao.y) {
          som_HIT.play();
          return true;
        } 
        if((cabecaDoHeroi > par.canoCeu.y) && (peDoHeroi < par.canoChao.y)) {
          return false;
        }
      }
      
      return false;
    },

    pares: [],
    atualiza() {
      const passou100Frames = frames % 100 === 0;
      if(passou100Frames) {
        console.log('Passou 100 frames');
        canos.pares.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1),
        });
      } 

      canos.pares.forEach(function(par) {
        par.x = par.x - 2;

        if(canos.temColisaoComOSuperHeroi(par)) {
          console.log('Perdeu!')
          mudaParaTela(Telas.INICIO);
        }

        if(par.x + canos.largura <= 0) {
          canos.pares.shift();
          som_PONTO.play();
          pontuacao++
        }
      });
    }
  }

  return canos;
}

// 
// [Telas]
// 
const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
  telaAtiva = novaTela;

  if(telaAtiva.inicializa) {
    telaAtiva.inicializa();
  }
}

const Telas = {
  INICIO: {
    inicializa() {
      pontuacao = 0;
      globais.superHeroi = criaSuperHeroi();
      globais.chao = criaChao();
      globais.canos = criaCanos();
    },
    desenha() {
      planoDeFundo.desenha();
      globais.superHeroi.desenha();
      
      globais.chao.desenha();
      mensagemGetReady.desenha();
    },
    click() {
      mudaParaTela(Telas.JOGO);
    },
    atualiza() {
      globais.chao.atualiza();
    }
  }
};

Telas.JOGO = {
  desenha() {
    planoDeFundo.desenha();
    globais.canos.desenha();
    globais.chao.desenha();
    globais.superHeroi.desenha();
  },
  click() {
    globais.superHeroi.pula();
  },
  atualiza() {
    globais.canos.atualiza();
    globais.chao.atualiza();
    globais.superHeroi.atualiza();
  }
};



function loop() {

  telaAtiva.desenha();
  telaAtiva.atualiza();
  
  frames = frames + 1;
  requestAnimationFrame(loop);
}

canvas.addEventListener('click', function() {
  if(telaAtiva.click) {
    telaAtiva.click();
    som_PULO.play();
  }
});

mudaParaTela(Telas.INICIO);
loop();

