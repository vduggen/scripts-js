/**
 * O que faz?
 * Esse script pega todos os videos de um canal e adiciona na fila para ouvir e
 * clica no botão para ir ouvindo a música.
 * 
 * Motivação:
 * Queria ouvir todas as músicas de um canal e o canal tinha muitos vídeos.
 * 
 * Data criação: 21/07/2023
 * 
 * TODO:
 * - Melhorar código
 * - Documentar como utilizar
 * - Otimizar para ir adicionando aos poucos e não carregar todos os vídeos para ir adicionando
 * - Adicionar na fila de forma randomica
 */

var oldNumberVideos = document.querySelectorAll('ytd-rich-item-renderer').length;

async function criarPromise() {
	return new Promise((resolve) => {
		timeoutId = setTimeout(() => {
			resolve();
		}, 250);
	})
}

async function adicionarVideosFila() {
	console.log('iniciei execução para adicionar os videos na fila...');
	let elementsVideo = document.querySelectorAll('ytd-rich-item-renderer');
	var index = 0;
	for await (let elementVideo of elementsVideo) {
		if (index === 1) {
			var botaoPlay = document.querySelector('.ytp-play-button.ytp-button.ytp-play-button-playlist');
			botaoPlay.click();
		}
		index++;
		var elementOptions = elementVideo.querySelector('yt-icon-shape');
		if (!elementOptions);
		// 1 - Abrir menu com as opções
		elementOptions.click();
		await criarPromise();
		console.log('cliquei para abrir o menu...');
		var elementFirstItem = document.querySelector('tp-yt-paper-listbox ytd-menu-service-item-renderer:first-child');
		if (!elementFirstItem) continue;
		// 2 - Clicar no item de adicionar na fila
		elementFirstItem.click();
		await criarPromise();
		console.log('cliquei para adicionar na fila...');
		var elementNameVideo = elementVideo.querySelector('#details yt-formatted-string');
		if (elementNameVideo) {
			var nameVideo = elementNameVideo.innerText;
			// 3 - Mostra no console qual item foi adicionado
			console.log(`Vídeo "${nameVideo}" adicionado a fila...`);
		} else {
			console.error(`Não foi possível adicionar o vídeo ${nameVideo} a fila...`);
		}
		await criarPromise();
	}
}

function moveScrollToEndPage() {
	var scrollingElement = (document.scrollingElement || document.body);
	scrollingElement.scrollTop = scrollingElement.scrollHeight;
	console.log('movi o scroll para o final da página...');
	setTimeout(function() {
		var newNumberVideos = document.querySelectorAll('ytd-rich-item-renderer').length;
		if (newNumberVideos === oldNumberVideos) {
			adicionarVideosFila();
		}
		if (newNumberVideos !== oldNumberVideos) {
			moveScrollToEndPage();
			oldNumberVideos = newNumberVideos;
		}
	}, 1000)
}

moveScrollToEndPage();

