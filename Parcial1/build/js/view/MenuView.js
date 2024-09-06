export default class MenuView {
    render() {
        // Obtén la etiqueta <menu> del DOM
        const menuElement = document.querySelector("menu");
        // Asegúrate de que el elemento <menu> exista en el DOM
        if (menuElement) {
            // Crear un contenedor div para los botones
            const div = document.createElement("div");
            // Insertar tres botones dentro del div
            div.innerHTML = `
                <button id="btn1">Botón 1</button>
                <button id="btn2">Botón 2</button>
                <button id="btn3">Botón 3</button>
            `;
            // Añadir el div al elemento <menu>
            menuElement.appendChild(div);
            // Asignar funciones a los botones
            this.assignButtonFunctions();
        }
        else {
            console.error("El elemento <menu> no se encontró en el DOM.");
        }
    }
    assignButtonFunctions() {
        // Obtener los botones por su id
        const button1 = document.getElementById("btn1");
        const button2 = document.getElementById("btn2");
        const button3 = document.getElementById("btn3");
        // Verificar que los botones existan antes de asignar las funciones
        if (button1) {
            button1.addEventListener("click", () => {
                console.log("Botón 1 presionado");
                // Agrega la función deseada aquí
            });
        }
        if (button2) {
            button2.addEventListener("click", () => {
                console.log("Botón 2 presionado");
                // Agrega la función deseada aquí
            });
        }
        if (button3) {
            button3.addEventListener("click", () => {
                console.log("Botón 3 presionado");
                // Agrega la función deseada aquí
            });
        }
    }
}
