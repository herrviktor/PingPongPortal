// tar bort potentiellt skadlig input från användare.
export const sanitize = (str: string): string => {
  if (!str || typeof str !== 'string') return '';
  let sanitized = str.trim();
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
  sanitized = sanitized.replace(/javascript:/gi, '');
  return sanitized;
};

export const sanitizeRegex = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_][a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^[\w!@#$%^&*()\-_=+{};:,<.>]{8,30}$/;
  return passwordRegex.test(password);
};