export const validateTitle = (title) => {
  const titleLength = title.trim().length;

  let error = '';
  let isValid = true;

  if (titleLength === 0) {
    error = 'Это поле не может быть пустым';
    return { error, isValid: false };
  }

  if (titleLength < 2) {
    error = 'Минимальная длина текста 2 символа';
    return { error, isValid: false };
  }

  if (titleLength > 64) {
    error = 'Максимальная длина текста 64 символа';
    return { error, isValid: false };
  }

  return { error, isValid };
};
