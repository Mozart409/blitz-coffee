import { AuthenticationError, Link, useMutation, Routes } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { usePlausible } from "next-plausible"
type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const plausible = usePlausible()
  return (
    <div>
      <Form
        submitText="Login"
        schema={Login}
        initialValues={{ email: "", password: "" }}
        pageTitle="Login"
        onSubmit={async (values) => {
          try {
            await loginMutation(values)
            plausible("loginSuccess")
            props.onSuccess?.()
          } catch (error) {
            if (error instanceof AuthenticationError) {
              plausible("loginWrongCreds")
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              plausible("loginFormError")
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField type="email" name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
        <div className="text-sm">
          <div>
            <Link href={Routes.ForgotPasswordPage()}>
              <a className="text-sm underline text-primary-600">Forgot your password?</a>
            </Link>
          </div>
          <div>
            Or{" "}
            <Link href={Routes.SignupPage()}>
              <a className="text-sm underline text-primary-600">Sign Up</a>
            </Link>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default LoginForm
