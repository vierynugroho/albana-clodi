import { useState } from "react";
import Input from "../../form/input/InputField.tsx";
import PrdukImage from "../../../../public/images/icons/produk_image.jpg";

const produkData = [
  { nama: "Baju Hijau Sale", harga: 95000 },
  { nama: "Gamis Brukat Sale", harga: 105000 },
  { nama: "Handuk Catur Sale", harga: 35000 },
];

function ProductList() {
  const [search, setSearch] = useState("");
  const [jumlah, setJumlah] = useState(produkData.map(() => 1));

  const handleJumlahChange = (index: number, delta: number) => {
    setJumlah((prev) => {
      const baru = [...prev];
      baru[index] = Math.max(1, baru[index] + delta);
      return baru;
    });
  };

  const handleTambah = (index: number) => {
    alert(`Menambahkan ${jumlah[index]} x ${produkData[index].nama}`);
  };

  const filteredProduk = produkData.filter((p) =>
    p.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-xl mx-auto">
      <Input
        type="text"
        placeholder="Cari produk..."
        className="w-full p-2 mb-4 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredProduk.length > 0 ? (
        filteredProduk.map((p, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white p-4 mb-3 rounded shadow">
            <img src={PrdukImage} alt="produk" className="w-12 h-12 rounded" />
            <div className="flex-1 ml-4">
              <div className="font-semibold">{p.nama}</div>
              <div className="text-sm text-gray-600">
                Rp{p.harga.toLocaleString("id-ID")}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleJumlahChange(index, -1)}
                className="px-2 bg-gray-200 rounded">
                -
              </button>
              <input
                type="text"
                readOnly
                className="w-8 text-center border rounded"
                value={jumlah[index]}
              />
              <button
                onClick={() => handleJumlahChange(index, 1)}
                className="px-2 bg-gray-200 rounded">
                +
              </button>
            </div>
            <button
              onClick={() => handleTambah(index)}
              className="ml-3 bg-blue-600 text-white px-3 py-1 rounded-lg">
              + Tambahkan
            </button>
          </div>
        ))
      ) : (
        <div className="text-gray-500 text-center mt-6">
          Tidak ada produk ditemukan.
        </div>
      )}
    </div>
  );
}

export default ProductList;
