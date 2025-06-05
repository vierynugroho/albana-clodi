import { TReceiptData } from "../../../service/order/print/order.type";
import InvoicePreview from "./InvoicePreview";
import ShippingPreview from "./ShippingPreview";
import ThermalPreview from "./ThermalPreview";

interface PreviewOutputProps {
  selectedFeature: string;
  selectedFeatures: string[];
  data?: TReceiptData;
  className?: string;
}

export const PreviewOutput: React.FC<PreviewOutputProps> = ({
  selectedFeature,
  selectedFeatures,
  data,
  className = "",
}) => {
  const renderPreview = () => {
    switch (selectedFeature) {
      case "shipping":
        return <ShippingPreview features={selectedFeatures} data={data} />;
      case "invoice":
        return <InvoicePreview features={selectedFeatures} data={data} />;
      case "thermal-58":
        return <ThermalPreview features={selectedFeatures} data={data} />;
      default:
    }
  };

  return (
    <div className={`bg-white border dark:bg-white/[0] dark:border-gray-700 dark:text-gray-300 border-black ${className}`}>
      {renderPreview()}
    </div>
  );
};
