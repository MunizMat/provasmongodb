class ManipulaDOM {
    constructor(){

    }

    criarDiv(classe, referenceElement, texto, isChild){
        const novaDiv = document.createElement('div');
        novaDiv.setAttribute('class', classe);
        novaDiv.innerHTML = texto;
        if (isChild){ 
            referenceElement.appendChild(novaDiv);
        } else {
            referenceElement.insertAdjacentElement('afterend', novaDiv);
        }
        return novaDiv;
    }

    criarBotao(classe, referenceElement, texto, isChild){
        const btn = document.createElement('button');
        btn.setAttribute('class', classe);
        btn.innerHTML = texto;
        if (isChild){ 
            referenceElement.appendChild(btn);
        } else {
            referenceElement.insertAdjacentElement('afterend', btn);
        }
        return btn;
    }

    criarRadioInput(classe, referenceElement, nome, texto, isChild){
        const label = document.createElement('label');
        label.innerText = texto
        const radioInput = document.createElement('input');
        radioInput.setAttribute('class', classe);
        radioInput.setAttribute('type', 'radio');
        radioInput.setAttribute('name', nome);
        radioInput.setAttribute('value', texto);
        if (isChild){ 
            referenceElement.appendChild(label);
            referenceElement.appendChild(radioInput);
        } else {
            referenceElement.insertAdjacentElement('afterend', label);
            referenceElement.insertAdjacentElement('afterend', radioInput);
        }

    }

    criarH2(texto){
        const h2 = document.createElement('h2');
        const sibling = document.querySelector('.titulo');
        h2.innerHTML = texto;
        h2.setAttribute('class', 'subtitulo');
        sibling.insertAdjacentElement('afterend', h2);
        return h2;
    }

    criarTextInput(sibling){
        const input = document.createElement('input');
        input.setAttribute('class', 'text-input');
        sibling.insertAdjacentElement('afterend', input);
        const enviarInput = this.criarBotao('btn-ano', input, 'Enviar', false);
        return input;
    }
}

export const novoDOM = new ManipulaDOM();