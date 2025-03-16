export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8 && 
    /[A-Z]/.test(password) && 
    /[a-z]/.test(password) && 
    /[0-9]/.test(password);
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
  return phoneRegex.test(phone);
};

export const validators = {
  required: (value: unknown) => {
    if (value === null || value === undefined || value === '') {
      return '필수 입력 항목입니다';
    }
    return '';
  },

  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return '올바른 이메일 형식이 아닙니다';
    }
    return '';
  },

  minLength: (value: string, min: number) => {
    if (value.length < min) {
      return `최소 ${min}자 이상 입력해주세요`;
    }
    return '';
  },

  price: (value: number) => {
    if (value <= 0) {
      return '가격은 0보다 커야 합니다';
    }
    return '';
  }
};
