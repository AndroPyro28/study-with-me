import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { TypeOf, object, string } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import styles from './style.module.css'
import { contentForm } from "~/types/IndexcontentForm";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import Cookie from 'js-cookie'

const initialValues = {
  email: "",
  password: "",
};

export const contactFormSchemaLogin = object({
  email: string().email("Please enter a valid email"),
  password: string()

})

type ContactFormInputs = TypeOf<typeof contactFormSchemaLogin>;

interface Props {
    handleChangeContent: (content: contentForm) => void
}

const Login = ( {handleChangeContent} : Props) => {

  const router = useRouter()
  const { mutate, error, isLoading } = api.auth.login.useMutation({

    onError(err, newPost, ctx) {
      toast( err.message, {type: 'error'})
    },
    onSuccess(data) {
      const { token } = data;
      Cookie.set('userToken', token, {
        secure: true,
        expires: 1
      })
      toast('Successful', {type: 'success'})
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
        validationSchema={toFormikValidationSchema(contactFormSchemaLogin)}
      >
        {(formikState) => {
          const errors = formikState.errors;
          return (
            <Form className={styles.form} autoComplete="off">
              <h1 className="text-center text-black text-3xl font-bold italic">Study with me</h1>
              <h3 className="text-center mb-10 mt-10 text-black text-2xl font-bold">Login</h3>
              <div className="flex justify-between gap-2 my-6">

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

              </div>
                <span className="text-gray-900 cursor-pointer" onClick={() => handleChangeContent('signup')}>Don't have an account? Signup</span>

              <button className=" border text-white px-5 py-2 rounded-md w-full bg-slate-700 mt-5 hover:bg-slate-500">Submit</button>
              
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
