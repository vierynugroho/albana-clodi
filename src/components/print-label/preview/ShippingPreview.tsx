import React from 'react';
import Logo from '../../../../public/images/logo/albana-clodi-logo.svg';
import Fragile from '../../../../public/images/icons/fragile.png';
import Barcode from 'react-barcode';
import OrderLabel from '../ListOrderBarcode';

const items = [
    { name: "Celia Blouse by Fee Fashion All size", code: "CBB-ISP", quantity: 1 },
    { name: "Mikha Wallet by Gabia", code: "MWB-PBB", quantity: 1 },
    { name: "lila bag by gabia", code: "LBB-MEV", quantity: 1 },
];

export interface ShippingPreviewProps {
    features: string[];
}

const ShippingPreview: React.FC<ShippingPreviewProps> = ({ features }) => {
    const has = (key: string) => features.includes(key);

    return (
        <div className='grid grid-cols-12 gap-4 gap-x-8 p-5 text-sm'>
            {/* Logo dan Shop Info */}
            {(has("Shop Logo") || has("Shop Info")) && (
                <div className='col-span-2 flex flex-col items-center justify-center text-center space-y-2'>
                    {has("Shop Logo") && <img src={Logo} alt="Logo" className='w-20 h-20' />}
                    {has("Shop Info") && (
                        <>
                            <div>ALBANA GROSIR</div>
                            <div>
                                Mitra distributor lebih dari 200 brand. Menyediakan family fashion,
                                mukena, tas, sandal, sepatu, perlengkapan bayi, dll.
                            </div>
                        </>
                    )}
                </div>
            )}
            {/* PO dan Detail Tujuan */}
            <div className='col-span-3 flex flex-col justify-between'>
                <div className='space-y-5'>
                    {has("No. PO") && <div className='text-lg'>PO#57909</div>}

                    <div className='space-y-2'>
                        <div className='font-semibold text-base'>Kepada</div>
                        <div className='text-base'>Putri</div>
                        <div>
                            Nanggungan RT 02 RW 07 Desa Kaloran, Kec. Ngronggot, Kabupaten Nganjuk, 64395
                            Provinsi Jawa Timur
                        </div>
                        <div>Telp. 082173237189</div>
                    </div>

                </div>

                <div className='space-y-5'>
                    <div className='space-y-2'>
                        <div className='font-bold'>Pengirim</div>
                        <div>ALBANA GROSIR</div>
                        <div>085648487917</div>
                    </div>

                    {has("Warehouse") && (
                        <div className='space-y-2'>
                            <div className='font-bold'>Warehouse</div>
                            <div>-</div>
                        </div>
                    )}

                    {has("Nama Admin") && (
                        <div className='space-y-2'>
                            <div className='font-bold'>Admin</div>
                            <div>Beta Nurul</div>
                        </div>
                    )}
                </div>
            </div>
            <div></div>
            {/* Detail Items Pembelian dan Resi  */}
            <div className='col-span-4 space-y-5'>
                <div className='space-y-1'>
                    {has("Barcode PO") && (
                        <div className='flex justify-end'>
                            <Barcode value="PO#57909" height={35} width={2} displayValue={false} />
                        </div>
                    )}
                    {has("Detail Order") &&
                        <OrderLabel
                            date="21 Mei 2025"
                            items={items}
                            selectedShippingFields={features}
                        />
                    }


                </div>

                {(has("Ekspedisi") || has("Nominal Ekspedisi") || has("No Resi") || has("Barcode No Resi")) && (
                    <div className='flex flex-col gap-2'>
                        {(has("Ekspedisi") || has("Nominal Ekspedisi")) && (
                            <div className='border font-semibold border-black p-3 w-fit space-y-1'>
                                {has("Ekspedisi") && <div>JNT (1 Kg)</div>}
                                {has("Nominal Ekspedisi") && <div>Biaya Kirim : Rp0</div>}
                            </div>
                        )}

                        {(has("No Resi") || has("Barcode No Resi")) && (
                            <div className='border font-semibold border-black p-3 w-fit'>
                                {has("No Resi") && <div>NO RESI : 124134123423542</div>}
                                {has("Barcode No Resi") && (
                                    <Barcode value='123123413413412' height={50} width={2} displayValue={false} />
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
            {/* Fragile */}
            {has("Fragile Sign") && (
                <div className='col-span-2 flex flex-col justify-center items-center'>
                    <img src={Fragile} alt="Fragile" />
                    <div className='font-bold text-3xl'>FRAGILE</div>
                    <div>JANGAN DIBANTING!!!!</div>
                </div>
            )}
        </div>
    );
};

export default ShippingPreview;
