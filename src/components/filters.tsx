import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const bedroomOptions = [
  { value: "0", label: "Any" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7+" },
];

const distanceOptions = [
  { value: "100", label: "0 - 100m" },
  { value: "200", label: "100m - 200m" },
  { value: "300", label: "200m - 300m" },
  { value: "400", label: "300m - 400m" },
  { value: "500", label: "400m - 500m" },
  { value: "501", label: "500m +" },
];

export const filtersSchema = z.object({
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  bedrooms: z.number().min(0).max(7).optional(),
  distance: z.array(z.string()).optional(),
});

type FiltersProps = {
  setFilters: Dispatch<SetStateAction<z.infer<typeof filtersSchema>>>;
};

function Filters({ setFilters }: FiltersProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof filtersSchema>>({
    resolver: zodResolver(filtersSchema),
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldUseNativeValidation: false,
  });

  const watchFilters = watch();

  useEffect(() => {
    const _filters = { ...watchFilters };
    (Object.keys(_filters) as Array<keyof typeof _filters>).forEach((key) => {
      if (!!errors[key]) _filters[key] = undefined;
      if (!_filters.distance) _filters.distance = undefined;
    });
    setFilters(_filters);
  }, [watchFilters, errors]);

  return (
    <form className="min-w-min">
      <h3 className="font-semibold">Filters</h3>

      <div className="border-b border-gray-200 py-6">
        <h3 className="-my-3 flow-root">
          <div className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
            <span className="font-medium text-gray-900">Price Range</span>
          </div>
        </h3>
        <div className="space-y-4 pt-3">
          <div className="flex items-center">
            <div className="flex flex-col">
              <label htmlFor="minPrice" className="mb-2 text-sm text-gray-600">
                Min ($)
              </label>
              <input
                id="minPrice"
                type="number"
                step={50}
                placeholder="Min"
                className="rounded-md border border-gray-300 px-3 py-1"
                {...register("minPrice")}
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex flex-col">
              <label htmlFor="maxPrice" className="mb-2 text-sm text-gray-600">
                Max ($)
              </label>
              <input
                id="maxPrice"
                type="number"
                step={50}
                placeholder="Max"
                className="rounded-md border border-gray-300 px-3 py-1"
                {...register("maxPrice")}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 py-6">
        <h3 className="-my-3 flow-root">
          <div className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
            <span className="font-medium text-gray-900">Bedrooms</span>
          </div>
        </h3>
        <div className="space-y-4 pt-3">
          <select
            defaultValue={bedroomOptions[0]?.value}
            className="w-full rounded border border-gray-300 px-2 py-1.5"
            {...register("bedrooms", { valueAsNumber: true })}
          >
            {bedroomOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="border-b border-gray-200 py-6">
        <h3 className="-my-3 flow-root">
          <div className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
            <span className="font-medium text-gray-900">
              Distance to Campus
            </span>
          </div>
        </h3>
        <div className="space-y-4 pt-6">
          {distanceOptions.map((option, optionIdx) => (
            <div key={option.value} className="flex items-center">
              <input
                id={`distance-${optionIdx}`}
                defaultValue={option.value}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                {...register("distance")}
              />
              <label
                htmlFor={`distance-${optionIdx}`}
                className="ml-3 text-sm text-gray-600"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}

export default memo(Filters);
