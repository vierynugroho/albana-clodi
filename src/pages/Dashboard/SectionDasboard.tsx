import { FaUserTimes } from 'react-icons/fa';
import { FaPeopleCarryBox } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import Button from '../../components/ui/button/Button';
import IconsCourier from '../../icons/choose-courier.svg';
import { useNavigate } from 'react-router';
import { getOrders, OrderItem } from '../../service/order';
import { useEffect, useState } from 'react';

function formatToReadableDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function SectionDasboard() {
  const [orderPending, setOrderPending] = useState<OrderItem[]>([]);
  const [orderInstallment, setOrderInstallment] = useState<OrderItem[]>([]);

  const getGreeting = () => {
    const now = new Date();
    const options = { timeZone: 'Asia/Jakarta' };
    const jakartaTime = new Date(now.toLocaleString('en-US', options));
    const hour = jakartaTime.getHours();

    let greeting = '';
    if (hour < 12) greeting = 'Selamat Pagi';
    else if (hour < 15) greeting = 'Selamat Siang';
    else if (hour < 18) greeting = 'Selamat Sore';
    else greeting = 'Selamat Malam';

    return greeting;
  };

  const getFullDate = () => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];

    const now = new Date();
    const dayName = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    return `${dayName}, ${date} ${month} ${year}`;
  };

  const navigate = useNavigate();

  useEffect(() => {
    const functionGePendingOrders = async () => {
      const result = await getOrders({
        paymentStatus: 'PENDING',
        order: 'desc',
      });

      if (result.success && result.responseObject) {
        const data = Array.isArray(result.responseObject)
          ? (result.responseObject as OrderItem[])
          : [];
        setOrderPending(data);
      } else {
        setOrderPending([]);
      }
    };

    const functionGetinstallmentsOrders = async () => {
      const result = await getOrders({
        paymentStatus: 'INSTALLMENTS',
        order: 'desc',
      });

      if (result.success && result.responseObject) {
        const data = Array.isArray(result.responseObject)
          ? (result.responseObject as OrderItem[])
          : [];
        setOrderInstallment(data);
      } else {
        setOrderInstallment([]);
      }
    };

    functionGePendingOrders();
    functionGetinstallmentsOrders();
  }, []);

  return (
    <div className="space-y-6 pl-3 lg:pl-3 ">
      <div className="px-4 py-3 bg-white rounded-xl shadow dark:bg-gray-800 dark:text-white">
        <h3 className="my-2 text-md font-semibold text-gray-800 dark:text-white flex items-center">
          <span className="mr-2">👋</span> {getGreeting()}{' '}
          {JSON.parse(localStorage.getItem('user') || '{}').fullname || 'User'}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{getFullDate()}</p>
      </div>

      <div className="px-4 py-1 bg-white rounded-xl shadow dark:bg-gray-800 dark:text-white">
        <div className="p-4 bg-red-50 dark:bg-red-800 rounded-lg mt-4">
          <div className="flex justify-between">
            <div className="mx-1">
              <h3 className="text-theme-sm font-medium text-gray-800 dark:text-white">
                Order Belum Lunas
              </h3>
              <span className="py-2 text-2xl font-bold text-red-400 dark:text-white">
                {orderInstallment.length}
              </span>
            </div>
            <FaUserTimes className="text-red-400 dark:dark:text-white/90 size-6 my-3" />
          </div>
        </div>

        {orderInstallment.length === 0 && (
          <div className="flex items-center justify-center h-48">
            <p className="text-theme-sm font-medium text-gray-500 dark:text-gray-300">
              Tidak ada Order Yang Belum Lunas
            </p>
          </div>
        )}

        {orderInstallment.map((order, index) => {
          if (index === 3) return null;

          return (
            <div key={order.id} className="w-full my-2">
              <div className="flex justify-between">
                <div className="my-2">
                  <h4 className="text-theme-sm font-medium text-gray-800 dark:text-white">
                    {order.OrderDetail.code}
                  </h4>
                  <p className="text-theme-xs text-gray-500 dark:text-gray-300">
                    {order.OrdererCustomer.name}
                  </p>
                </div>
                <span className="text-theme-xs text-gray-400 dark:text-gray-500 my-2">
                  {formatToReadableDate(order.createdAt)}
                </span>
              </div>
              <hr className="border-gray-300 dark:border-gray-700 pt-2" />
            </div>
          );
        })}

        <div className="flex items-center justify-end mt-2 font-semibold text-blue-600 my-2.5">
          <p
            className="text-theme-sm font-semibold cursor-pointer"
            onClick={() => {
              navigate('/order?paymentStatus=INSTALLMENTS&order=desc');
            }}
          >
            Lihat Semua
          </p>
          <IoIosArrowForward />
        </div>
      </div>

      <div className="px-4 py-1 bg-white rounded-xl shadow dark:bg-gray-800 dark:text-white">
        <div className="p-4 bg-yellow-50 dark:bg-yellow-800 rounded-lg mt-4">
          <div className="flex justify-between">
            <div className="mx-1">
              <h3 className="text-theme-sm font-medium text-gray-800 dark:text-white">
                Order Belum Diproses
              </h3>
              <span className="py-2 text-2xl font-bold text-yellow-500 dark:text-white">
                {orderPending.length}
              </span>
            </div>
            <FaPeopleCarryBox className="text-yellow-500 size-6 dark:text-white/90 my-3" />
          </div>
        </div>

        {orderPending.map((order, index) => {
          if (index === 3) return null;

          return (
            <div key={order.id} className="w-full my-2">
              <div className="flex justify-between">
                <div className="my-2">
                  <h4 className="text-theme-sm font-medium text-gray-800 dark:text-white">
                    {order.OrderDetail.code}
                  </h4>
                  <p className="text-theme-xs text-gray-500 dark:text-gray-300">
                    {order.OrdererCustomer.name}
                  </p>
                </div>
                <span className="text-theme-xs text-gray-400 dark:text-gray-500 my-2">
                  {formatToReadableDate(order.createdAt)}
                </span>
              </div>
              <hr className="border-gray-300 dark:border-gray-700 pt-2" />
            </div>
          );
        })}

        <div className="flex items-center justify-end mt-2 font-semibold text-blue-600 my-2.5">
          <p
            className="text-theme-sm font-semibold"
            onClick={() => {
              navigate('/order?paymentStatus=PENDING&order=desc');
            }}
          >
            Lihat Semua
          </p>

          <IoIosArrowForward />
        </div>
      </div>

      <div className="px-4 py-3 bg-white rounded-xl shadow dark:bg-gray-800 dark:text-white">
        <h3 className="my-2 text-md font-semibold text-gray-800 dark:text-white">
          Atur Profil Pengguna
        </h3>
        <div className="flex justify-center my-4">
          <img
            src={IconsCourier}
            alt="Ilustrasi Profil"
            className="w-32 h-32 object-contain"
          />
        </div>
        <p className="text-theme-sm text-gray-500 dark:text-gray-300">
          Anda dapat mengatur informasi profil pengguna, termasuk data pribadi, preferensi,
          dan pengaturan akun Anda.
        </p>
        <div className="flex items-center mt-4">
          <Button
            className="w-full h-9 bg-blue-500 text-white font-normal py-2 rounded-lg"
            onClick={() => navigate('/profile')}
          >
            Atur Profil
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SectionDasboard;