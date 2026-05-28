const hasSpaces = (value) => /\s/.test(value);
const digitsOnly = (value) => /^\d+$/.test(value);

export const validateUserForm = (user, { requirePassword = true } = {}) => {
  const errors = {};

  if ("age" in user) {
    const age = String(user.age || "").trim();
    if (!age) {
      errors.age = "Age is required.";
    } else if (!digitsOnly(age)) {
      errors.age = "Age must be a number only.";
    }
  }

  if ("contactNumber" in user) {
    const contactNumber = String(user.contactNumber || "").trim();
    if (!contactNumber) {
      errors.contactNumber = "Contact number is required.";
    } else if (!digitsOnly(contactNumber) || contactNumber.length !== 11) {
      errors.contactNumber = "Contact number must be 11 digits.";
    }
  }

  if ("username" in user) {
    const username = String(user.username || "").trim();
    if (!username) {
      errors.username = "Username is required.";
    } else if (hasSpaces(username)) {
      errors.username = "Username must not contain spaces.";
    }
  }

  if ("password" in user) {
    const password = String(user.password || "");
    if (requirePassword && !password) {
      errors.password = "Password is required.";
    } else if (password && password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }
  }

  return errors;
};
