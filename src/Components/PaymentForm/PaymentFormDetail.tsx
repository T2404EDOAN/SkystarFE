import React, { useState, useEffect } from 'react';

function PaymentFormDetail({ movieInfo }) {
  const [currentTab, setCurrentTab] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    agreeTerms: false,
    agreeCinestar: false
  });

  useEffect(() => {
    if (movieInfo) {
      setMovieDetails(movieInfo);
    }
  }, [movieInfo]);

  const [movieDetails, setMovieDetails] = useState({
    title: '',
    cinema: '',
    address: '',
    time: '',
    room: '',
    tickets: '',
    type: '',
    seat: '',
    price: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentTab(2);
  };

  const renderCustomerInfo = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Họ và tên"
          className="w-full p-3 rounded"
          required
        />
      </div>
      <div>
        <input
          type="tel"
          placeholder="Số điện thoại"
          className="w-full p-3 rounded"
          required
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="flex items-center text-white">
          <input type="checkbox" className="mr-2" required />
          <span>Đảm bảo mua vé đúng số tuổi quy định.</span>
        </label>
        <label className="flex items-center text-white">
          <input type="checkbox" className="mr-2" required />
          <span>Đồng ý với điều khoản của Cinestar</span>
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-yellow-400 py-3 rounded font-bold hover:bg-yellow-500"
      >
        TIẾP TỤC
      </button>
    </form>
  );

  const renderPaymentMethods = () => (
    <div className="space-y-4">
      <button className="w-full bg-gray-800 text-white p-4 rounded flex items-center space-x-3 hover:bg-gray-700">
        <img src="momo-icon.svg" alt="Momo" className="w-8 h-8" />
        <span>Thanh toán qua Momo</span>
      </button>
      
      <button className="w-full bg-gray-800 text-white p-4 rounded flex items-center space-x-3 hover:bg-gray-700">
        <img src="mastercard-icon.svg" alt="Thẻ nội địa" className="w-8 h-8" />
        <span>Thanh toán qua Thẻ nội địa</span>
      </button>
      
      <button className="w-full bg-gray-800 text-white p-4 rounded flex items-center space-x-3 hover:bg-gray-700">
        <img src="card-icon.svg" alt="Thẻ quốc tế" className="w-8 h-8" />
        <span>Thanh toán qua thẻ quốc tế</span>
      </button>

      <div className="bg-blue-600 p-4 rounded flex items-center space-x-2">
        <span className="text-yellow-400">🏷️</span>
        <span className="text-white">Chọn hoặc nhập mã giảm giá</span>
      </div>

      <div className="flex space-x-4">
        <button 
          onClick={() => setCurrentTab(1)}
          className="w-1/2 bg-yellow-400 py-3 rounded font-bold hover:bg-yellow-500"
        >
          QUAY LẠI
        </button>
        <button 
          className="w-1/2 bg-gray-600 py-3 rounded font-bold text-white hover:bg-gray-700"
        >
          THANH TOÁN
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-white text-2xl font-bold mb-8">TRANG THANH TOÁN</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side */}
          <div className="w-full md:w-1/2">
            <div className="steps flex justify-between mb-8">
              <div className={`${currentTab === 1 ? 'text-yellow-400' : 'text-white'}`}>
                <span className="mr-2">1</span>
                <span>THÔNG TIN KHÁCH HÀNG</span>
              </div>
              <div className={`${currentTab === 2 ? 'text-yellow-400' : 'text-white'}`}>
                <span className="mr-2">2</span>
                <span>THANH TOÁN</span>
              </div>
              <div className="text-white">
                <span className="mr-2">3</span>
                <span>THÔNG TIN VÉ PHIM</span>
              </div>
            </div>

            {currentTab === 1 ? renderCustomerInfo() : renderPaymentMethods()}
          </div>

          {/* Right side - Movie Info */}
          <div className="w-full md:w-1/2">
            <div className="bg-blue-600 p-6 rounded-lg text-white">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{movieDetails.title}</h2>
                <div className="bg-yellow-400 text-black px-3 py-1 rounded">
                  04:47
                </div>
              </div>
              <p className="text-sm mb-1">Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)</p>
              <h3 className="font-bold mb-1">{movieDetails.cinema}</h3>
              <p className="text-sm mb-4">{movieDetails.address}</p>
              
              <div className="space-y-2">
                <p><span className="text-yellow-400">Thời gian:</span> {movieDetails.time}</p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-yellow-400">Phòng chiếu</p>
                    <p>{movieDetails.room}</p>
                  </div>
                  <div>
                    <p className="text-yellow-400">Số vé</p>
                    <p>{movieDetails.tickets}</p>
                  </div>
                  <div>
                    <p className="text-yellow-400">Loại vé</p>
                    <p>{movieDetails.type}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-yellow-400">Loại ghế</p>
                    <p>Ghế Đôi</p>
                  </div>
                  <div>
                    <p className="text-yellow-400">Số ghế</p>
                    <p>{movieDetails.seat}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <p className="font-bold">SỐ TIỀN CẦN THANH TOÁN</p>
                  <p className="font-bold">{movieDetails.price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentFormDetail;