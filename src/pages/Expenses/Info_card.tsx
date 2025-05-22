export default function InfoCard() {
  return (
    <div className="mt-4 border rounded-lg p-3 bg-gray-50 max-w-full md:max-w-8/12 mx-auto  text-center">
      <div className="border border-gray-400 rounded-lg p-4 bg-blue-100">
        <h2 className="text-theme-sm mb-2 text-gray-800 flex items-center justify-center">
          <span className="text-blue-500 mr-2">
            <i className="react-icons/ri">💰</i>
          </span>
          Total Pengeluaran
        </h2>
        <p className="text-gray-600 text-theme-xs">
          Ini adalah total pengeluaran dari list daftar pengeluaran yang ada.
        </p>
      </div>
    </div>
  );
}
