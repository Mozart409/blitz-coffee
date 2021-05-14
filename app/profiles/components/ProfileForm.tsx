import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import * as z from "zod"
export { FORM_ERROR } from "app/core/components/Form"
export function ProfileForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
          <div aria-labelledby="profile_details_heading">
            <form>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="bg-white py-6 px-4 sm:p-6">
                  <div>
                    <h2
                      id="profile_details_heading"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Profile details
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">Update your profile information.</p>
                  </div>

                  <div className="mt-6 grid grid-cols-4 gap-6">
                    <div className="col-span-4 sm:col-span-2">
                      <LabeledTextField
                        autoComplete="cc-given-name"
                        name="name"
                        id="name"
                        label="Full Name"
                        placeholder="Max Mustermann"
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-600 focus:border-primary-600 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-4 sm:col-span-2">
                      <LabeledTextField
                        name="email"
                        id="email"
                        autoComplete="email"
                        label="Email address"
                        placeholder="name.surname@email.com"
                        type="email"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-600 focus:border-primary-600 sm:text-sm"
                        disabled
                      />
                    </div>

                    <div className="col-span-4 sm:col-span-2">
                      <LabeledTextField
                        name="id"
                        id="id"
                        autoComplete="text"
                        label="ID"
                        placeholder="1234"
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-600 focus:border-primary-600 sm:text-sm"
                        disabled
                      />
                    </div>

                    <div className="col-span-4 sm:col-span-2">
                      <LabeledTextField
                        name="role"
                        id="role"
                        label="Role"
                        placeholder="USER"
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-600 focus:border-primary-600 sm:text-sm"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Form>
  )
}
