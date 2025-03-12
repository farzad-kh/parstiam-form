"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import InputForm from "./components/InputForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { formValidationSchemas } from "@/app/zodvalidation/validationSchemas";
import z from "zod";
import { useEffect, useState } from "react";
export type Inputs = {
  name?: string;
  lastName?: string;
  age: string;
};

export default function Home() {
  const [formData, setFormData] = useState<Inputs[]>([]);
  const [users, setUsers] = useState<Inputs[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(formValidationSchemas),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setFormData((prev) => [...prev, data]);
    reset();
  };

  const getUser = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/form");
      const data = await res.json();

      if (res.status === 200) {
        setUsers(data);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const formSaveHandler = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 201) {
        getUser();
        setFormData([]);
      }
    } catch (err) {
      console.error(err);
      setLoading(false)
    }
  };

  return (
    <div>
      <main className="max-w-screen-xl m-auto py-12 ">
        <div className="p-4 w-full flex flex-col gap-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-4 gap-4">
              <InputForm
                register={register}
                name={"name"}
                label={"نام"}
                errors={errors}
              />
              <InputForm
                register={register}
                name={"lastName"}
                label={"نام خانوادگی"}
                errors={errors}
              />
              <InputForm
                register={register}
                name={"age"}
                label={"سن"}
                errors={errors}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Submit
            </button>
          </form>

          <div className="w-full flex justify-start mt-4">
            <button
              onClick={formSaveHandler}
              disabled={formData.length === 0}
              className="p-3 bg-black rounded-xl w-fit text-white disabled:bg-[#9d9d9d] "
            >
              {loading ? "جند لحظه" : "ذخیره"}
            </button>
          </div>
          <div className="container mx-auto mt-8 p-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-3 text-right">نام</th>
                    <th className="border p-3 text-right">نام خانوادگی</th>
                    <th className="border p-3 text-right">سن</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.length >= 1 ? (
                    formData?.map((user, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition">
                        <td className="border p-3">{user.name || "-"}</td>
                        <td className="border p-3">{user.lastName || "-"}</td>
                        <td className="border p-3">{user.age}</td>
                      </tr>
                    ))
                  ) : (
                    <tr className="hover:bg-gray-50 transition">
                      <td className="border p-3">-</td>
                      <td className="border p-3">-</td>
                      <td className="border p-3">-</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="relative mt-9">
            <h2 className="text-lg font-bold  pb-4 text-blue-500">
              دریافت یوزر از api
            </h2>
            <div className="flex gap-4 flex-col mt-5">
              {users.map((users: Inputs, i) => (
                <div key={i} className="flex gap-4 font-semibold">
                  <div>یوزر {i + 1}:</div>
                  {users.name && <div>نام: {users.name}</div>}
                  {users.lastName && <div>نام خانوادگی: {users.lastName}</div>}
                  <div>سن: {users.age}</div>
                </div>
              ))}
            </div>
            {loading && (
              <div className="w-full absolute h-full bg-white/70 top-0 ">
                <div className="w-full flex justify-center h-full items-center">
                  <span className="loader relative"></span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
