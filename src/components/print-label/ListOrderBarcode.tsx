import Barcode from "react-barcode";

interface OrderItem {
    name: string;
    code: string;
    quantity: number;
}

interface OrderLabelProps {
    date: string;
    items: OrderItem[];
    selectedShippingFields: string[];
}

const OrderLabel: React.FC<OrderLabelProps> = ({ date, items, selectedShippingFields }) => {
    const has = (feature: string) => selectedShippingFields.includes(feature);
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div style={{ fontFamily: "Arial, sans-serif", fontSize: "14px" }}>
            <p style={{ fontWeight: "bold" }}>Order
                {has("Tanggal Order") && (
                    <span> ({date}) </span>
                )}
            </p>
            {items.map((item, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                    {has("Item Produk") && (
                        <div className="flex justify-between">
                            <span>- {item.name}</span>
                            <span>x {item.quantity}</span>
                        </div>
                    )}
                    {has("Barcode SKU") && (
                        <Barcode
                            value={item.code}
                            width={1.5}
                            height={30}
                            fontSize={12}
                            displayValue={has("Barcode SKU Text")}
                        />
                    )}
                    {has("Barcode SKU Text") && <div>{item.code}</div>}
                </div>
            ))}
            {has("Total Item") && (
                <p style={{ fontWeight: "bold" }}>
                    Total Item: <span style={{ float: "right" }}>{totalQuantity}</span>
                </p>
            )}
        </div>
    );
};

export default OrderLabel;
