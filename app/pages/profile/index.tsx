import React, { Suspense } from "react"
import { Head, BlitzPage, useMutation, Router } from "blitz"

import Layout from "app/core/layouts/Layout"

import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { FORM_ERROR, ProfileForm } from "app/profiles/components/ProfileForm"
import updateProfile from "app/profiles/mutations/updateProfile"
import Heading from "app/core/components/Heading"

export const Profile = () => {
  const currentUser = useCurrentUser()
  const [updateProfileMutation] = useMutation(updateProfile)
  return (
    <>
      <Head>
        <title>Profile Page</title>
      </Head>

      <div>
        <Heading type="h1">
          <span>Hello, {currentUser?.name ? currentUser?.name : "User"}</span>
        </Heading>
      </div>

      <ProfileForm
        submitText="Update Profile Data"
        initialValues={{
          id: currentUser?.id,
          name: currentUser?.name,
          role: currentUser?.role,
          email: currentUser?.email,
        }}
        onSubmit={async (values) => {
          try {
            const profile = await updateProfileMutation(values)
            Router.reload()
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </>
  )
}

const ShowProfilePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Profile />
      </Suspense>
    </div>
  )
}

ShowProfilePage.authenticate = true
ShowProfilePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowProfilePage
function createProfileMutation(values: any) {
  throw new Error("Function not implemented.")
}
