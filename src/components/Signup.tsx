import React from "react";
import { Formik, Form, Field } from "formik";
import { TypeOf, object, string } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import styles from './style.module.css'
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { useRouter } from 'next/router'
import Loader from "./Loader";
const initialValues = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: ""
};

export const contactFormSchemaSignup = object({
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
  password: string().refine(
    (value) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
        value
      ),
    "Must contain 8 Characters, one uppercase, one lowercase, one number and one special case character"
  ),
  confirmPassword: string()

}).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });;

export type ContactFormInputs = TypeOf<typeof contactFormSchemaSignup>;

interface Props {
  handleChangeContent: (content: 'login' | 'signup') => void
}

const Signup = ({handleChangeContent}: Props) => {

  const utils = api.useContext();
  const { mutate, error, isLoading } = api.auth.signup.useMutation({

    onError(err, newPost, ctx) {
      if(err.data?.code === 'INTERNAL_SERVER_ERROR') {
        if(err.message.includes('users_email_key')) {
          return toast('email already taken', {type: 'error'})
        }
        if(err.message.includes('users_username_key')) {
          return toast('username already taken', {type: 'error'})
        }
      } else {
        const errMessage = JSON.parse(err.message)[0].message;
        toast(errMessage, {type: 'error'})
      }
    },
    onSuccess(data) {
      toast('Successful', {type: 'success'})
      handleChangeContent('login');
    },

  })

  const onSubmit = (values: ContactFormInputs ) => {
    mutate(values);
  }

  return (
    <div>
      <Formik<ContactFormInputs>
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={toFormikValidationSchema(contactFormSchemaSignup)}
      >
        {(formikState) => {
          const errors = formikState.errors;
          return (
            <Form className={styles.form} autoComplete="off">
              <h1 className="text-center text-black text-3xl font-bold italic">Study with me</h1>
              <h3 className="text-center mb-10 mt-10 text-black text-2xl font-bold">Sign up</h3>
              
              <div className="flex justify-between gap-2 my-6">
                <div className="flex flex-col flex-1">
                  <Field
                    type="text"
                    name="firstname"
                    className=" px-2 py-1 text-black outline-none border border-gray-500 rounded-md "
                    placeholder="Firstname"
                  />
                  
                  {errors.firstname && (
                    <label className="label">
                      <span className="label-text text-error  text-red-500">
                        {errors.firstname}
                      </span>
                    </label>
                  )}
                </div>

                <div className="flex flex-col flex-1">
                  <Field
                    type="text"
                    name="lastname"
                    className=" px-2 py-1 text-black outline-none border border-black rounded-md"
                    placeholder="Lastname"
                  />
                  {errors.lastname && (
                    <label className="label">
                      <span className="label-text text-error text-red-500">
                        {errors.lastname}
                      </span>
                    </label>
                  )}
                </div>
              </div>

              <div className="flex justify-between gap-2 my-6">
              <div className="flex flex-col flex-1">
              <Field
                    type="text"
                    name="username"
                    className=" px-2 py-1 text-black outline-none border border-black rounded-md"
                    placeholder="Username"
                  />
                  {errors.username && (
                    <label className="label">
                      <span className="label-text text-error text-red-500">
                        {errors.username}
                      </span>
                    </label>
                  )}
              </div>

              <div className="flex flex-col flex-1">
              <Field
                    type="email"
                    name="email"
                    className=" px-2 py-1 text-black outline-none border border-black rounded-md"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <label className="label">
                      <span className="label-text text-error text-red-500">
                        {errors.email}
                      </span>
                    </label>
                  )}
              </div>
              </div>

              <div className="flex justify-between gap-2 my-6">
              <div className="flex flex-col flex-1">
              <Field
                    type="password"
                    name="password"
                    className=" px-2 py-1 text-black outline-none border border-black rounded-md"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <label className="label">
                      <span className="label-text text-error text-red-500">
                        {errors.password}
                      </span>
                    </label>
                  )}
              </div>

              <div className="flex flex-col flex-1">
              <Field
                    type="password"
                    name="confirmPassword"
                    className=" px-2 py-1 text-black outline-none border border-black rounded-md"
                    placeholder="Confirm Password"
                  />
                  {errors.confirmPassword && (
                    <label className="label">
                      <span className="label-text text-error text-red-500">
                        {errors.confirmPassword}
                      </span>
                    </label>
                  )}
              </div>
              </div>
              <span className=" text-gray-900 cursor-pointer" onClick={() => handleChangeContent('login')}>Already have an account? Login</span>
              <button disabled={isLoading} className="
              border text-white px-5 py-2 rounded-md w-full bg-slate-700 mt-5 hover:bg-slate-500
               disabled:bg-slate-400
              "> { isLoading ? <Loader size={20} /> : 'Signup' } </button>
              
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Signup;
