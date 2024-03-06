'use strict';

const marcarPaso = (paso) => {
  document
    .querySelector(`.linea-pasos [data-paso="${paso}"] span`)
    .classList.add('linea-pasos__paso-check--checked');
};

const siguientePaso = () => {
  // Creamos un arreglo con los pasos
  const pasos = [...document.querySelectorAll('.linea-pasos__paso')];
  // Obtenemos el paso activo
  const pasoActivo = document
    .querySelector('.linea-pasos__paso-check--active')
    .closest('.linea-pasos__paso');
  // Obtenemos el index del paso activo
  const indexPasoActivo = pasos.indexOf(pasoActivo);

  if (indexPasoActivo < pasos.length - 1) {
    // Eliminamos la clase de paso activo
    pasoActivo
      .querySelector('span')
      .classList.remove('linea-pasos__paso-check--active');
    // Agregamos la clase de paso activo al siguiente paso
    pasos[indexPasoActivo + 1]
      .querySelector('span')
      .classList.add('linea-pasos__paso-check--active');

    const id = pasos[indexPasoActivo + 1].dataset.paso;

    document
      .querySelector(`.formulario__body [data-paso="${id}"]`)
      .scrollIntoView({
        inline: 'start',
        behavior: 'smooth',
      });
      
  }
};

const formulario$3 = document.getElementById('formulario');

const validarCantidad = () => {
  // acepta cualquier digito (0-9), y un punto con decimales (opcional)
  const expRegCantidad = /^\d+(\.\d+)?$/;
  // obtenemos el input cantidad
  const inputCantidad = formulario$3.cantidad;

  if (expRegCantidad.test(inputCantidad.value)) {
    inputCantidad.classList.remove('formulario__input--error');
    return true;
  } else {
    inputCantidad.classList.add('formulario__input--error');
    return false;
  }
};

const formulario$2 = document.getElementById('formulario');

const validarCorreo = () => {
  // acepta cualquier nombre
  const expRegCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  // obtenemos el input nombre
  const inputCorreo = formulario$2['correo-receptor'];

  if (expRegCorreo.test(inputCorreo.value)) {
    inputCorreo.classList.remove('formulario__input--error');
    return true;
  } else {
    inputCorreo.classList.add('formulario__input--error');
    return false;
  }
};

const formulario$1 = document.getElementById('formulario');

const validarNombre = () => {
  // acepta cualquier nombre
  const expRegNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
  // obtenemos el input nombre
  const inputNombre = formulario$1['nombre-receptor'];

  if (expRegNombre.test(inputNombre.value)) {
    inputNombre.classList.remove('formulario__input--error');
    return true;
  } else {
    inputNombre.classList.add('formulario__input--error');
    return false;
  }
};

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
//# sourceMappingURL=bundle.js.map
