import React from 'react';
import Logo from '../../../../public/images/logo/albana-clodi-logo.svg';

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

export interface ThermalPreviewProps {
    features: string[]
}

const ThermalPreview: React.FC<ThermalPreviewProps> = ({ features }) => {
    const has = (key: string) => features.includes(key);

    return (
        <div className='font-mono px-1 w-64 py-5 text-[10px] space-y-3'>
            <div className='px-4 flex flex-col justify-center items-center text-center space-y-3'>
                {has("Logo") && (
                    <img src={Logo} alt="" className='w-2/3' />
                )}
                {has("Nama Toko") && (
                    <div>ALBANA GROSIR</div>
                )}
                {has("Keterangan Toko") && (
                    <div>
                        Mitra distributor lebih dari 200 brand. Menyediakan family fashion, mukena, tas, sandal, sepatu, perlengkapan bayi, dll.
                    </div>
                )}
                {has("Alamat Toko") && (
                    <div>
                        Perum BTN Asabri Gedog Blok H-19 Kec.sananwetan Kota Blitar 66132
                    </div>
                )}
            </div>
            <hr className="border-t border-black border-dashed my-2" />
                {has("Input Time")
                    ? <div>Date : 21 Mei 2025 13:47:51</div>
                    : <div>Status : PAID 21 Mei 2025</div>}
                {has("Detail Invoice") && (
                    <>
                        <div>Invoice : INV.13241234</div>
                        <div>13:46:32</div>
                    </>
                )}
            <hr className="border-t border-black border-dashed my-2" />
            <div className="grid grid-cols-4 gap-2 text-center">
                <span>Produk</span>
                <span>Qty</span>
                <span>Harga</span>
                <span>Subtotal</span>
            </div>
            <hr className="border-t border-black border-dashed my-2" />
            {items.map((item, i) => (
                <div key={i} className="space-y-1">
                    <div className="grid grid-cols-12 items-end">
                        <span className='col-span-5'>{item.name}</span>
                        <span>{item.qty}</span>
                        <span className='col-span-3'>{item.discountedPrice}</span>
                        <span className='col-span-3'>{item.subtotal}</span>
                    </div>
                    {has("SKU") && <div>KODE SKU</div>}
                </div>
            ))}
            <hr className="border-t border-black border-dashed my-2" />
            <div className='flex justify-between'>
                <span>JNT</span>
                <span>0</span>
                <span>0</span>
            </div>
            {has("Diskon") &&
                <div className='flex justify-between'>
                    <span>Diskon</span>
                    <span>0</span>
                </div>
            }
            {has("Asuransi") &&
                <div className='flex justify-between'>
                    <span>Asuransi</span>
                    <span>0</span>
                </div>
            }
            {has("Biaya Tambahan") &&
                <div className='flex justify-between'>
                    <span>Biaya Tambahan</span>
                    <span>0</span>
                </div>
            }
            <hr className="border-t border-black border-dashed my-2" />
            <div className='flex justify-between'>
                <span>Total</span>
                {has("Total Item") && <span>1</span>}
                <span>Rp147.920</span>
            </div>
            <hr className="border-t border-black border-dashed my-2" />
            {has("Nomor Rekening") && (
                <>
                    <div>Rekening Pembayaran</div>
                    {rekening.map((account, index) => (
                        <div key={index} className="space-y-1">
                            <div>Bank: {account.bank}</div>
                            <div>No.Rek: {account.number}</div>
                            <div>A.n. {account.owner}</div>
                        </div>
                    ))}
                    <div className="border-t border-dashed border-black my-2" />
                </>
            )}
            {has("Alamat Pengiriman") && (
                <>
                    <div>Alamat Pengiriman:</div>
                    <div className='space-y-1'>
                        <div>Perum BTN Asabri Gedog Blok H-19 Kec.sananwetan Kota Blitar 66132</div>
                        <div>Telp: 085648487917</div>
                    </div>
                </>
            )}
            <div>Kurir: JNT</div>
            {has("Nomor Resi") && <div>No Resi: 1234567890</div>}
            <div className="border-t border-dashed border-black my-2" />
            {has("Nama Admin") && (
                <>
                    <div>
                        <div>Admin:</div>
                        <div>Beta Nurul</div>
                    </div>
                    <div className="border-t border-dashed border-black my-2" />
                </>
            )}
            {has("Gudang") && (
                <>
                    <div>
                        Gudang: Gudang Utama
                    </div>
                    <div className="border-t border-dashed border-black my-2" />
                </>
            )}
            <div className='text-center'>
                Terimakasih <br /> telah belanja di <br /> ALBANA GROSIR
            </div>
        </div>
    )
}

export default ThermalPreview;