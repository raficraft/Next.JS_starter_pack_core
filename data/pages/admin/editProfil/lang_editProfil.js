export const editEmail = {
  error: {
    emailInvalid: {
      FR: "E-mail invalide.",
      EN: "Email invalid.",
    },
    alReadyUse: {
      FR: "E-mail déjà utilisé.",
      EN: "Email already used.",
    },
    reAuthRequired: {
      FR: "Veuillez vous reconnecter.",
      EN: "Please log in again.",
    },
    similar: {
      FR: "E-mail identique , veuillez en choisir un nouveau.",
      EN: "Same email, please choose a new one.",
    },
  },
  success: {
    change: {
      FR: "E-mail modifié avec succès.",
      EN: "Email changed successfully.",
    },
  },
};

export const editDisplayName = {
  error: {
    userNotFound: {
      FR: "Utilisateur introuvable.",
      EN: "User not found.",
    },
    tooShort: {
      FR: "Trois caractères minimums",
      EN: "Three character minimum",
    },
    regex: {
      FR: "Caractères Alphanumériques seulement",
      EN: "Alphanumeric characters only",
    },
    similar: {
      FR: "Pseudo identique , veuillez en choisir un nouveau.",
      EN: "Identical display name, please choose a new one.",
    },
  },
  success: {
    change: {
      FR: "Pseudonyme modifié avec succès",
      EN: "Display name changed successfully",
    },
  },
};

export const editPass = {
  error: {
    userNotFound: {
      FR: "Utilisateur introuvable",
      EN: "User not found",
    },

    noValue: {
      FR: "Veuillez saisir un nouveau mot de passe",
      EN: "Please enter a new password.",
    },

    notIdentical: {
      FR: "Les mots de passe ne sont pas identiques",
      EN: "The passwords are not identical.",
    },
    regexPwd: {
      FR: "Le mot de passe n'est pas au bon format",
      EN: "The password is not in the correct format.",
    },
    regexConfirm: {
      FR: "Le mot de passe de confirmation n'est pas au bon format",
      EN: "The password is not in the correct format.",
    },
  },
  success: {
    change: {
      FR: "Mot de passe modifié avec succès",
      EN: "Password changed successfully",
    },
  },
};

/** User data editing page text */

export const editProfil = {
  email: {
    label: {
      FR: "E-mail",
      EN: "Email",
    },

    placeholder: {
      FR: "Votre E-mail.",
      EN: "Your email.",
    },

    btn: {
      FR: "Modifier mon E-mail",
      EN: "Edit my Email",
    },
  },

  displayName: {
    label: {
      FR: "Pseudo afficher.",
      EN: "Display name",
    },

    placeHolder: {
      FR: "Votre pseudo",
      EN: "Your display name",
    },

    btn: {
      FR: "Modifier mon pseudo",
      EN: "Edit my display name",
    },
  },

  pwd: {
    pwd: {
      FR: "Nouveau mot de passe",
      EN: "New pasword",
    },
    confirm: {
      FR: "Confirmer le mot de passe",
      EN: "Confirm password",
    },
    btn: {
      FR: "Modifier mon mot de passe",
      EN: "Change my password",
    },

    advertText: {
      FR: "Un mot de passe valide entre 8 et 20 caractères contenant au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.",
      EN: "A valid password between 8 and 20 characters containing at least one lowercase letter, one uppercase letter, one number and one special character.",
    },
  },
};
