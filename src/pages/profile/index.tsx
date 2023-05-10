import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { getUser } from "~/app/features/userSlice";
import { Profile, User } from "@prisma/client";
import DateTimeFormatter from "~/helper/DateTimeFormatter.helper";
import { format } from "timeago.js";
import LoaderModal from "~/components/LoaderModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faNoteSticky, faSave } from "@fortawesome/free-solid-svg-icons";
import { TypeOf, object, string } from "zod";
import { Field, Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { api } from "~/utils/api";
import { toast } from "react-toastify";

export const updateProfileDto = object({
  // defines a required field called name
  firstname: string().refine(
    (value) => /^[A-Za-z\s]*$/.test(value),
    "Name should contain only alphabets"
  ),
  lastname: string().refine(
    (value) => /^[A-Za-z\s]*$/.test(value),
    "Name should contain only alphabets"
  ),
  username: string(),
  email: string().email("Please enter a valid email"),
});

export type UpdateProfileSchema = TypeOf<typeof updateProfileDto>;

const index = () => {
  const { isLoading, data, isError } = useAuth();
  const [enableUpdate, setEnableUpdate] = useState(false);

  const context = api.useContext();
  const {mutate: mutateUpdate} = api.user.updateProfile.useMutation({
    onError: (err) => {
      toast('Email or Username might already exist!', {type: 'error'})
    },
    onSuccess: () => {
      toast('Profile updated!', {type: 'success'})
    },
    onSettled: () => {
      context.auth.getMe.invalidate();
      handleSetEnableUpdate()
    }
  })

  if (isLoading) return <LoaderModal />;
  if (isError) return <div>Something went wrong...</div>;

  const { profile, email, createdAt, reviewer, event, quiz, username } = data!;

  const initialValues = {
    firstname: profile?.firstname ?? "",
    lastname: profile?.lastname ?? "",
    username: username ?? "",
    email: email ?? "",
  };
 
  const onSubmit = (values: UpdateProfileSchema, { resetForm }: any) => {
    mutateUpdate(values)
  };

  const handleSetEnableUpdate = () => setEnableUpdate(prev => !prev)

  return (
    <div className="h-full bg-gray-200 p-8">
      <div className="rounded-lg bg-white pb-8 shadow-xl">
        <div
          x-data="{ openSettings: false }"
          className="absolute right-12 mt-4 rounded"
        >
          <button
            className="rounded border border-gray-400 bg-gray-100 bg-opacity-10 p-2 text-gray-300 hover:bg-opacity-20 hover:text-gray-300"
            title="Settings"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              ></path>
            </svg>
          </button>
          <div
            x-show="openSettings"
            className="absolute right-0 mt-1 w-40 border border-gray-200 bg-white py-2 shadow-2xl"
          >
            <div className="border-b py-2">
              <p className="mb-1 px-6 text-xs uppercase text-gray-400">
                Settings
              </p>
              <button className="flex w-full items-center space-x-2 px-6 py-1.5 hover:bg-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  ></path>
                </svg>
                <span className="text-sm text-gray-700">Share Profile</span>
              </button>
              <button className="flex w-full items-center space-x-2 px-6 py-1.5 hover:bg-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                  ></path>
                </svg>
                <span className="text-sm text-gray-700">Block User</span>
              </button>
              <button className="flex w-full items-center space-x-2 px-6 py-1.5 hover:bg-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="text-sm text-gray-700">More Info</span>
              </button>
            </div>
            <div className="py-2">
              <p className="mb-1 px-6 text-xs uppercase text-gray-400">
                Feedback
              </p>
              <button className="flex w-full items-center space-x-2 px-6 py-1.5 hover:bg-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  ></path>
                </svg>
                <span className="text-sm text-gray-700">Report</span>
              </button>
            </div>
          </div>
        </div>
        <div className="h-[250px] w-full">
          <img
            src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
            className="h-full w-full rounded-tl-lg rounded-tr-lg"
          />
        </div>
        <div className="-mt-20 flex flex-col items-center">
          <img
            src="/assets/defaultProfile.png"
            className="w-40 rounded-full border-4 border-white  object-cover"
          />
          <div className="mt-2 flex items-center space-x-2">
            <p className="text-2xl">
              {profile?.firstname} {profile?.lastname}
            </p>
            <span className="rounded-full bg-blue-500 p-1" title="Verified">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-2.5 w-2.5 text-gray-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="4"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </span>
          </div>
          <p className="text-gray-700">{username}</p>
          <p className="text-sm text-gray-500">@{email}</p>
        </div>
        <div className="mt-2 flex flex-1 flex-col items-center justify-end px-8 lg:items-end"></div>
      </div>

      <div className="my-4 flex flex-col space-y-4 2xl:flex-row 2xl:space-x-4 2xl:space-y-0">
        <div className="flex w-full flex-col 2xl:w-1/3">
          <div className="flex-1 rounded-lg bg-white p-8 shadow-xl">
            <h4 className="text-xl font-bold text-gray-900">Personal Info</h4>
            <ul className="mt-2 text-gray-700">
              <li className="flex border-y py-2">
                <span className="w-24 font-bold">Full name:</span>
                <span className="text-gray-700">
                  {profile?.firstname} {profile?.lastname}{" "}
                </span>
              </li>
              <li className="flex border-b py-2">
                <span className="w-24 font-bold">Joined:</span>
                <span className="text-gray-700">{format(createdAt)}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="w-24 font-bold">Email:</span>
                <span className="text-gray-700">{email}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="w-24 font-bold">Languages:</span>
                <span className="text-gray-700">English, Filipino/Tagalog</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex w-full flex-col 2xl:w-2/3">
          {/* form here */}
          <Formik<UpdateProfileSchema>
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={toFormikValidationSchema(updateProfileDto)}
          >
            {(formikState) => {
              const { errors } = formikState;
              return (
                <Form className="flex flex-1 flex-col rounded-lg bg-white p-8 shadow-xl">
                  <div className="flex justify-between">
                    <h4 className="text-xl font-bold text-gray-900">
                      Information
                    </h4>
                    {
                      !enableUpdate ? <> <FontAwesomeIcon
                      onClick={handleSetEnableUpdate}
                        icon={faEdit}
                        className=" h-[20px] w-[20px] cursor-pointer"
                      /></> : <> 
                      <button type="submit">
                      <FontAwesomeIcon
                        icon={faSave}
                        className=" h-[20px] w-[20px] cursor-pointer"
                      />
                      </button>
                      </> 
                    }
                    
                  </div>

                  <div className="m-5 flex w-[80%] justify-between">
                    <div className="flex flex-col">
                      {enableUpdate ? (
                        <>
                          {" "}
                          <Field
                            type="text"
                            name="firstname"
                            placeholder="Firstname"
                            className="w-[20em] px-5 py-3 outline-none border border-[#EAEAEA] rounded-md"
                          />
                          {errors.firstname && (
                            <label className="label">
                              <span className="label-text text-error text-red-500">
                                {errors.firstname}
                              </span>
                            </label>
                          )}{" "}
                        </>
                      ) : (
                        <div className="flex flex-col">
                        <label htmlFor="" className="font-bold">Firstname</label>
                        <span>{profile?.firstname}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col">
                      {enableUpdate ? (
                        <>
                          <Field
                            type="text"
                            name="lastname"
                            placeholder="Lastname"
                            className="w-[20em] px-5 py-3 outline-none border border-[#EAEAEA] rounded-md"
                          />{" "}
                          {errors.lastname && (
                            <label className="label">
                              <span className="label-text text-error text-red-500">
                                {errors.lastname}
                              </span>
                            </label>
                          )}
                        </>
                      ) : (
                        <div className="flex flex-col text-right">
                        <label htmlFor="" className="font-bold">Lastname</label>
                        <span>{profile?.lastname}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="m-5 flex w-[80%] justify-between">
                    <div className="flex flex-col">
                      {enableUpdate ? (
                        <>
                          <Field type="text" name="email" placeholder="Email"
                          className="w-[20em] px-5 py-3 outline-none border border-[#EAEAEA] rounded-md" />{" "}
                          {errors.email && (
                            <label className="label">
                              <span className="label-text text-error text-red-500">
                                {errors.email}
                              </span>
                            </label>
                          )}
                        </>
                      ) : (
                        <div className="flex flex-col">
                        <label htmlFor="" className="font-bold">Email</label>
                        <span>{email}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      {enableUpdate ? (
                        <>
                          <Field
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="w-[20em] px-5 py-3 outline-none border border-[#EAEAEA] rounded-md"
                          />{" "}
                          {errors.username && (
                            <label className="label">
                              <span className="label-text text-error text-red-500">
                                {errors.username}
                              </span>
                            </label>
                          )}
                        </>
                      ) : (
                        <div className="flex flex-col text-right">
                        <label htmlFor="" className="font-bold">Username</label>
                        <span>{username}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>

          {/* form here */}
          <div className="mt-4 flex-1 rounded-lg bg-white p-8 shadow-xl">
            <h4 className="text-xl font-bold text-gray-900">Activities</h4>

            <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="rounded-lg border border-gray-300 bg-gray-100 px-6 py-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-indigo-600">
                    Total Note/Reviewer
                  </span>
                  {/* <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">7 days</span> */}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-end">
                      <span className="text-2xl font-bold 2xl:text-3xl">
                        {reviewer?.length}
                      </span>
                      <div className="mb-1 ml-2 flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-gray-300 bg-gray-100 px-6 py-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-green-600">Quiz</span>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-end">
                      <span className="text-2xl font-bold 2xl:text-3xl">
                        {quiz?.length}
                      </span>
                      <div className="mb-1 ml-2 flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-gray-300 bg-gray-100 px-6 py-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-blue-600">
                    Events
                  </span>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-end">
                      <span className="text-2xl font-bold 2xl:text-3xl">
                        {event?.length}
                      </span>
                      <div className="mb-1 ml-2 flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
