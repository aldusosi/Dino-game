const dino = document.querySelector('.dino');
const background = document.querySelector(".background");
const pontuacao = document.querySelector('.pontos');
const recordAtual = document.querySelector('.record');

let isJumping = false;
let position = 0;
let pontos = 0;


let record = Number(localStorage.getItem('record'));
recordAtual.innerText = `Record ${record}`;

function handleKeyUp(event){
	if(event.keyCode === 32 && !isJumping){
		Jump();
	}
}

function Jump(){
	const gravidade = 20;
	let upInterval = setInterval(()=>{
		if(position >= 150){
			clearInterval(upInterval);
			//descendo
			let downInterval = setInterval(()=>{
				if(position <= 0){
					clearInterval(downInterval);
					isJumping = false;
				}else{
					position -= 20;
					dino.style.bottom = position + "px";
				}
				
			}, gravidade)
		}else{
			//subindo
			isJumping = true;
			position += 20;
			dino.style.bottom = position + "px";
		}
		
	}, gravidade);

}

function createCactus(){
	const cactus = document.createElement('div');
	let cactusPosition = 1000;
	let randomTime = Math.random() * 6000;

	cactus.classList.add('cactus');
	cactus.style.left = cactusPosition + "px";
	background.appendChild(cactus);

	let leftInterval = setInterval(()=>{
		if(cactusPosition < -60 ){
			clearInterval(leftInterval);
			background.removeChild(cactus);
			pontos += 10;
			pontuacao.innerText = `${pontos} Pontos`;
			if(pontos > record){
				pontuacao.style.color = "green"
			}
		}else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
			//game over
			clearInterval(leftInterval);
			document.body.innerHTML = "<h1 class='game-over'>Fim de jogo</h1>";
			console.log(pontos, record)
			if(pontos > record){
				localStorage.setItem('record', pontos);
			}
		}else{
			cactusPosition -= 10;
			cactus.style.left = cactusPosition + "px";
		}
		
	}, 20);

	setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keydown', handleKeyUp);