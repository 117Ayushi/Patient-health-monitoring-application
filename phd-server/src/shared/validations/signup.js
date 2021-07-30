import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};

  if (isEmpty(data.age)) {
    errors.age = 'This field is required';
  }
  if (isEmpty(data.mobile)) {
    errors.mobile = 'This field is required';
  }
  if (isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }
  if (isEmpty(data.name)) {
    errors.name = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
