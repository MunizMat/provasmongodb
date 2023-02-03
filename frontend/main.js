import 'core-js/stable';
import 'regenerator-runtime/runtime';


import { provas } from  './modules/prova';
import { novoDOM } from './modules/dom';


// class AvaliacaoDoAluno{
//     constructor(){
//         this.section1 = document.querySelector('#respostas-1');
//         this.section2 = document.querySelector('#respostas-2');
//         this.section3 = document.querySelector('#respostas-3');
//         this.h1 = document.querySelector('.titulo');
//         this.prova;
//         this.ano;
//         this.dia;
//         this.tempoDeProvaEmMilisegundos;
//         this.eventos();
//     }

//     eventos(){
//         document.addEventListener('click', e => {
//             const elemento = e.target;
//             const h2 = document.querySelector('.subtitulo');
//             if (elemento.classList.contains('selecionar-prova')){
//                 const prova = elemento.innerHTML;
//                 const lista = document.querySelectorAll('.selecionar-prova');
//                 this.prova = prova;
//                 this.removerElementos(lista);
//                 h2.remove();
//                 const novoInput = novoDOM.criarTextInput(novoDOM.criarH2('Selecione um ano:'));
//                 novoInput.focus();
//             }
//             if (elemento.classList.contains('btn-ano')){
//                 const btnAno = document.querySelector('.btn-ano');
//                 const erro = document.querySelector('.erro');
//                 const txtInput = document.querySelector('.text-input');
//                 if (erro) erro.remove();
//                 if(this.anoIsValid(txtInput.value, this.prova)) {
//                     this.ano = txtInput.value;
//                     btnAno.remove();
//                     txtInput.remove();
//                     h2.remove();
//                     if (this.prova === 'ENEM'){
//                         const h2 = novoDOM.criarH2('Selecione o dia');
//                         const newDiv = novoDOM.criarDiv('radio-div', h2, '', false);
//                         novoDOM.criarRadioInput('radio-input dia', newDiv, 'dia', '1', true);
//                         novoDOM.criarRadioInput('radio-input dia', newDiv, 'dia', '2', true);
//                         const newBtn = novoDOM.criarBotao('enviar-dia', newDiv, 'Enviar', false);
//                     } else {
//                         this.gerarProva(this.prova, this.ano, this.dia);
//                     }
//                 } else {
//                     this.criarErro(btnAno, 'Ano ou prova indisponível');
//                 }
//             }
//             if (elemento.classList.contains('enviar-dia')) {
//                 const botao = document.querySelector('.enviar-dia');
//                 const div = document.querySelector('.radio-div');
//                 const h2 = document.querySelector('.subtitulo');
//                 const diaEscolhido = document.querySelector('input[name="dia"]:checked');
//                 if (diaEscolhido) {
//                     this.dia = diaEscolhido.value;
//                     botao.remove();
//                     h2.remove();
//                     div.remove();
//                     this.gerarProva(this.prova, this.ano, this.dia);
//                 }
//             }
//             if (elemento.classList.contains('btn-iniciar-prova')){
//                 const btnIniciarProva = document.querySelector('.btn-iniciar-prova');
//                 this.acionarRelogio(document.querySelector('.timer'));
//                 btnIniciarProva.remove();
//                 const btnFinalizarProva = novoDOM.criarBotao('btn-finalizar', document.querySelector('.sections'), 'Finalizar Avaliação', false);
//             }
//         });
//     }

//     anoIsValid(anoEnviado, prova){
//         let valid = false;
//         if (prova !== 'ENEM'){
//             Object.keys(provas).forEach(val => {
//                 if (val === `${prova}-${anoEnviado}`){
//                     valid = true;
//                 }
//             })
//         } else {
//             Object.keys(provas).forEach(val => {
//                 if (provas[val].tipoDeprova === prova && provas[val].ano === anoEnviado){
//                     valid = true;
//                 }
//             })
//         };
//         return valid;
//     }

//     removerElementos(listaElementos){
//         listaElementos.forEach(val => val.remove());
//     }

//     criarErro(referenceElement, texto){
//         const div = novoDOM.criarDiv('erro', referenceElement, texto, false);
//     }

//     capturarInput(){

//     }

//     gerarProva(prova, ano, dia){
//         this.h1.innerHTML = (prova === 'ENEM') ? `Prova ${prova} ${ano} Dia ${dia}` : `Prova ${prova} ${ano}`;
//         let provaEscolhida = (prova === 'ENEM') ? `${prova}-${ano}-${dia}` : `${prova}-${ano}`;
//         provaEscolhida = provas[provaEscolhida];
//         this.tempoDeProvaEmMilisegundos = provaEscolhida.tempoDeProva * 3600000;
//         const timer = document.querySelector('.timer');
//         this.gerarRelogio(timer);
//         const btnIniciar = novoDOM.criarBotao('btn-iniciar-prova', timer, 'Iniciar Prova', false);
//         this.gerarQuestoes(btnIniciar, provaEscolhida.numQuestoes, provaEscolhida.opcoes);
//     }

//     gerarQuestao(section, letras, numero){
//         const divQuestao = novoDOM.criarDiv(`div-questao questao-${numero}`, section, `${numero})`, true);
//         for(let letra of letras){
//             novoDOM.criarRadioInput('', divQuestao, `Q${numero}`, letra, true);
//         }
//     }

//     gerarQuestoes(referenceElement, numQuestoes, letras){
//         const div = novoDOM.criarDiv('sections', referenceElement, '', false);
//         const resp1 = novoDOM.criarDiv('respostas resp-1', div, '', true);
//         const resp2 = novoDOM.criarDiv('respostas resp-2', div, '', true);
//         const resp3 = novoDOM.criarDiv('respostas resp-3', div, '', true);
//         let contador = 1;
//         while (contador <= numQuestoes ) {
//                 while (contador <= (numQuestoes * 2/3)) {
//                     while (contador <= (numQuestoes / 3)) {
//                         this.gerarQuestao(resp1, letras ,contador);
//                         contador++;
//                     };
//                     this.gerarQuestao(resp2, letras, contador);
//                     contador++;
//                 };
//                 this.gerarQuestao(resp3, letras, contador);
//                 contador++;
//             };
//     }

//     gerarRelogio(timer){ //Temopo de prova em horas!!
//         let data = new Date(this.tempoDeProvaEmMilisegundos);
//         let dataEditada = data.toLocaleTimeString('pt-BR', {hour12: false, timeZone: 'GMT'});
//         timer.innerHTML = dataEditada;
//     }

//     acionarRelogio(timer){
//         let intervalo = setInterval(() => {
//             this.gerarRelogio(timer);
//             this.tempoDeProvaEmMilisegundos -= 1000;
//     },1000);
//     }
// }

// const novaAval = new AvaliacaoDoAluno();