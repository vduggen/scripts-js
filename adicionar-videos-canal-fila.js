var oldNumberVideos = document.querySelectorAll('ytd-rich-item-renderer').length;

async function criarPromise() {
	return new Promise((resolve) => {
		timeoutId = setTimeout(() => {
			resolve();
		}, 500);
	})
}

async function adicionarVideosFila() {
	console.log('iniciei execução para adicionar os videos na fila...');
	let elementsVideo = document.querySelectorAll('ytd-rich-item-renderer');
	for await (let elementVideo of elementsVideo) {
		const elementOptions = elementVideo.querySelector('yt-icon-shape');
		if (!elementOptions);
		// 1 - Abrir menu com as opções
		elementOptions.click();
		await criarPromise();
		console.log('cliquei para abrir o menu...');
		const elementFirstItem = document.querySelector('tp-yt-paper-listbox ytd-menu-service-item-renderer:first-child');
		if (!elementFirstItem) continue;
		// 2 - Clicar no item de adicionar na fila
		elementFirstItem.click();
		await criarPromise();
		console.log('cliquei para adicionar na fila...');
		const elementNameVideo = elementVideo.querySelector('#details yt-formatted-string');
		if (elementNameVideo) {
			const nameVideo = elementNameVideo.innerText;
			// 3 - Mostra no console qual item foi adicionado
			console.log(`Vídeo "${nameVideo}" adicionado a fila...`);
		} else {
			console.error(`Não foi possível adicionar o vídeo ${nameVideo} a fila...`);
		}
		await criarPromise();
	}
}

function moveScrollToEndPage() {
	const scrollingElement = (document.scrollingElement || document.body);
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
	}, 2500)
}

moveScrollToEndPage();

