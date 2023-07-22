import { Dispatch, SetStateAction } from "react";
import Link from "next/link";

type UnitProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  bedrooms: number;
  distanceToCampus: number;
  toggleShow: Dispatch<SetStateAction<string | null>>;
};

export default function Unit(props: UnitProps) {
  const {
    id,
    name,
    description,
    price,
    bedrooms,
    distanceToCampus,
    toggleShow,
  } = props;
  return (
    <div className="flex flex-col justify-between gap-x-6 py-5 sm:flex-row">
      <div className="flex gap-x-4">
        <div className="flex-auto">
          <Link
            className="text-md font-semibold leading-6 text-gray-900 underline"
            href={`/units/${id}`}
          >
            {name}
          </Link>
          <p className="mt-2 text-sm leading-5 text-gray-500">
            <span className="font-bold text-black">{bedrooms}</span> bedrooms
          </p>
          <p className="mt-2 text-sm leading-5 text-gray-500">{description}</p>
        </div>
      </div>
      <div className="mt-3 sm:mt-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-gray-900">${price}</p>
        <div className="mt-1 flex items-center gap-x-1.5">
          <p className="text-sm leading-5 text-gray-500">
            {distanceToCampus}m to campus
          </p>
        </div>
        <div className="mt-2 flex items-center gap-x-6">
          <button
            className="rounded-md bg-[#cd4364] px-3 py-2 text-sm text-white shadow-sm hover:bg-[#a2344e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a2344e]"
            onClick={() => toggleShow(id)}
          >
            I'm Interested
          </button>
        </div>
      </div>
    </div>
  );
}
