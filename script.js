// Seleccionamos el formulario por su ID
const formulario = document.getElementById('formulario-saludo');

formulario.addEventListener('submit', async (e) => {
    // Evita que la página se recargue al enviar
    e.preventDefault(); 

    const nombre = document.getElementById('nombre').value;
    const divRespuesta = document.getElementById('contenedor-respuesta');
    const textoSaludop = document.getElementById('texto-saludo');

    try {
        // Petición al servidor (endpoint configurado en tu servidor)
        const respuesta = await fetch('/api/saludo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: nombre })
        });

        const datos = await respuesta.json();

        if (respuesta.ok) {
            // Mostramos el saludo recibido
            textoSaludop.innerText = datos.saludo;
            // Quitamos la clase 'oculto' para mostrar el div
            divRespuesta.classList.remove('oculto');
        } else {
            textoSaludop.innerText = "Error: " + datos.error;
            divRespuesta.classList.remove('oculto');
        }
    } catch (error) {
        textoSaludop.innerText = "Error: No se puede conectar con el servidor.";
        divRespuesta.classList.remove('oculto');
    }
});