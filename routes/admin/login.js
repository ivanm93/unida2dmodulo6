//3. Agregar carpetas admin en routes y views.

var express = require('express');
var router = express.Router();
var usuarioModels = require('./../../models/usuariomodels');
/* GET home page. */
router.get('/', function(req, res, next) {
//4. Borrar contenido y rellenar "/admin/login"
    res.render('admin/login', {
        layout: 'admin/layout'
        
    });
});

//logout
router.get('/logout', function(req, res, next) {
    req.session.destroy(); //destruye las variables de sesion
    res.render('admin/login', {
        layout: 'admin/layout'
    })
})

router.post('/', async (req, res, next) => {
    try {
        var usuario = req.body.usuario; //cristian
        var password = req.body.password; //1234

        var data = await usuarioModels.getUserByUsernameandPassword(usuario, password);
        

        if (data != undefined) {
            //cargar datos para proteccion
            req.session.id_usuario = data.id;
            req.session.nombre = data.usuario;

            res.redirect('/admin/novedades');
        } else {
            res.render('admin/login', {
                layout: 'admin/layout',
            error: true
            });
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
