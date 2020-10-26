export default {
  required: 'Это обязательное поле!',
  email: 'Неправильный формат email!',
  password: 'Неправильный формат пароля!',
  outOfRange: (element) => `Должно быть от ${element.getAttribute(
    'minlength'
  )} до ${element.getAttribute('maxlength')}`,
  text: 'Недопустимый тип данных',
}