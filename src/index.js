import fs from "fs";
import chalk from "chalk";

function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}));
    
    if(resultados.length === 0) {
        return console.log("Nao existe links");
    }  else {
        return resultados;
    }
}

function trataErro(erro) {
    throw new Error(chalk.red(erro.code, "dir not exist"));
}

async function pegaArquivo(caminhoArquivo) {
    const encoding = "utf-8";
    try {
        const texto = await fs.promises.readFile(caminhoArquivo, encoding);
        return extraiLinks(texto);
    } catch (erro) {
        return trataErro(erro);
    }
}

export default pegaArquivo;