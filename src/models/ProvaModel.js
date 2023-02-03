const mongoose = require('mongoose');

const ProvaSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    tipoDeProva: {type: String, required: true},
    ano: {type: String, required: true},
    dia: {type: String, required: false},
    stringGabarito: {type: String, required: true},
    numQuestoes: {type: Number, required: true},
    tempoDeProva: {type: Number, required: true},
    opcoes: {type: Array, required: true},
    gabarito:{type: Object, required: true},
    respostas: {type: Object, required: false}
});

const ProvaModel = mongoose.model('Prova', ProvaSchema);

class Prova {
    constructor(nome, stringGabarito, stringRespostas){
        this.nome = nome;
        this.tipoDeProva = this.split(nome, 0);
        this.ano = this.split(nome, 1);
        this.stringGabarito = stringGabarito;
        this.numQuestoes = stringGabarito.length;
        this.stringRespostas = stringRespostas;
        this.tempoDeProva = 5
        this.opcoes = ['A', 'B', 'C', 'D', 'E'];
        this.gabarito = this.formatarString(this.stringGabarito);
        this.createInDatabase(this.nome);
    }

    formatarString(string){
        const formatado = {};
        for (let i = 0; i < this.numQuestoes; i++){
            formatado[i + 1] = string[i];
        };
        return formatado;
    }

    async createInDatabase(nome){
        const prova = await ProvaModel.findOne({ nome: nome} ).exec();
        if (prova) return;
        await ProvaModel.create(this);
    }
    
    split(nome, index){
        return nome.split('-')[index];
    }
    get respostas(){ // Respostas em forma de objeto
        return this.formatarString(this.stringRespostas);
    }

    get correcao(){
        const questoesAcertadas = Object.keys(this.gabarito).filter(valor => this.gabarito[valor] === this.respostas[valor]);
        const questoesErradas = Object.keys(this.gabarito).filter(valor => this.gabarito[valor] !== this.respostas[valor]);
        const numAcertos = questoesAcertadas.length;
        const numErros = questoesErradas.length;
        const porcentagemAcertos = ((numAcertos * 100) / this.numQuestoes).toFixed(1);
        return {questoesAcertadas, numAcertos, porcentagemAcertos, questoesErradas, numErros};
    }
};

class Enem extends Prova{
    constructor(nome, stringGabarito, respostas){
        super(nome, stringGabarito, respostas);
        this.dia = nome.split('-')[2]; 
        this.tempoDeProva = this.dia === '1' ? 5.5 : 5;
    }
};

class Fuvest extends Prova{
    constructor(nome, stringGabarito, respostas){
        super(nome, stringGabarito, respostas);
    }
};

class Unicamp extends Prova{
    constructor(nome, stringGabarito, respostas){
        super(nome, stringGabarito, respostas);
        this.opcoes = ['A', 'B', 'C', 'D'];
    }
};
// const pr = new Fuvest('FUVEST-2015', 'EDACDECBABECBDEAADCBEDBCDAADECDBBCEAEEDBDEBCDBABEACECDCBCADBDBAECEBCECEBBDCDDCAADAABCBCDBE');
// async function uploadToDatabase(nome, obj){
//     const prova = await ProvaModel.findOne({ nome: nome}).exec();
//     if (prova) return;

// }
// up()

const provas = {
    'ENEM-2021-1' : new Enem('ENEM-2021-1', 'CAABBBDCDEADCEDBEDDDABBBBDEBCEADABDBACACDCDDCBADCBADBCEDDEBBADBCABEECCAEABEBAAECBBABAAEEBB'),
    'ENEM-2021-2' : new Enem('ENEM-2021-2', 'EDECABEDABCBEBACCDCBBEEBBCBDAAECDCBDCDBBBADCDEE*EBABDDCECCBCCECDCAEBADEABBDBDEDCEDCCADDCAB'),
    'ENEM-2020-1' : new Enem('ENEM-2020-1', 'AAEDCCEAACBAEBBEDACDBAADADDEBBEBAAADEACAAADBBDABCBDDDAEDBECECBBEDEBDEECBCCCBACDCCADEBDECDD'),
    'ENEM-2020-2' : new Enem('ENEM-2020-2', 'DDBACBDDDECDAEDCCCEDBDDCBDDCAAECEDDACCBAEDCD*DABCCAEDBBCCCABCACCBD*CCCBEEEDBBACCDACBAEBAEC'),
    'ENEM-2019-1' : new Enem('ENEM-2019-1', 'BDABEBCBAADDBECDAAECDAECBECBCCDEEAAADDBBCDCEBBACCCBABBADCBCEEEBCACACEEDBCCADBEADBADBBBACDB'),
    'ENEM-2019-2' : new Enem('ENEM-2019-2', 'AAECACDEADCBCDDDBCBDADAEABCEBABEEBCBEECEBDADCEEEADBEBACABCDBABECECACDCBDCCEDCDABEDECDDDBAA'),
    'FUVEST-2008' : new Fuvest('FUVEST-2008', 'CCCEAEDBAADBDECCEBABDABCEECDADCCADAEBEBCAEEDCACBADDCBBEDEABCBECBADCEDABEDCDAEBCDEDEDCBCAAB'),
    'FUVEST-2009' : new Fuvest('FUVEST-2009', 'CBDECCCAEEDDCCABADCBCAEBEACCDEEADBBACBDECACBEBEADDCDAAECBBDEACDCBEEDBACCADBEDECADBACDECBEA'),
    'FUVEST-2010' : new Fuvest('FUVEST-2010', 'CABDAEEBDEDCBADECBAECBBCDAEDBDEACBADBCAEBEACBAEDDCBADAECCBDEAEEDCCDBBAEADEBDCBADEABDABCEDC'),
    'FUVEST-2011' : new Fuvest('FUVEST-2011', 'BDCBEAECDDEAEBACBDCADBBCAECEADEACBCBDEABCEADCAEDDCBDBEACAEDECABEBDACDCBDADAEECADECBCBCEBDA'),
    'FUVEST-2012' : new Fuvest('FUVEST-2012', 'DADCBECEBAAAABDBDDEBCAADCEABDCEBEABEACEEAEDCDBDCDABCBDAECDEEBBAACEDCCBABCEDCDEAADDCECDBBAE'),
    'FUVEST-2013' : new Fuvest('FUVEST-2013', 'CEDECBBADDEAAEDBCEDCBAABDAEBBEACBADEBADCBABAEECABDABEECDADCACBEBEDBEDBAEDCECBAABCDABDCAEBD'),
    'FUVEST-2014' : new Fuvest('FUVEST-2014', 'DBCDCABEDEABCCEBDADAECBDCCBCBEAADEBACEAEEDDCBBCEDEBCDBADABAEADECCBEBCDAEEEACAAEEBCBDBACBDD'),
    'FUVEST-2015' : new Fuvest('FUVEST-2015', 'EDACDECBABECBDEAADCBEDBCDAADECDBBCEAEEDBDEBCDBABEACECDCBCADBDBAECEBCECEBBDCDDCAADAABCBCDBE'),
    'FUVEST-2016' : new Fuvest('FUVEST-2016', 'DDAEBBCCEAEEACBACECDBDEECEADADBCBABCDEEBBC*DBEBABBAEEBAAECDCCDCCDCBACEBEDAEEBCBDDACABADBEB'),
    'FUVEST-2017' : new Fuvest('FUVEST-2017', 'EBCCADEBABDCBADCEDDBEBCBACEECABEDCDBECBDECAADBBDDACDBEEAEDEADDBCBCAACDACDEABCEBEEBDADBACCD'),
    'FUVEST-2018' : new Fuvest('FUVEST-2018', 'BEBACECBDACEDDBCEABCCABCADEEBACEBDABDECADEECBAAADEBDCCEBEDBCCDEDDEAEDDACCCBAEBDDBDEEAEABED'),
    'FUVEST-2019' : new Fuvest('FUVEST-2019', 'CBABEDECBDACDDABDEECAAACBDACEDEABCABDACCECBDACEBEDACACBBDEECDBEECBDAAABCECAADEECBCDBBCEADD'),
    'FUVEST-2020' : new Fuvest('FUVEST-2020', 'DEECEABCABDCEBDCACCADDDABAEBEBCECEAADDDBCBBEACCCACEABCCDBBADBCAECABCBAADCEDDADCCEDDBEEBACD'),
    'FUVEST-2021' : new Fuvest('FUVEST-2021', 'BEDCDBEEACACCBDDBACEACECADEBAABCEBECDEABEABAEACBEBBDBBCCEABCCBEDCEAABCBDBEEAACDCADCBBBDEBB'),
    'FUVEST-2022' : new Fuvest('FUVEST-2022', 'CCEBDABCEBAACBDDEADDECEADCABBCACCDBEAEBDDBDCECDCECBDD*CADEDCBBADEDAABDCDACBEEABADCACCAAAEA'),
    'UNICAMP-2022' : new Unicamp('UNICAMP-2022', 'DABDDCCDBDCADBDACBBCDBACADBBDCAAABACDADBB*DCABCCDAABCCCBCBBCCDBCCCBADCDA'),
    'UNICAMP-2021' : new Unicamp('UNICAMP-2021', 'CBDBBBDABACBCDDBBCAACBADBCBBBCCACDBCCACBBCCDBAD*DACBBCBDACBDBACBCCCBDCBA'),
    'UNICAMP-2020' : new Unicamp('UNICAMP-2020', 'DAABCDCDDDADBBCBDACABBADDDCABBCCBCADCABABCDCDBDCBACACABDCDBCDBCDACBBAADBBADCCABDABDBADCCDB'),
    'UNICAMP-2019' : new Unicamp('UNICAMP-2019', 'CDDBDCCDBBDADCDCABADABCCBCDCDDACCBBADDBBDABAAAACBCDCCDBBCDB*CBBBCCADCDCDBBCAACBDAACCCBDCBB')
};


// 
module.exports = {Prova, provas, ProvaModel};