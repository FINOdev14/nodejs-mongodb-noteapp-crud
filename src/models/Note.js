const {Schema, model} = require('mongoose');

const NotaSchema = new Schema({
    titulo: {
        type: String,
        required:true},
    descripcion: {
        type : String,
        required : true
    },
    user:{
        type: String,
        required: true
    },
    UPRemove:{
        type: Boolean,
        require: true
    }
},{
    timestamps: true
});

module.exports = model('Note', NotaSchema);