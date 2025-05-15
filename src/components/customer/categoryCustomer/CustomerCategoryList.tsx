import ComponentCard from "../../common/ComponentCard";

type Props = {
  title: string;
  className?: string;
};

const customerCategories = [
  {
    title: "Customer",
    description: "Pelanggan biasa yang mendapatkan harga normal.",
  },
  {
    title: "Reseller",
    description:
      "Customer yang mendapatkan potongan harga khusus untuk penjualan kembali.",
  },
  {
    title: "Agent",
    description:
      "Perantara yang biasanya memiliki kuota atau target penjualan tertentu.",
  },
  {
    title: "Member",
    description:
      "Customer yang telah mendaftar sebagai anggota dan mungkin mendapatkan promo atau akses khusus.",
  },
  {
    title: "Dropshiper",
    description:
      "Customer dengan harga normal, tetapi alamat pengiriman memakai data customer dropship.",
  },
];

export default function CustomerCategoryList({ title, className }: Props) {
  return (
    <>
      <ComponentCard title={title} className={className}>
        <ul className="space-y-5 text-sm">
          {customerCategories.map(({ title, description }) => (
            <li key={title} className="p-4 border rounded shadow-sm">
              <strong className="block text-base dark:text-amber-50">
                {title}
              </strong>
              <p className="text-gray-600 font-lightext-gray-500 dark:text-gray-400">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </ComponentCard>
    </>
  );
}
