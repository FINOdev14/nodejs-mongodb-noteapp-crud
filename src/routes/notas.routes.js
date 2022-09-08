const {Router} = require('express');
const router = Router()

const {
    renderNoteForm,
    createNewNote, 
    renderNotas, 
    renderEditForm, 
    updateNotas, 
    deleteNota
} = require('../controllers/notas.controllers')

const {isAuthenticated} = require('../helpers/auth')

//New nota
router.get('/notas/add', isAuthenticated, renderNoteForm);

router.post('/notas/new-nota', isAuthenticated, createNewNote);

//Get todas las notas
router.get('/notas', isAuthenticated, renderNotas);

//editar notas
router.get('/notas/edit/:id', isAuthenticated, renderEditForm);

router.put('/notas/edit/:id',  isAuthenticated, updateNotas);

//delete Notas
router.delete('/notas/delete/:id', isAuthenticated, deleteNota);

module.exports = router;