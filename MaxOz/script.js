document.addEventListener("DOMContentLoaded", function () {
    //Ocultar todos los pOptionSelect
    const allOptions = document.querySelectorAll(".callate");
    const optionsMenu = document.querySelectorAll(".optionsBannerAbajo .option");
    function showOption(index) {
        allOptions.forEach((el, i) => {
            el.style.display = (i === index) ? "block" : "none";
        });
    }
    //Mostrar por defecto la primera opción (Mas Pedidos)
    showOption(0);
    //Asignar eventos de clic a las opciones
    optionsMenu.forEach((option, index) => {
        option.addEventListener("click", () => {
            showOption(index);
        });
    });
});