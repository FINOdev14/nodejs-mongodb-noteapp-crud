const notasCtrl = {};

const Note = require('../models/Note');
//const Note = require('../models/Note');
const Nota = require('../models/Note');

notasCtrl.renderNoteForm = (req,res)=>{
    console.log(req.user);
    res.render('notas/new-nota');
};

notasCtrl.createNewNote = async (req,res)=>{
    //console.log(req.body);
    const {titulo, descripcion} = req.body;
    const newNota = new Nota({titulo: titulo, descripcion: descripcion});
    //console.log(newNota);
    newNota.user = req.user.id;
    await newNota.save();
    
    req.flash('success_msg', 'nota Agregada con exito!!');
    res.redirect('/notas')
};

notasCtrl.renderNotas = async (req,res)=>{
    const notas = await Nota.find({user: req.user.id}).sort({createdAt: 'desc'}).lean();
    res.render('notas/all-notes', { notas });
};

notasCtrl.renderEditForm = async (req,res)=>{
    const note = await Nota.findById(req.params.id).lean();
    if (note.user != req.user.id) {
        req.flash('errors_msg','Esta No es tu Nota');
        return res.redirect('/notas');
    }
    console.log(note);
    res.render('notas/edit-note', { note })
};

notasCtrl.updateNotas = async (req,res)=>{
    const {titulo,descripcion} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {titulo, descripcion});
    req.flash('success_msg', 'Nota Actualizada Exitosamente')
    res.redirect('/notas');
};

notasCtrl.deleteNota = async (req,res)=>{
    //console.log(req.params.id);
    await Nota.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Nota Eliminada con Exito')
    res.redirect('/notas')
}

module.exports = notasCtrl;