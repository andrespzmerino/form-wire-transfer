const formulario = document.getElementById('formulario');

const validarCorreo = () => {
  // acepta cualquier nombre
  const expRegCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  // obtenemos el input nombre
  const inputCorreo = formulario['correo-receptor'];

  if (expRegCorreo.test(inputCorreo.value)) {
    inputCorreo.classList.remove('formulario__input--error');
    return true;
  } else {
    inputCorreo.classList.add('formulario__input--error');
    return false;
  }
};

export default validarCorreo;