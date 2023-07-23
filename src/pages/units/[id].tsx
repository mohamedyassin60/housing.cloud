import { useRouter } from "next/router";
import Head from "next/head";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

const formInputs = [
  {
    id: "name",
    label: "Name",
    type: "text",
  },
  {
    id: "bedrooms",
    label: "Bedrooms",
    type: "number",
  },
  {
    id: "distanceToCampus",
    label: "Distance to campus (m)",
    type: "number",
  },
  {
    id: "price",
    label: "Price ($)",
    type: "number",
  },
  {
    id: "description",
    label: "Description",
    type: "textarea",
  },
];

const unitSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Required field *" })
    .max(32, { message: "Max charecters of 32" }),
  description: z.string().min(1, { message: "Required field *" }),
  bedrooms: z.number().positive().min(1),
  price: z.number().positive().min(1),
  distanceToCampus: z.number().positive().min(1),
});

export default function Home() {
  const { query, replace, back } = useRouter();
  const id: string = query.id?.toString() || "";
  const utils = api.useContext();
  const updateMutation = api.housingUnit.updateById.useMutation();
  const deleteMutation = api.housingUnit.deleteById.useMutation();
  const { data, error, isLoading } = api.housingUnit.getById.useQuery(
    {
      id,
    },
    {
      retry: 0,
    }
  );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof unitSchema>>({
    resolver: zodResolver(unitSchema),
    mode: "onSubmit",
    reValidateMode: "onBlur",
    shouldUseNativeValidation: false,
  });

  const onDelete = () => {
    deleteMutation.mutate(
      {
        id,
      },
      {
        onSuccess() {
          utils.housingUnit.invalidate();
          replace("/");
        },
      }
    );
  };

  const onSubmit = (data: z.infer<typeof unitSchema>) => {
    const { name, bedrooms, price, description, distanceToCampus } = data;
    updateMutation.mutate(
      {
        id,
        name,
        bedrooms,
        price,
        description,
        distanceToCampus,
      },
      {
        onSuccess() {
          back();
        },
      }
    );
  };

  useEffect(() => {
    if (!isLoading) {
      reset({
        name: data?.name || "",
        description: data?.description || "",
        bedrooms: data?.bedrooms || 0,
        price: data?.price || 0,
        distanceToCampus: data?.distanceToCampus || 0,
      });
    }
  }, [data, isLoading]);

  return (
    <>
      <Head>
        <title>Housing Cloud | Housing Unit</title>
        <meta
          name="description"
          content="Housing.Cloud manages your entire student housing ecosystem"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#FFFFFF] to-[#F9F9F9]">
        <div className="container flex flex-col items-center justify-center px-4 py-16 ">
          <h2 className="text-4xl font-semibold text-[#1f213d] sm:text-[4rem]">
            Housing Unit
          </h2>
          <p className="mt-10">#{id}</p>
          {error && (
            <p className="mt-12 text-base leading-7 text-gray-600">
              Sorry, we couldn’t make finish your request! {error.message}
            </p>
          )}
          {isLoading && (
            <p className="text-semibold mt-12 text-lg leading-7 text-gray-600">
              Loading...
            </p>
          )}
          {data && (
            <>
              <div className="w-full max-w-md px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                {formInputs.map(({ id, label, type }) => {
                  const key = id as
                    | "name"
                    | "description"
                    | "price"
                    | "bedrooms"
                    | "distanceToCampus";
                  if (key === "description") {
                    return (
                      <div key={key} className="mt-3">
                        <label
                          htmlFor={key}
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          {label}
                        </label>
                        <div className="mt-2">
                          <textarea
                            id={key}
                            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            {...register(key)}
                          />
                        </div>
                        {!!(errors || {})[key] && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors[key]?.message as string}
                          </p>
                        )}
                      </div>
                    );
                  }
                  return (
                    <div key={key} className="mt-3">
                      <label
                        htmlFor={key}
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        {label}
                      </label>
                      <div className="mt-2">
                        <input
                          type={type}
                          id={key}
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register(key, {
                            valueAsNumber: type === "number",
                          })}
                        />
                      </div>
                      {!!(errors || {})[key] && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors[key]?.message as string}
                        </p>
                      )}
                    </div>
                  );
                })}
                {(updateMutation.error || deleteMutation.error) && (
                  <p className="mt-2 text-sm text-red-400">
                    Something went wrong! {updateMutation?.error?.message || ""}
                    {deleteMutation?.error?.message || ""}
                  </p>
                )}
              </div>
              <div className="ml-6 flex w-full max-w-md justify-start">
                <button
                  type="button"
                  className="rounded-md px-3 py-2 text-sm font-semibold text-[#cd4364] hover:underline disabled:text-[#d8a1ae]"
                  disabled={deleteMutation.isLoading}
                  onClick={onDelete}
                >
                  {deleteMutation.isLoading ? "Loading..." : "Delete Unit"}
                </button>
              </div>
              <div className="mt-4 bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-[#cd4364] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#a2344e] disabled:bg-[#d8a1ae] sm:ml-3 sm:w-auto"
                  disabled={isSubmitting || updateMutation.isLoading}
                  onClick={handleSubmit(onSubmit)}
                >
                  {isSubmitting || updateMutation.isLoading
                    ? "Loading..."
                    : "Update"}
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={back}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
