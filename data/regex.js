export const regexAlphNum = /^[\w\-\sàáâãäåçèéêëìíîïðòóôõöùúûüýÿ' ]+$/i;

export const regexDate =
  /^(0?[1-9]|[12][0-9]|3[01])[\\-](0?[1-9]|1[012])[\\-]\d{4}$/;

export const rexgexNumeric = /[0-9]+:[0-9]+/;

export const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//   To check a password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character
export const regexPwd =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;

export const reg = {
  alpha: {
    rules: /^[\w\-\sàáâãäåçèéêëìíîïðòóôõöùúûüýÿ' ]+$/i,
    error: {
      FR: "Caratères alphabétiques ou numériques seulement.",
      EN: "Alphabetic or numeric characters only.",
    },
  },
  numeric: {
    rules: /[0-9]+:[0-9]+/,
    error: {
      FR: "Caractères numériques seulement. ",
      EN: "Numeric characters only",
    },
  },
  email: {
    rules:
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    error: {
      FR: "E-mail invaild",
      EN: "Invalid email",
    },
  },
  pwd: {
    rules: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/,
    error: {
      FR: "Un mot de passe valide entre 8 et 20 caractères contenant au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.",
      EN: "A valid password between 8 and 20 characters containing at least one lowercase letter, one uppercase letter, one number and one special character.",
    },
  },

  text: {
    rules: /^[\w\-\sàáâãäåçèéêëìíîïðòóôõöùúûüýÿ'"!?:;.,%¨^)(ù ]+$/i,
    error: {
      FR: "Caratères alphabétiques ou numériques et ponctuations seulement.",
      EN: "Alphabetic or numeric characters and punctuation only.",
    },
  },
};
