const nomeBusca = document.querySelector(".input");
const mensagemDeErro = document.querySelector("#mensagemErro");
const botaoDeBuscar = document.querySelector("#botao_buscar");
const titulo = document.querySelector("#titulo");
const sinopse = document.querySelector("#sinopse");
const poster = document.querySelector(".poster");
const ano = document.querySelector("#ano");
const duracao = document.querySelector("#duracao");
const genero = document.querySelector("#genero");
const atores = document.querySelector("#atores");
const diretor = document.querySelector("#diretor");
const valorAvaliacao = document.querySelector(".valorAvaliacao");

const apiKey = "3573d3b2";
const imgDefault = "./default_image.png";

async function buscarFilme(nomeBusca) {
  const resposta = await fetch(
    `http://www.omdbapi.com/?t=${nomeBusca}&apikey=${apiKey}`
  );
  return resposta.json();
}

async function core() {
  try {
    const filme = await buscarFilme(nomeBusca.value);
    console.log(filme.Plot);
    validarDados(filme);
    definirValores(filme);
  } catch (erro) {
    console.log(erro + "ieta");
    mensagemDeErro.textContent = `${erro}`;
  }
}

function limparCampos() {
  titulo.textContent = "";
  sinopse.textContent = "";
  ano.textContent = "";
  duracao.textContent = "";
  diretor.textContent = "";
  atores.textContent = "";
  genero.textContent = "";
  poster.setAttribute("src", imgDefault);
}
function definirValores(filme) {
  titulo.textContent = filme.Title;
  sinopse.textContent = filme.Plot;
  ano.textContent = `Year: ${filme.Year}`;
  duracao.textContent = `Runtime: ${filme.Runtime}`;
  diretor.textContent = `Director: ${filme.Director}`;
  atores.textContent = `Actors: ${filme.Actors}`;
  genero.textContent = `Genre: ${filme.Genre}`;
  poster.setAttribute("src", filme.Poster);
}

function validarDados(filme) {
  if (
    filme.Plot === undefined ||
    filme.Year === undefined ||
    filme.Actors === "N/A"
  ) {
    throw new Error("Filme não encontrado.");
  }
}

botaoDeBuscar.addEventListener("click", () => {
  limparCampos();
  core();
});
