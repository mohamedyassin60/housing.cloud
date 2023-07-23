import { Dispatch, SetStateAction, useEffect, useRef } from "react";

type ToastProps = {
  toast: string | null;
  setToast: Dispatch<SetStateAction<string | null>>;
};

export default function Toast({ toast, setToast }: ToastProps) {
  const timerIdRef = useRef<any>();

  useEffect(() => {
    if (!!toast) {
      timerIdRef.current = setTimeout(() => {
        setToast(null);
      }, 2000);
    }
    return () => {
      clearTimeout(timerIdRef.current);
    };
  }, [toast]);

  if (!toast) return <></>;

  return (
    <div
      id="toast-success"
      className="fixed right-7 top-7 mb-4 ml-7 flex items-center rounded-lg bg-white p-4 text-gray-500 shadow-lg dark:bg-gray-800 dark:text-gray-400"
      role="alert"
    >
      <div className="ml-3 text-sm font-normal">{toast}</div>
      <button
        type="button"
        className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
        data-dismiss-target="#toast-success"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
      </button>
    </div>
  );
}
