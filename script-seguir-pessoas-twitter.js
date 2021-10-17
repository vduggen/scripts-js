// Pegando todos os botões
var elements = document.querySelectorAll(
  '.css-1dbjc4n.r-19u6a5r > [role="button"]'
);

// Percorrendo os botões
elements.forEach((element, index) => {
  // Faço uma validação para caso o botão já tenha sido clicado
  if (element.innerText !== "Following") {
    // Pego o aria label que contém o @ da pessoa
    var namePeople = element.ariaLabel.split(" ")[1];

    // Dou um console.log para informação de quem foi seguido
    console.log(`Acabamos de seguir a pessoa ${namePeople}...`);

    // Click no botão
    element.click();
  }
});
