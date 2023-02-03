const{ProvaModel} = require('../models/ProvaModel');

function gerarTimer(){
    let data = new Date(5 * 60 * 60 *1000);
    let dataEditada = data.toLocaleTimeString('pt-BR', {hour12: false, timeZone: 'GMT'});
    return dataEditada;
};

exports.pagina = (req, res) => {
    res.locals.timer = gerarTimer();
    res.render('avaliacao');
    return;
};

exports.iniciada = async (req, res, next) => {
    try {
        if(req.session.provaEscolhida){
            res.locals.prova = req.session.provaEscolhida;
            res.locals.timer = gerarTimer();
            return res.render('iniciada');
        };
        const nomeProva = req.body.nomeProva;
        const prova = await ProvaModel.findOne({ nome: nomeProva});
        if (!prova) return res.render('404');
        req.session.emProva = true;
        req.session.cookie.maxAge = 1000 * 60 *60 * 60;
        res.locals.timer = gerarTimer();
        req.session.provaEscolhida = prova;
        res.locals.prova = prova;
        res.render('iniciada');
        next();
    } catch (error) {
        console.log(error);
        res.render('404');
    }
};
