import { Dispatch, Fragment, SetStateAction, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "~/utils/api";

type InterestedModalProps = {
  show: string | null;
  toggleShow: Dispatch<SetStateAction<string | null>>;
  setToast: Dispatch<SetStateAction<string | null>>;
};

const interestedSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "Required field *" })
    .max(32, { message: "Max charecters of 32" }),
  lastName: z
    .string()
    .min(1, { message: "Required field *" })
    .max(32, { message: "Max charecters of 32" }),
  email: z.string().email("Enter valid email"),
});

export default function InterestedModal(props: InterestedModalProps) {
  const { show, toggleShow, setToast } = props;
  const cancelButtonRef = useRef(null);
  const mutation = api.studentRouter.addToInterested.useMutation();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof interestedSchema>>({
    resolver: zodResolver(interestedSchema),
    mode: "onSubmit",
    reValidateMode: "onBlur",
    shouldUseNativeValidation: false,
  });

  const onClose = () => {
    toggleShow(null);
    reset({
      firstName: "",
      lastName: "",
      email: "",
    });
  };

  const onSubmit = (data: z.infer<typeof interestedSchema>) => {
    const { firstName, lastName, email } = data;
    mutation.mutate(
      {
        unitId: show || "",
        name: `${firstName} ${lastName}`,
        email,
      },
      {
        onError(error) {
          console.log("error", error);
        },
        onSuccess() {
          setToast("Your request has been saved successfully.");
          onClose();
        },
      }
    );
  };

  return (
    <Transition.Root show={!!show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Interested in this unit?
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          If you are interested in this unit, please fill in the
                          form and we will contact you soon!
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                    <div className="mt-3 sm:flex-1">
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        First name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="firstName"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register("firstName")}
                        />
                      </div>
                      {!!errors?.firstName && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div className="mt-3 sm:flex-1">
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Last name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="lastName"
                          autoComplete="family-name"
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register("lastName")}
                        />
                      </div>
                      {!!errors?.lastName && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-4 mt-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register("email")}
                      />
                    </div>
                    {!!errors?.email && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  {mutation.error && (
                    <p className="mt-2 text-sm text-red-400">
                      Something went wrong! {mutation.error.message}
                    </p>
                  )}
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-[#cd4364] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#a2344e] disabled:bg-[#d8a1ae] sm:ml-3 sm:w-auto"
                    disabled={isSubmitting}
                    onClick={handleSubmit(onSubmit)}
                  >
                    {isSubmitting || mutation.isLoading
                      ? "Loading..."
                      : "Submit"}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={onClose}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
