import { useState } from "react";
import Head from "next/head";
import Unit from "~/components/unit";
import InterestedModal from "~/components/interestedModal";
import { api } from "~/utils/api";
import Filters, { filtersSchema } from "~/components/filters";
import Toast from "~/components/toast";
import { z } from "zod";

export default function Home() {
  const [filters, setFilters] = useState<z.infer<typeof filtersSchema>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [show, toggleShow] = useState<string | null>(null); // Holds unit id
  const { data, error, isLoading } = api.housingUnit.getAll.useQuery(filters);

  return (
    <>
      <Head>
        <title>Housing Cloud</title>
        <meta
          name="description"
          content="Housing.Cloud manages your entire student housing ecosystem"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#FFFFFF] to-[#F9F9F9]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-[#1f213d] sm:text-[5rem]">
            Housing Cloud
          </h1>
          {error && (
            <p className="mt-6 text-base leading-7 text-gray-600">
              Sorry, we couldn’t make finish your request! {error.message}
            </p>
          )}
          <div className="flex w-full max-w-4xl gap-10">
            {!error && <Filters setFilters={setFilters} />}
            <div className="flex-1">
              {data && (
                <>
                  {isLoading && (
                    <p className="text-semibold mt-6 text-lg leading-7 text-gray-600">
                      Loading...
                    </p>
                  )}
                  <div>
                    <h3 className="font-semibold">Available Units</h3>
                    <ul role="list" className="w-full divide-y divide-gray-100">
                      {data.map((unit) => (
                        <li key={unit.id}>
                          <Unit unit={unit} toggleShow={toggleShow} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <InterestedModal
        show={show}
        toggleShow={toggleShow}
        setToast={setToast}
      />
      <Toast toast={toast} setToast={setToast} />
    </>
  );
}
