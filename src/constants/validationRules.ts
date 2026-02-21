export const VALIDATION_RULES = {
  REQUIRED_MESSAGE: 'Это поле не может быть пустым',

  TITLE: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 64,
    MIN_MESSAGE: 'Минимальная длина текста 2 символа',
    MAX_MESSAGE: 'Максимальная длина текста 64 символа',
  },
  LOGIN: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 60,
    MIN_MESSAGE: 'Минимальная длина текста 2 символа',
    MAX_MESSAGE: 'Максимальная длина текста 60 символа',
    REGEX: /^[A-Za-z]+$/,
    REGEX_MESSAGE: 'Допустимы только символы латинского алфавита',
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 60,
    MIN_MESSAGE: 'Минимальная длина текста 6 символа',
    MAX_MESSAGE: 'Максимальная длина текста 60 символа',
  },
  USERNAME: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 60,
    MIN_MESSAGE: 'Минимальная длина текста 1 символ',
    MAX_MESSAGE: 'Максимальная длина текста 60 символа',
    REGEX: /^[A-Za-zА-Яа-яЁё]+$/,
    REGEX_MESSAGE: 'Допустимы только символы русского/латинского алфавита',
  },
  EMAIL: {
    REGEX: /^[^\s@]+@[^\s@]+.[^\s@]+$/,
    REGEX_MESSAGE: 'Введите корректный email-адрес',
  },
  PHONE_NUMBER: {
    REGEX: /^\+?\d{10,12}$/,
    REGEX_MESSAGE: 'Введите корректный номер телефона',
  },
};
