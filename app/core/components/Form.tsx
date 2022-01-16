import { ReactNode, PropsWithoutRef } from "react"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import * as z from "zod"
import { Image } from "blitz"
import Heading from "./Heading"
export { FORM_ERROR } from "final-form"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
  /** PageTitle */
  pageTitle?: string
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  pageTitle,
  ...props
}: FormProps<S>) {
  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md md:w-full md:max-w-xl">
        <div className="flex justify-center mx-auto">
          <Image
            className="mx-auto w-auto h-12 rounded"
            src="/apple-icon-180.png"
            alt="Carty"
            height={48}
            width={48}
          />
        </div>

        <Heading type={"h1"}>{pageTitle}</Heading>

        <FinalForm
          initialValues={initialValues}
          validate={(values) => {
            if (!schema) return
            try {
              schema.parse(values)
            } catch (error) {
              return error.formErrors.fieldErrors
            }
          }}
          onSubmit={onSubmit}
          render={({ handleSubmit, submitting, submitError }) => (
            <form onSubmit={handleSubmit} className="form" {...props}>
              {/* Form fields supplied as children are rendered here */}
              {children}

              {submitError && (
                <div role="alert" style={{ color: "red" }}>
                  {submitError}
                </div>
              )}

              {submitText && (
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex justify-center py-2 px-4 w-full text-base font-medium text-white rounded-md border border-transparent duration-150 bg-primary-600 hover:bg-primary-700"
                >
                  {submitText}
                </button>
              )}
            </form>
          )}
        />
      </div>
    </div>
  )
}

export default Form
