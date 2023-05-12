import React from 'react';
import styles from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { TypeOf, object, string, record, any } from "zod";
import { Field, Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { useRouter } from 'next/router';
import Loader from "./Loader";
import { UnAuthorizeError } from "~/helper/Unauthorize.helper";

export const addQuizDto = object({
    title: string(),
  });
  
  export type AddQuizSchema = TypeOf<typeof addQuizDto>;

  type Props = {
    handler:  () => void,
  }
const AddQuizModal = ({handler}: Props) => {

    const initialValues = {
        title: "",
    };

    const router = useRouter();
    const context = api.useContext()
    const {mutate: mutateAdd, isLoading} = api.quiz.createOneQuiz.useMutation({
      onError: UnAuthorizeError,
      onSuccess(data) {
        // context.quiz.getAllReviewer.invalidate()
        toast('Quiz Created', {type: 'success'})
        setTimeout(() => router.push(`/quizes/${data.id}`), 1500);
      }
    })
    const onSubmit = async (values: AddQuizSchema, {resetForm}: any) => {
      mutateAdd(values);
    };

    return <div className={styles.addNoteModal}>
    <Formik<AddQuizSchema>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={toFormikValidationSchema(addQuizDto)}
    >
      {(formikState) => {
        const {errors} = formikState
        return (
          <Form className="absolute bottom-0 left-0 right-0 top-0 m-auto h-fit w-[35vw] rounded-md bg-white p-10 max-[900px]:w-[50vw] max-[700px]:w-[70vw] max-[500px]:w-[100vw] max-[700px]:text-sm"
          aria-disabled={isLoading}
          >
            <FontAwesomeIcon
              icon={faClose}
              className="absolute right-8 top-5 w-[25px] cursor-pointer"
              onClick={handler}
            />
            <div className="flex h-[45vh] w-[100%] flex-col items-center justify-between">
              <h1 className="text-[2.5em] text-gray-900">Create Quiz</h1>
              <div className="flex w-full justify-between">
                <span className='w-[20%]'>Title: </span>
                <div className='flex flex-col w-[70%]'>
                  <Field
                  type="text"
                  className="border-6 h-[50px] w-[100%] rounded-md border border-solid border-black px-5 py-2 outline-none"
                  name="title"
                  placeholder="Title of Quiz"
                />
                {errors.title && (
                    <label className="label">
                      <span className="label-text text-error text-red-500">
                        {errors.title}
                      </span>
                    </label>
                  )}

                </div>
              </div>

              <button className="w-full border border-black px-[35px] py-[10px] rounded-md hover:bg-slate-200" type="submit" value={'submit'} disabled={isLoading}>
                {isLoading ? <Loader size={20} /> : 'Create'}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  </div>;
}

export default AddQuizModal;