const{Prova, provas, ProvaModel} = require('../models/ProvaModel');

function gerarTimer(){
    let data = new Date(5 * 60 * 60 *1000);
    let dataEditada = data.toLocaleTimeString('pt-BR', {hour12: false, timeZone: 'GMT'});
    return dataEditada;
};

exports.middlewareGlobal = (req, res, next) => {
    // res.locals.provaEscolhida = req.session.provaEscolhida;
    next();
};

exports.avaliacao = async (req, res, next) => {
    try {
        res.locals.timer = gerarTimer();
        const nomeProva = `${req.body.prova}-${req.body.ano.replace(' - Dia ', '-')}`;
        const prova = await ProvaModel.findOne({ nome: nomeProva});
        if (!prova) return res.render('404');
        res.locals.prova = prova;
        next();
    } catch (error) {
        console.log(error);
        res.render('404');
    }
};

exports.checkCsrfError = (err, req, res, next) => {
    if (err) {
        console.log('CSRF ERROR');
        return res.render('404');
    }
    next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next(); 
};

exports.verificaSessao = (req, res, next) => {
    if(!req.session.emProva) return res.redirect('/');
    next(); 
};
