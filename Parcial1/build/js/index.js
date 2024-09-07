import IndexController from './Index/IndexController.js';
import IndexModel from './Index/IndexModel.js';
import IndexView from './Index/IndexView.js';
// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Crear instancias de los modelos y vistas
    const indexModel = new IndexModel();
    const indexView = new IndexView();
    // Crear el controlador
    const indexController = new IndexController(indexView, indexModel);
    // Iniciar el controlador
    indexController.init();
    // Lógica para actualizar constantemente la aplicación
    const updateInterval = 1000; // Intervalo de actualización en milisegundos
    setInterval(() => {
    }, updateInterval);
});
/*
document.addEventListener('DOMContentLoaded', () => {
    const indexController = new IndexController(indexView, indexModel, movieModel, movieView);
    indexController.init();
});
*/
