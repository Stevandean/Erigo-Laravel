"use client";

import { FC, FormEvent, useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { isAxiosError, useAxios } from "@/hooks/useAxios";
import { User } from "@/interfaces/user";
import { errorToast, successToast } from "@/lib/toastNotify";
import { cn } from "@/lib/utils";
import AdminLayout from "@/layouts/AdminLayout";
import Breadcrumb from "@/components/Common/Breadcrumb";

const ContainerAdminEditUser: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<User>({
    name: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    role: "",
    pict: "",
  });

  const axios = useAxios();
  const router = useRouter();
  const { id } = useParams();

  const getDataUser = useCallback(async () => {
    try {
      const { data } = await axios.get(`users/${id}`);
      setData(data.data);
    } catch (err) {
      if (isAxiosError(err)) {
        errorToast(err.response?.data?.message || "An error occurred");
      } else {
        errorToast("An unexpected error occurred");
      }
    }
  }, [axios]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const sendData = { ...data };

    try {
      const { data } = await axios.post(`users/${id}`, sendData);
      successToast(data.message);
      setIsLoading(false);

      setTimeout(() => {
        router.push("/admin/user");
      }, 1500);
    } catch (err) {
      setIsLoading(false);
      if (isAxiosError(err)) {
        errorToast(err.response?.data?.message || "An error occurred");
      } else {
        errorToast("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    getDataUser();
  }, [getDataUser]);

  return (
    <AdminLayout>
      <Breadcrumb pageName="User" />

      <pre>{JSON.stringify(data, null, 2)}</pre>

      <div className="rounded-sm border bg-white">
        <div className="border-b px-6 py-4 dark:border-strokedark">
          <h3 className="text-xl font-semibold text-black">Update User</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="mb-4 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label
                  htmlFor="name"
                  className="mb-3 block text-sm font-medium text-black"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your full name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-navy/40"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label
                  htmlFor="phone"
                  className="mb-3 block text-sm font-medium text-black"
                >
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Enter your phone"
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-navy/40"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="address"
                className="mb-3 block text-sm font-medium text-black"
              >
                Address
              </label>
              <textarea
                rows={3}
                name="address"
                id="address"
                placeholder="Enter your address"
                value={data.address}
                onChange={(e) => setData({ ...data, address: e.target.value })}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-navy/40"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="mb-2.5 block text-black">Role</label>

              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                  value={data.role}
                  onChange={(e) => {
                    setData({ ...data, role: e.target.value });
                  }}
                  className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-navy/40 ${
                    data.role ? "text-black" : ""
                  }`}
                >
                  <option
                    value=""
                    disabled
                    className="text-body dark:text-bodydark"
                  >
                    Select role
                  </option>
                  <option
                    value="admin"
                    className="text-body dark:text-bodydark"
                  >
                    Admin
                  </option>
                  <option
                    value="member"
                    className="text-body dark:text-bodydark"
                  >
                    Member
                  </option>
                </select>

                <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                  <svg
                    className="fill-current"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill=""
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="pict"
                className="mb-3 block text-sm font-medium text-black"
              >
                Photo
              </label>
              <input
                type="file"
                name="pict"
                id="pict"
                accept="image/*"
                placeholder="Enter your email address"
                value={data.pict}
                onChange={(e) => setData({ ...data, pict: e.target.value })}
                className="w-full file:mr-2 file:py-3 file:px-4 file:rounded-l file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-gray hover:file:bg-slate-200 text-gray bg-slate-100/30 rounded"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="mb-3 block text-sm font-medium text-black"
              >
                Email <span className="text-meta-1">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-navy/40"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="mb-3 block text-sm font-medium text-black"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="***************"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-navy/40"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading ? true : false}
              className={cn(
                isLoading ? "cursor-not-allowed" : "cursor-pointer",
                "flex w-full justify-center rounded bg-navy dark:bg-blue-900 p-3 font-medium text-white hover:bg-navy/90 dark:hover:bg-blue-900/90"
              )}
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ContainerAdminEditUser;
