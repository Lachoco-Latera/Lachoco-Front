export interface ILoginErrors {
    email?: string;
    password?: string;
}

export interface IRegisterErrors {
    name?: string,
    lastName?: string,
    email?: string,
    country?: string,
    password?: string,
    confirmPassword?: string
}

export const validationLogin = (input: ILoginErrors) => {
    const errors: ILoginErrors = {} 
    const emailRegExp = /\S+@\S+.\S+/; // Validador de email.
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    // const dniRegex = /^[0-9]+$/;


    if(!input.email) {errors.email = 'Debe ingresar un email'}
    else if (!emailRegExp.test(input.email)){errors.email = "Debe ingresar un email válido"}
    else if (!input.password){ errors.password = 'Debe ingresar una contraseña'}
    else if (!uppercaseRegex.test(input.password)) {errors.password = "La contraseña debe tener una letra mayúscula"}
    else if (!numberRegex.test(input.password)) {errors.password = "La contraseña debe tener un número"}
    else if (input.password.length < 8) {errors.password = "La contraseña debe tener 8 caracteres minimo"}
    return errors;
}

export const validationRegister = (input: IRegisterErrors) => {
    const errors: IRegisterErrors = {} 
    const emailRegExp = /\S+@\S+.\S+/; // Validador de email.
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;

    if (!input.name) {errors.name = 'Debe ingresar un nombre'}
    else if (input.name.length < 3) {errors.name = 'El nombre debe contener 3 digitos o más'}
    else if(!input.lastName) {errors.lastName = 'Debe ingresar un apellido'}
    else if (input.lastName.length < 3) {errors.lastName = 'El apellido debe contener 3 igitos o más'}
    else if(!input.email) {errors.email = 'Debe ingresar un email'}
    else if (!emailRegExp.test(input.email)){errors.email = "Debe ingresar un email válido"}
    else if (!input.country) {errors.country = "Debe seleccionar un pais"}
    else if (!input.password){ errors.password = 'Debe ingresar una contraseña'}
    else if (!uppercaseRegex.test(input.password)) {errors.password = "La contraseña debe tener una letra mayúscula"}
    else if (!numberRegex.test(input.password)) {errors.password = "La contraseña debe tener un número"}
    else if (input.password.length < 8) {errors.password = "La contraseña debe tener 8 caracteres minimo"}
    else if (!input.confirmPassword) {errors.confirmPassword = 'Confirmar contraseña'}
    else if (input.confirmPassword !== input.password) {errors.confirmPassword = 'Contraseña incorrecta'}

    return errors;
}