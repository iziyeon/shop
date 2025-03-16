import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface CheckoutFormProps {
  onComplete: () => void;
  onClose?: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

interface FormErrors {
  [key: string]: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onComplete, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Korea',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // 입력 시 해당 필드의 에러 메시지 제거
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // 필수 필드 검증
    if (!formData.fullName.trim()) newErrors.fullName = '이름을 입력해주세요';
    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요';
    }
    if (!formData.address.trim()) newErrors.address = '주소를 입력해주세요';
    if (!formData.city.trim()) newErrors.city = '도시를 입력해주세요';
    if (!formData.postalCode.trim()) newErrors.postalCode = '우편번호를 입력해주세요';
    
    // 카드 정보 검증
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = '카드 번호를 입력해주세요';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = '유효한 카드 번호를 입력해주세요';
    }
    
    if (!formData.cardExpiry.trim()) {
      newErrors.cardExpiry = '만료일을 입력해주세요';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry)) {
      newErrors.cardExpiry = 'MM/YY 형식으로 입력해주세요';
    }
    
    if (!formData.cardCvc.trim()) {
      newErrors.cardCvc = 'CVC를 입력해주세요';
    } else if (!/^\d{3,4}$/.test(formData.cardCvc)) {
      newErrors.cardCvc = '유효한 CVC를 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // 결제 처리 시뮬레이션
      setTimeout(() => {
        toast.success('결제가 완료되었습니다!');
        setIsSubmitting(false);
        onComplete();
      }, 1500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">배송 정보</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">이름</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 ${errors.fullName ? 'border-red-500' : ''}`}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">이메일</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">주소</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 ${errors.address ? 'border-red-500' : ''}`}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">도시</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 ${errors.city ? 'border-red-500' : ''}`}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">우편번호</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 ${errors.postalCode ? 'border-red-500' : ''}`}
              />
              {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium mb-1">국가</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="Korea">대한민국</option>
                <option value="USA">미국</option>
                <option value="Japan">일본</option>
                <option value="China">중국</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-4">결제 정보</h4>
        <div>
          <label className="block text-sm font-medium mb-1">카드 번호</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 ${errors.cardNumber ? 'border-red-500' : ''}`}
          />
          {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">만료일 (MM/YY)</label>
            <input
              type="text"
              name="cardExpiry"
              value={formData.cardExpiry}
              onChange={handleChange}
              placeholder="12/25"
              className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 ${errors.cardExpiry ? 'border-red-500' : ''}`}
            />
            {errors.cardExpiry && <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CVC</label>
            <input
              type="text"
              name="cardCvc"
              value={formData.cardCvc}
              onChange={handleChange}
              placeholder="123"
              className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 ${errors.cardCvc ? 'border-red-500' : ''}`}
            />
            {errors.cardCvc && <p className="text-red-500 text-xs mt-1">{errors.cardCvc}</p>}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
          >
            취소
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? '처리 중...' : '결제 완료'}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
