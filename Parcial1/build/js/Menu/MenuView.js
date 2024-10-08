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
                <section class="buttons">
                    <button id="btn1">Home</button>
                    <button id="btn2">Retails</button>
                    <button id="btn3">About</button>
                </section>
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
        const button2 = document.getElementById("btn2");
        if (button2) {
            button2.addEventListener("click", () => {
                console.log("Botón 2 presionado");
                // Agrega la función deseada aquí
            });
        }
    }
}
