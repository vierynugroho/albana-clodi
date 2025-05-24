import React from "react";
import Logo from "../../../../public/images/logo/albana-clodi-logo.svg";

const items = [
    {
        name: 'Celia Blouse by Fee Fashion All size',
        discount: 'Diskon 20%',
        originalPrice: 'Rp79.900',
        discountedPrice: 'Rp63.920',
        code: 'CBB-ISP',
        weight: '0.3 Kg',
        subtotal: 'Rp63.920',
        qty: 1,
    },
    {
        name: 'Mikha Wallet by Gabia',
        discount: 'Diskon 30%',
        originalPrice: 'Rp45.000',
        discountedPrice: 'Rp31.500',
        code: 'MWB-PBB',
        weight: '0.2 Kg',
        subtotal: 'Rp31.500',
        qty: 1,
    },
    {
        name: 'Ilia bag by gabia',
        discount: 'Diskon 30%',
        originalPrice: 'Rp75.000',
        discountedPrice: 'Rp52.500',
        code: 'LBB-MEV',
        weight: '0.25 Kg',
        subtotal: 'Rp52.500',
        qty: 1,
    },
]

const rekening = [
    {
        bank: 'BCA',
        number: '2141341341431',
        owner: 'Nama Pemilik Rekening',
    },
    {
        bank: 'BNI',
        number: '1234567890123',
        owner: 'John Doe',
    },
    {
        bank: 'Mandiri',
        number: '9876543210987',
        owner: 'Jane Smith',
    },
];

export interface InvoicePreviewProps {
    features: string[];
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ features }) => {
    const has = (key: string) => features.includes(key);

    return (
        <div className="text-sm">
            <div className="grid grid-cols-12 gap-4 gap-x-8 p-5">
                <div className="col-span-9 flex items-start gap-5">
                    <img src={Logo} alt="" className="w-20" />
                    <div>
                        <div className="font-bold text-2xl">ALBANA GROSIR</div>
                        <div>
                            Mitra distributor lebih dari 200 brand. Menyediakan family
                            fashion, mukena, tas, sandal, sepatu, perlengkapan bayi, dll.
                        </div>
                    </div>
                </div>
                <div className="col-span-3 flex flex-col gap-3">
                    <div className="space-y-1">
                        <div className="font-bold">Tanggal :</div>
                        <div>21 Mei 2025</div>
                    </div>
                    <div className="space-y-1">
                        <div className="font-bold">Nomor Invoice :</div>
                        <div>INV23412342345245</div>
                    </div>
                    {has("Nama Admin") && (
                        <div className="space-y-1">
                            <div className="font-bold">Admin :</div>
                            <div>21 Mei 2025</div>
                        </div>
                    )}
                </div>
                <div className="col-span-9 space-y-1">
                    <div className="font-bold">
                        Kepada <span>Nama Penerima</span>
                    </div>
                    <div>
                        Terima kasih telah berbelanja di ALBANA GROSIR. Berikut adalah
                        rincian orderan Anda:
                    </div>
                </div>
                <div className="col-span-3 font-bold">
                    <span className="text-green-500">PAID</span> ( 21 Mei 2025 )
                </div>
            </div>
            <table className="w-full border border-black">
                <thead className="bg-black text-white">
                    <tr>
                        <th className="text-left p-2">Nama Produk</th>
                        <th className="p-2"></th>
                        <th className="p-2">Jumlah</th>
                        <th className="p-2">{has("Kolom Berat") ? "Berat" : ""}</th>
                        <th className="p-2">Harga</th>
                        <th className="p-2">Subtotal</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {/* List Order  */}
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td className="p-2">
                                <div className="flex gap-2">
                                    <span>{item.name}</span>
                                    <span className="text-sm text-red-500">( {item.discount} )</span>
                                </div>
                            </td>
                            <td className="text-end">{has("SKU") ? item.code : ""}</td>
                            <td className="text-center">{item.qty}</td>
                            <td className="text-center">{has("Kolom Berat") ? item.weight : ""}</td>
                            <td className="text-center justify-center flex gap-2">
                                <span className="line-through text-gray-400">{item.originalPrice}</span><br />
                                <span className="text-red-500">{item.discountedPrice}</span>
                            </td>
                            <td className="text-end px-2">{item.subtotal}</td>
                        </tr>
                    ))}
                    {/* Extra Info */}
                    <tr className="border-t">
                        <td colSpan={5} className="p-2 font-medium">
                            {has("Ekspedisi") ? "JNT" : "Ekspedisi"}
                        </td>
                        <td className="text-end px-2">Rp0</td>
                    </tr>
                    {has("Diskon") && (
                        <tr>
                            <td colSpan={5} className="p-2 font-medium">Diskon</td>
                            <td className="text-end px-2">Rp0</td>
                        </tr>
                    )}
                    {has("Asuransi") && (
                        <tr>
                            <td colSpan={5} className="p-2 font-medium">Asuransi</td>
                            <td className="text-end px-2">Rp0</td>
                        </tr>
                    )}
                    {has("Biaya Tambahan") && (
                        <tr>
                            <td colSpan={5} className="p-2 font-medium">Biaya Tambahan</td>
                            <td className="text-end px-2">Rp0</td>
                        </tr>
                    )}
                    <tr className="border-b font-bold">
                        <td colSpan={2} className="p-2">TOTAL</td>
                        {has("Total Item") && (
                        <td className="p-2 text-center">1</td>
                        )}
                        <td colSpan={4} className="text-right px-2 text-red-600">Rp147.920</td>
                    </tr>
                    {/* Rekening  */}
                    {has("Nomor Rekening") && (
                        <tr>
                            <td className="p-2 grid grid-cols-3">
                                <div>Rekening Pembayaran</div>
                                <div className="col-span-2 flex flex-col gap-3">
                                    {rekening.map((rek, index) => (
                                        <div key={index} className="space-y-1">
                                            <div className="text-lg font-bold">{rek.bank}</div>
                                            <div>No Rekening <span>{rek.number}</span></div>
                                            <div>A.n. {rek.owner}</div>
                                        </div>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    )}
                    {/* Alamat Pengiriman  */}
                    {has("Alamat Pengiriman") && (
                        <tr>
                            <td className="p-2 grid grid-cols-3">
                                <div>Alamat Pengiriman :</div>
                                <div className="col-span-2 space-y-1">
                                    <div className="font-bold text-lg">Nama Penerima</div>
                                    <div>Alamt Penerima</div>
                                    <div>021312</div>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default InvoicePreview;