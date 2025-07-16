import Swal from "sweetalert2";

export function dispararSweetBasico(titulo, text, icon, textoBoton) {
  Swal.fire({
    title: titulo,
    text: text,
    icon: icon,
    confirmButtonText: textoBoton,
  });
}

export async function dispararSweet(
  title, text, icon = 'warning', showCancelButton = true, 
  confirmButtonColor = '#d33', cancelButtonColor = '#3085d6', 
  confirmButtonText = 'Confirmar', cancelButtonText = 'Cancelar'
) {
  const result = await Swal.fire({
    title: title,
    html: text,
    icon: icon,
    showCancelButton: showCancelButton,
    confirmButtonColor: confirmButtonColor,
    cancelButtonColor: cancelButtonColor,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText
  });

  return result;
}

export default dispararSweetBasico
