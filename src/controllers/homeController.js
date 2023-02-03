const{Prova, provas} = require('../models/ProvaModel');

exports.paginaInicial = async (req, res) => {
    req.session.emProva = false;
    res.render('index');
    return;
};

exports.selecionaAno = (req, res) => {
    res.locals.prova = req.body.prova;
    res.locals.enemAnos = () =>  Object.keys(provas).filter(val => val.split('-')[0] === 'ENEM').map(val => `${val.split('-')[1]} - Dia ${val.split('-')[2]}`);
    res.locals.fuvestAnos = () =>  Object.keys(provas).filter(val => val.split('-')[0] === 'FUVEST').map(val => val.split('-')[1]);
    res.locals.unicampAnos = () =>  Object.keys(provas).filter(val => val.split('-')[0] === 'UNICAMP').map(val => val.split('-')[1]);
    res.render('ano');
    return;
};


