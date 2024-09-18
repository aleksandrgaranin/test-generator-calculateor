"use client";
import { useNameStore } from "@/providers/name-store-provider";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const HomePage = () => {
  let value = localStorage.getItem("favoriteName") || "";
  const [tempName, setTempName] = useState(value);
  const router = useRouter();
  const { user, setName } = useNameStore((state) => state);

  const handleSubmit = () => {
    setName(tempName);
    router.push("/pages/calculator");
  };

  const handleSaveToLocal = (event: any) => {
    localStorage.setItem("favoriteName", tempName);
    router.push("/pages/password-generator");
  };

  return (
    <>
      <div className=" flex flex-col h-screen w-full m-auto items-center justify-center text-black  overflow-hidden">
        <div className="border-2 p-5 bg-slate-50 rounded-lg h-56 w-[720px]">
          <div className="flex justify-between">
            <label className="block text-md font-medium leading-6 text-gray-900 mb-4">
              Начать
            </label>
            <div className="rounded-full flex w-[24px] h-[24px] border-black-1 bg-slate-300 justify-center align-middle items-center mb-3">
              X
            </div>
          </div>
          <form>
            <label className="text-gray-500 text-sm ">Напишите ваше имя:</label>
            <div className="relative mt-2 rounded-md shadow-sm items-start">
              <input
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Ваше имя"
                type="text"
                value={tempName}
                onChange={(e) => {
                  console.log(e.target.value);
                  setTempName(e.target.value);
                }}
              />
            </div>
          </form>
          <div className="m-3 flex justify-end gap-2">
            <button
              type="button"
              className="rounded-lg text-sm text-white w-max border-4 bg-custom-button-color"
              onClick={handleSubmit}
            >
              Открыть калькулятор{" "}
            </button>
            <button
              type="button"
              className="rounded-lg text-sm text-white w-max border-4 bg-custom-button-color"
              onClick={handleSaveToLocal}
            >
              Открыть генератор
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
