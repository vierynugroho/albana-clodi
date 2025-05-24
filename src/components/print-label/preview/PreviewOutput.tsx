import InvoicePreview from "./InvoicePreview";
import ShippingPreview from "./ShippingPreview";
import ThermalPreview from "./ThermalPreview";

interface PreviewOutputProps {
  selectedFeature: string;
  selectedFeatures: string[];
}

export const PreviewOutput: React.FC<PreviewOutputProps> = ({ selectedFeature, selectedFeatures }) => {
  const renderPreview = () => {
    switch (selectedFeature) {
      case "shipping":
        return <ShippingPreview features={selectedFeatures} />;
      case "invoice":
        return <InvoicePreview features={selectedFeatures} />;
      case "thermal-56":
        return <ThermalPreview features={selectedFeatures} />;
      default:
    }
  };

  return (
    <div className="bg-white border border-black inline-block">
      {renderPreview()}
    </div>
  );
};
