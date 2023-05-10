import React, { useState } from "react";
import styles from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { TypeOf, object, string, record, any } from "zod";
import { Field, Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "./Loader";
import { UnAuthorizeError } from "~/helper/Unauthorize.helper";

const initialValues = {
  title: "",
  file: null,
  image_url: '',
  image_id: ''
};


export const noteSchema = object({
  title: string(),
  image_url: string().optional(), 
  file: record(any()).nullable().optional(),
  image_id: string().optional()
});

export type NoteTypeInput = TypeOf<typeof noteSchema>;

type Props = {
  handler: () => void
}
const AddNoteModal = ({handler}: Props) => {
  const context = api.useContext()
  const {mutate, isLoading} = api.reviewer.createReviewer.useMutation({
    onError: UnAuthorizeError,
    onSuccess() {
      context.reviewer.getAllReviewer.invalidate()
      toast('Note Created', {type: 'success'})
    }
  })

  const onSubmit = async (values: NoteTypeInput, {resetForm}: any) => {
    if(values.file) {
      const formData = new FormData();
      formData.append("file", values.file as any);
      formData.append("upload_preset", "online-student-reviewer");
      const res = await axios.post(`https://api.cloudinary.com/v1_1/iamprogrammer/auto/upload`, formData,{
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      });
      values.image_url = res.data.url;
      values.image_id = res.data.public_id;
    }
    mutate(values)
    resetForm(initialValues)
  };

  return (
    <div className={styles.addNoteModal}>
      <Formik<NoteTypeInput>
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={toFormikValidationSchema(noteSchema)}
      >
        {(formikState) => {
          const onUploadChange = (e: any) => {
            if (!e.target.files) return;
            const file = e.target.files[0];
            formikState.setTouched({
              ...formikState.touched,
              file: true,
            });
            if(file) {
              formikState.setFieldValue("file", file);
              const fileReader = new FileReader();
              fileReader?.readAsDataURL(file);
              fileReader.onloadend = () => {
                // setImageUrl(fileReader.result);
                formikState?.setFieldValue("image_url", fileReader.result);
  
              };
            }
          };

          return (
            <Form className="absolute bottom-0 left-0 right-0 top-0 m-auto h-fit w-[45vw] rounded-md bg-white p-20 ">
              <FontAwesomeIcon
                icon={faClose}
                className="absolute right-8 top-5 w-[25px] cursor-pointer"
                onClick={handler}
              />
              <div className="flex h-[45vh] w-[100%] flex-col items-center justify-between">
                <h1 className="text-[2.5em] text-gray-900">Create Note</h1>
                <div className="flex w-full justify-between">
                  {" "}
                  <span>Title: </span>{" "}
                  <Field
                    type="text"
                    className="border-6 h-[50px] w-[67%] rounded-md border border-solid border-black px-5 py-2 outline-none"
                    name="title"
                    placeholder="Title of Note"
                  />
                </div>
                <div className="flex w-full justify-between">
                  {" "}
                  <span className="flex flex-col justify-between flex-[0.5]"> 
                  <span>Upload File (pptx/pdf):</span>  
                  {formikState?.values?.file && <span className="overflow-hidden text-ellipsis whitespace-wrap max-w-[8em]"> "{formikState?.values?.file?.name}"</span> }
                  </span>
                  <div className="max-w-xl flex-1">
                    <label className="flex h-32 w-full cursor-pointer appearance-none justify-center rounded-md border-2 border-dashed border-gray-300 bg-white px-4 transition hover:border-gray-400 focus:outline-none">
                      <span className="flex items-center space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <span className="font-medium text-gray-600">
                          Drop files to Attach, or&nbsp;
                          <span className="text-blue-600 underline">
                            browse
                          </span>
                        </span>
                      </span>
                       <input name="file"  className="hidden" accept="application/pdf application/pptx" type="file" id="file" onChange={onUploadChange} />
                    </label>
                  </div>{" "}
                </div>

                <button className="w-full border border-black px-[35px] py-[10px] rounded-md hover:bg-slate-200" type="submit" value={'submit'} disabled={isLoading}>
                  {isLoading ? <Loader size={20} /> : 'Create'}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddNoteModal;
