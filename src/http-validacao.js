import chalk from 'chalk';

function extraiLinks(arrLinks) {
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join())
}

async function checaStatus(listaURLs) {
    const arrStatus = await Promise.all(
        listaURLs.map(async (url) => {
            try {
                const response = await fetch(url);
                return response.status;
            } catch(erro) {
                return manejaErros(erro);
            }
        })
    )
    return arrStatus;
}

function manejaErros(erro) {
    if(erro.cause.code === "ENOTFOUND") {
        return "Link nao encontrado";
    } else {
        return "Ocorreu algum erro";
    }
}

export default async function listaValidada(listaLinks) {
    const links = extraiLinks(listaLinks);
    const status = await checaStatus(links);
    
    return listaLinks.map((obj, indice) => ({
        ...obj, 
        status: status[indice],
    }));
}


