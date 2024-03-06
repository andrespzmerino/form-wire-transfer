import marcarPaso from './marcarPaso';
import siguientePaso from './siguientePaso';
import validarCantidad from './validaciones/validarCantidad';
import validarCorreo from './validaciones/validarCorreo';
import validarNombre from './validaciones/validarNombre';

const formulario = document.getElementById('formulario');

// Reinicmos el scroll al cargar la pagina
formulario.querySelector('.formulario__body').scrollLeft = 0;

// EventListener para comprobar los campos del formulario cuando el usuario escribe o corrige
formulario.addEventListener('keyup', (e) => {
  // Comprobar que el elemento al que levantamos la tecla sea un input
  // Input cantidad
  if (e.target.tagName === 'INPUT') {
    if (e.target.id === 'cantidad') {
      validarCantidad();
    } else if (e.target.id === 'nombre-receptor') {
      validarNombre();
    } else if (e.target.id === 'correo-receptor') {
      validarCorreo();
    }
  }
});

// EventListener para comprobar los campos del formulario cuando el usuario de click en el boton
const btnFormulario = document.getElementById('formulario__btn');
btnFormulario.addEventListener('click', (e) => {
  e.preventDefault();

  const pasoActual = document
    .querySelector('.linea-pasos__paso-check--active')
    .closest('.linea-pasos__paso').dataset.paso;

  if (pasoActual === 'cantidad') {
    if (validarCantidad()) {
      marcarPaso('cantidad');
      siguientePaso();
    }
  } else if (pasoActual === 'datos') {
    if (validarNombre() && validarCorreo()) {
      marcarPaso('datos');
      siguientePaso();
    }
  } else if (pasoActual === 'metodo') {
    marcarPaso('metodo');

    // Formato Moneda
    const opciones = { style: 'currency', currency: 'MXN' };
    const formatoMoneda = new Intl.NumberFormat('es-MX', opciones);

    // Mostrar datos de transferencia
    document.querySelector('[data-valor="cantidad"] span').innerText =
      formatoMoneda.format(formulario['cantidad'].value);
    document.querySelector('[data-valor="nombre-receptor"] span').innerText =
      formulario['nombre-receptor'].value;
    document.querySelector('[data-valor="correo-receptor"] span').innerText =
      formulario['correo-receptor'].value;
    document.querySelector('[data-valor="metodo"] span').innerText =
      formulario.metodo.value;

    // Cambiamos el texto del btn a 'Transferir'
    btnFormulario.querySelector('span').innerText = 'Transferir';

    // Agregamos la clase que deshabilita el boton.
    btnFormulario.classList.add('formulario__btn--disabled');

    // Ocultamos el icono de siguiente.
    btnFormulario
      .querySelector('[data-icono="siguiente"]')
      .classList.remove('formulario__btn-contenedor-icono--active');

    // Mostramos el icono del banco.
    btnFormulario
      .querySelector('[data-icono="banco"]')
      .classList.add('formulario__btn-contenedor-icono--active');

    siguientePaso();

    // Eliminamos la clase de disabled despues de 4 segundos.
    setTimeout(() => {
      btnFormulario.classList.remove('formulario__btn--disabled');
    }, 4000);

    //
  } else if (
    pasoActual === 'confirmacion' &&
    !btnFormulario.matches('.formulario__btn--disabled')
  ) {
    // Cambiamos el texto del btn a 'Transfiriendo'
    btnFormulario.querySelector('span').innerText = 'Transfiriendo';
    // Agregamos la clase que deshabilita el boton.
    btnFormulario.classList.add('formulario__btn--disabled');
    // Removemos el icono del banco.
    btnFormulario
      .querySelector('[data-icono="banco"]')
      .classList.remove('formulario__btn-contenedor-icono--active');
    // Eliminamos la clase de disabled despues de 4 segundos.
    setTimeout(() => {
      formulario.classList.add('formulario--hidden');
      document.getElementById('alerta').classList.add('alerta--active');
    }, 4000);
  }
});

// Evento btn paso
/*
const paso = document.querySelectorAll(['.linea-pasos__paso']);
const btnPaso = document.getElementsByClassName(
  '.linea-pasos__paso-check--checked'
);

console.log(paso[2]);

formulario.addEventListener('click', (e) => {
  if (e.target.tagName === 'SPAN') {
    console.log(e.target);
    if (e.target.classList === 'linea-pasos__paso-check--checked') {
      console.log('span');
    }
  }
});*/
