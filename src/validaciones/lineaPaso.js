import validarCantidad from './validarCantidad';
import validarCorreo from './validarCorreo';
import validarNombre from './validarNombre';
const linea = document.getElementById('linea-pasos');

linea.addEventListener('click', (e) => {
  if (!e.target.closest('.linea-pasos__paso')) {
    return;
  } else if (!validarCantidad()) {
    return;
  } else if (!validarNombre() || !validarCorreo()) {
    return;
  }
  // Obtenemos el paso a navegar
  const pasoNavegar = e.target.closest('.linea-pasos__paso');

  if (pasoNavegar.querySelector('.linea-pasos__paso-check--checked')) {
    const pasoActual = linea.querySelector('.linea-pasos__paso-check--active');
    pasoActual.classList.remove('linea-pasos__paso-check--active');

    // Obtenemos el identificador del paso a navegar
    const id = pasoNavegar.dataset.paso;

    // Agregamos la clase active al nuevo paso
    linea
      .querySelector(`[data-paso="${id}"] span`)
      .classList.add('linea-pasos__paso-check--active');

    // Navegamos al paso
    document
      .querySelector(`.formulario__body [data-paso="${id}"]`)
      .scrollIntoView({
        inline: 'start',
        behavior: 'smooth',
      });

    const btnFormulario = document.getElementById('formulario__btn');

    // Cambiamos el texto del btn a 'siguiente'
    btnFormulario.querySelector('span').innerText = 'Siguiente';

    // Ocultamos el icono del banco.
    btnFormulario
      .querySelector('[data-icono="banco"]')
      .classList.remove('formulario__btn-contenedor-icono--active');

    // Mostramos el icono de siguiente.
    btnFormulario
      .querySelector('[data-icono="siguiente"]')
      .classList.add('formulario__btn-contenedor-icono--active');

    // Eliminamos la clase que deshabilita el boton.
    btnFormulario.classList.remove('formulario__btn--disabled');
  }
});
