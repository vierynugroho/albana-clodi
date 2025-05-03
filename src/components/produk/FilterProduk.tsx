import Label from "../form/Label";
import Select from "../form/Select";

export default function FilterProduk() {
  const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };
  return (
    <div
      className={`rounded-2xl mt-5 mb-5 border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] `}
    >
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6 flex-col gap-5 ">
          <div className="flex gap-6">
            <div className="flex-1">
              <Label className="text-left">Select Input</Label>
              <Select
                options={options}
                placeholder="Select an option"
                onChange={handleSelectChange}
                className="dark:bg-dark-900"
              />
            </div>
            <div className="flex-1">
              <Label className="text-left font-bold">Select Input</Label>
              <Select
                options={options}
                placeholder="Select an option"
                onChange={handleSelectChange}
                className="dark:bg-dark-900"
              />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-1">
              <Label className="text-left">Select Input</Label>
              <Select
                options={options}
                placeholder="Select an option"
                onChange={handleSelectChange}
                className="dark:bg-dark-900"
              />
            </div>
            <div className="flex-1">
              <Label className="text-left font-bold">Select Input</Label>
              <Select
                options={options}
                placeholder="Select an option"
                onChange={handleSelectChange}
                className="dark:bg-dark-900"
              />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-1">
              <Label className="text-left">Select Input</Label>
              <Select
                options={options}
                placeholder="Select an option"
                onChange={handleSelectChange}
                className="dark:bg-dark-900"
              />
            </div>
            <div className="flex-1">
              <Label className="text-left font-bold">Select Input</Label>
              <Select
                options={options}
                placeholder="Select an option"
                onChange={handleSelectChange}
                className="dark:bg-dark-900"
              />
            </div>
          </div>
        </div>
        <hr className="mt-4 border-t-4 border-black dark:border-brand-500"/>
      </div>
    </div>
  );
}
