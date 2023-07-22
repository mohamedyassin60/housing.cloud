const filters = [
  {
    id: "price",
    name: "Price Range",
    options: [
      { value: "0", label: "Min", checked: false },
      { value: "0", label: "Max", checked: false },
    ],
  },
  {
    id: "bedrooms",
    name: "Bedrooms",
    options: [
      { value: "1", label: "1", checked: false },
      { value: "2", label: "2", checked: false },
      { value: "3", label: "3", checked: false },
      { value: "4", label: "4", checked: false },
      { value: "5", label: "5+", checked: false },
    ],
  },
  {
    id: "distance",
    name: "Distance to Campus",
    options: [
      { value: "100", label: "<100m", checked: false },
      { value: "200", label: "100m - 200m", checked: false },
      { value: "300", label: "200m - 300m", checked: false },
      { value: "400", label: "300m - 400m", checked: false },
      { value: "500", label: "400m - 500m", checked: false },
      { value: "-1", label: ">500m", checked: false },
    ],
  },
];

export default function Filters() {
  return (
    <form className="min-w-min">
      <h3 className="font-semibold">Filters</h3>
      {filters.map((section) => (
        <div key={section.id} className="border-b border-gray-200 py-6">
          <h3 className="-my-3 flow-root">
            <div className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">{section.name}</span>
            </div>
          </h3>
          <div className="space-y-4 pt-6">
            {section.options.map((option, optionIdx) => (
              <div key={option.value} className="flex items-center">
                {section.id === "price" ? (
                  <div className="flex flex-col">
                    <label
                      htmlFor={`filter-${section.id}-${optionIdx}`}
                      className="mb-2 text-sm text-gray-600"
                    >
                      {option.label} ($)
                    </label>
                    <input
                      id={`filter-${section.id}-${optionIdx}`}
                      name={`${section.id}-${optionIdx}`}
                      type="number"
                      step={50}
                      placeholder={option.label}
                      className="rounded-md border border-gray-300 px-2 py-1"
                    />
                  </div>
                ) : (
                  <>
                    <input
                      id={`filter-${section.id}-${optionIdx}`}
                      name={`${section.id}[]`}
                      defaultValue={option.value}
                      type="checkbox"
                      defaultChecked={option.checked}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`filter-${section.id}-${optionIdx}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {option.label}
                    </label>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </form>
  );
}
