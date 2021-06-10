export const parseJwt = () => {
    let base64 = localStorage.getItem('usuario-login').split('.')[1]

    return JSON.parse(window.atob(base64))
}


export const usuarioAutenticado = () => localStorage.getItem('usuario-login') !== null; //Se o browser tiver um token --> true || Se não tiver um token --> false
