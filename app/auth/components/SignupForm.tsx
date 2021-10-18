import { useMutation, Link } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import { usePlausible } from "next-plausible"
type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const plausible = usePlausible()
  return (
    <div>
      <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{ name: "", email: "", password: "" }}
        pageTitle="Signup"
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            plausible("signupSuccess")
            props.onSuccess?.()
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              plausible("signupEmailTaken")
              return { email: "This email is already being used" }
            } else {
              plausible("signupFormError")
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="name" label="Name" placeholder="Name" type="text" />
        <LabeledTextField name="email" label="Email" placeholder="Email" type="email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
        <Link href="/login">
          <a className="text-sm underline text-primary-600">Or login in via your account.</a>
        </Link>
      </Form>
    </div>
  )
}

export default SignupForm
