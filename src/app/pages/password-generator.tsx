"use client";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState(8);
  const [submit, setSubmit] = useState(false);
  const [saveSubmit, setSaveSubmit] = useState(false);
  const [lowercase, setLowercase] = useState("");
  const [uppercase, setUppercase] = useState("");
  const [number, setNumber] = useState("");
  const [special, setSpecial] = useState("");
  const [password, setPassword] = useState("");
  const [fileName, setFileName] = useState("password");
  const [repetitions, setRepetitions] = useState(false);
  const [generatedPasswords, setGeneratedPasswords] = useState([]);

  const [text, setText] = useState("");
  const tempPassword: any[] = [];

  let params = lowercase + uppercase + number + special;
  useEffect(() => {
    if (submit) {
      if (!params == "") {
        for (let i = 0; tempPassword.length < input; i++) {
          tempPassword.push(params[Math.floor(Math.random() * params.length)]);
        }

        if (repetitions) {
          const passwordSet = new Set(tempPassword);
          const newtemp = new Array(...passwordSet);
          setPassword(newtemp.join(""));
          setGeneratedPasswords([...generatedPasswords, newtemp.join("")]);
          setText("");
        } else {
          setPassword(tempPassword.join(""));
          setGeneratedPasswords([...generatedPasswords, tempPassword.join("")]);
          setText("");
        }
      } else if (params.length == 0) {
        setText("No parameters");
      }
      setSubmit(false);
    }
  }, [submit]);  

  function handleUpper(e: any) {
    e.target.checked
      ? setUppercase("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
      : setUppercase("");
  }
  function handleLower(e: any) {
    e.target.checked
      ? setLowercase("abcdefghijklmnopqrstuvwxyz")
      : setLowercase("");
  }
  function handleNumber(e: any) {
    e.target.checked ? setNumber("0123456789") : setNumber("");
  }
  function handleSpecial(e: any) {
    e.target.checked
      ? setSpecial("!@#$%&'()*+,^-./:;<=>?[]_`{~}|")
      : setSpecial("");
  }

  function handleRepetitions(e: any) {
    e.target.checked ? setRepetitions(true) : setRepetitions(false);
  }

  function handleLengthChange(e: any) {
    setInput(e.target.input);
  }
  function handleFileNameChange(e: any) {
    setFileName(e.target.value);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    if (!fileValidator(fileName)) {
      setSaveSubmit(true);
    }
  }

  function fileValidator(e: any) {
    var validChars = new RegExp("/[a-z0-9]|[-]/gi");
    return !!validChars.test(e);
  }

  return (
    <>
      <div className="flex flex-row h-screen w-full m-auto items-center justify-center text-black  overflow-hidden">
        <div className=" flex flex-row h-auto w-auto  items-center justify-center text-black overflow-hidden">
          <div className="w-auto h-auto flex flex-col justify-center transition-all px-10 sm:px-5">
            <h1 className="w-full text-center text-7xl sm:text-5xl sm:pt-24 sm:py-0 text-black py-8">
              Генератор паролей
            </h1>
            <div className="bg-white my-8 border-2 rounded-lg flex flex-row items-center p-3 sm:min-h-[50px]">
              <h2 className="pl-5 sm:pl-2 text-black text-2xl sm:text-xl tracking-wider">
                {password}
              </h2>  
            </div>

            <div className="flex flex-col px-12 py-6 sm:py-0 sm:px-0 text-lg rounded-3xl items-center justify-center">
              <div className="flex flex-row text-3xl items-center">
                Длина пароля:
                <p onChange={handleLengthChange} className="ml-4 text-5xl">
                  {input}
                </p>
              </div>

              <input
                className="w-full border-2 my-8 bg-white rounded-lg cursor-pointer appearance-none"
                type="text"
                id="slider"
                min={8}
                max={25}
                value={input}
                onChange={(e: any) => setInput(e.target.value)}
              />

              <ul className="flex flex-col text-2xl w-full">
                <li
                  onChange={(e) => handleUpper(e)}
                  className="sm:text-md pt-4 justify-start flex gap-2 flex-row"
                >
                  <input
                    id="uppercase"
                    type="checkbox"
                    className="border-white rounded-full h-8 w-6 text-black transition-all"
                  />
                  <label className="sm:text-md" htmlFor="uppercase">
                    Использовать прописные буквы
                  </label>
                </li>
                <li
                  onChange={(e) => handleLower(e)}
                  className="pt-2 justify-start flex gap-2 flex-row"
                >
                  <input
                    id="lowercase"
                    type="checkbox"
                    className="border-white rounded-full h-8 w-6 text-black transition-all"
                  />
                  <label htmlFor="lowercase">Использовать строчные буквы</label>
                </li>
                <li
                  onChange={(e) => handleNumber(e)}
                  className="pt-2 justify-start flex gap-2 flex-row"
                >
                  <input
                    id="numbers"
                    type="checkbox"
                    className="border-white rounded-full h-8 w-6 text-black"
                  />
                  <label htmlFor="numbers">Использовать цифры</label>
                </li>
                <li
                  onChange={(e) => handleSpecial(e)}
                  className="pt-2 justify-start flex gap-2 flex-row"
                >
                  <input
                    id="symbols"
                    type="checkbox"
                    className="border-white rounded-full h-8 w-6 text-black"
                  />
                  <label htmlFor="symbols">Использовать символы</label>
                </li>
                <li
                  onChange={(e) => handleRepetitions(e)}
                  className="pt-2 justify-start flex gap-2 flex-row"
                >
                  <input
                    id="repetitions"
                    type="checkbox"
                    className="border-white rounded-full h-8 w-6 text-black"
                  />
                  <label htmlFor="repetitions">
                    Избегать повторения повторов
                  </label>
                </li>
              </ul>

              <div className="font-bold flex flex-row w-full mt-12 text-4xl h-20">                
                <button
                  onClick={() => setSubmit(true)}
                  className="font-didactGothic flex flex-row text-white bg-black opacity-30 hover:scale-105 sm:hover:scale-100 w-1/2 hover:opacity-100 items-center justify-center rounded-r-lg transition-all sm:rounded-lg sm:mx-auto sm:w-full"
                >
                  Сгенерировать пароль
                </button>
              </div>              
            </div>
          </div>
        </div>
        <div className="w-auto">
          <ul className="w-full justify-center">
            {generatedPasswords.map((password) => (
              <li key={password} className="border-2 w-full">
                {password}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
