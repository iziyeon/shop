import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';

import { cartState, cartTotalSelector } from '../../recoil/cart';

interface CheckoutFormProps {
  onClose: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const setCart = useSetRecoilState(cartState);
  const cartTotal = useRecoilValue(cartTotalSelector);
  const shippingFee = cartTotal >= 50 ? 0 : 10;
  const totalWithShipping = cartTotal + shippingFee;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Korea',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // 에러 메시지 지우기
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName) newErrors.firstName = '이름을 입력해주세요';
    if (!formData.lastName) newErrors.lastName = '성을 입력해주세요';
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = '유효한 이메일을 입력해주세요';
    if (!formData.address) newErrors.address = '주소를 입력해주세요';
    if (!formData.city) newErrors.city = '도시를 입력해주세요';
    if (!formData.postalCode) newErrors.postalCode = '우편번호를 입력해주세요';
    
    // 카드 정보 검증
    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = '유효한 카드번호를 입력해주세요';
    }
    if (!formData.cardName) newErrors.cardName = '카드에 표시된 이름을 입력해주세요';
    if (!formData.expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = '유효한 만료일을 입력해주세요 (MM/YY)';
    }
    if (!formData.cvv || !/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = '유효한 CVV를 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // 결제 프로세스 시뮬레이션
    try {
      // 실제로는 여기서 결제 API 호출
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 결제 성공
      toast.success('결제가 성공적으로 처리되었습니다!');
      setCart([]); // 장바구니 비우기
      onClose();
      navigate('/'); // 홈으로 이동
    } catch (error) {
      toast.error('결제 처리 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-4">배송 정보</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">이름</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 ${errors.firstName ? 'border-red-500' : ''}`}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">성</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 ${errors.lastName ? 'border-red-500' : ''}`}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>
        
        <div className="mt-4">
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
        
        <div className="mt-4">
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
        
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">카드 소유자 이름</label>
          <input
            type="text"
            name="cardName"
            value={formData.cardName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 ${errors.cardName ? 'border-red-500' : ''}`}
          />
          {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">만료일 (MM/YY)</label>
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 ${errors.expiryDate ? 'border-red-500' : ''}`}
            />
            {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CVV</label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="123"
              className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 ${errors.cvv ? 'border-red-500' : ''}`}
              maxLength={4}
            />
            {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex justify-between mb-2">
          <span>상품 금액:</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>배송비:</span>
          <span>{shippingFee === 0 ? '무료' : `$${shippingFee.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg mt-4">
          <span>총 결제 금액:</span>
          <span>${totalWithShipping.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
          disabled={isSubmitting}
        >
          취소
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="inline-block animate-spin mr-2">⟳</span> 처리 중...
            </>
          ) : (
            '결제 완료하기'
          )}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
