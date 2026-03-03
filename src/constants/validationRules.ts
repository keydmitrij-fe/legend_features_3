export const VALIDATION_INPUTS_RULES = {
  TITLE: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 64,
  },
  LOGIN: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 60,
    REGEX: /^[A-Za-z]+$/,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 60,
  },
  USERNAME: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 60,
    REGEX: /^[A-Za-zА-Яа-яЁё]+$/,
  },
  EMAIL: {
    REGEX: /^[^\s@]+@[^\s@]+.[^\s@]+$/,
  },
  PHONE_NUMBER: {
    REGEX: /^\+?\d{10,12}$/,
  },
};

export const VALIDATION_INPUTS_MESSAGE = {
  REQUIRED: 'Это поле не может быть пустым',

  TITLE: {
    MIN_LENGTH: `Минимальная длина текста ${VALIDATION_INPUTS_RULES.TITLE.MIN_LENGTH} символа`,
    MAX_LENGTH: `Максимальная длина текста ${VALIDATION_INPUTS_RULES.TITLE.MAX_LENGTH} символа`,
  },
  LOGIN: {
    MIN_LENGTH: `Минимальная длина текста ${VALIDATION_INPUTS_RULES.LOGIN.MIN_LENGTH} символа`,
    MAX_LENGTH: `Максимальная длина текста ${VALIDATION_INPUTS_RULES.LOGIN.MAX_LENGTH} символа`,
    REGEX: 'Допустимы только символы латинского алфавита',
  },
  PASSWORD: {
    MIN_LENGTH: `Минимальная длина текста ${VALIDATION_INPUTS_RULES.PASSWORD.MIN_LENGTH} символа`,
    MAX_LENGTH: `Максимальная длина текста ${VALIDATION_INPUTS_RULES.PASSWORD.MAX_LENGTH} символа`,
  },
  USERNAME: {
    MIN_LENGTH: `Минимальная длина текста ${VALIDATION_INPUTS_RULES.USERNAME.MIN_LENGTH} символ`,
    MAX_LENGTH: `Максимальная длина текста ${VALIDATION_INPUTS_RULES.USERNAME.MAX_LENGTH} символа`,
    REGEX: 'Допустимы только символы русского/латинского алфавита',
  },
  EMAIL: { REGEX: 'Введите корректный email-адрес' },
  PHONE_NUMBER: {
    REGEX: 'Введите корректный номер телефона',
  },
};
