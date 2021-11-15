$(document).ready(function () {
	// Inicializar información sobre herramientas
	$('[data-toggle="tooltip"]').tooltip();

	// Agregue un desplazamiento suave a todos los enlaces en la barra de navegación + enlace de pie de página
	$(".navbar a, footer a[href='#myPage']").on('click', function (event) {

		// Asegúrese de que this.hash tenga un valor antes de anular el comportamiento predeterminado
		if (this.hash !== "") {

			// Evita el comportamiento predeterminado del clic de anclaje
			event.preventDefault();

			// Almacenar hash
			var hash = this.hash;

			// Usando el método jQuery animate () para agregar un desplazamiento suave de la página 
			// El número opcional (900) especifica la cantidad de milisegundos que se necesitan para desplazarse al área especificada
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 600, function () {

				// Agregue hash (#) a la URL cuando termine de desplazarse (comportamiento de clic predeterminado)
				window.location.hash = hash;
			});
		} // Terminara 
	});
})