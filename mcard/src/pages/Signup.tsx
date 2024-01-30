import Form from '@/components/signup/Form'
import { COLLECTION } from '@/constants'
import { FormValues } from '@/models/signup'
import { auth, store } from '@/remote/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
  const navigate = useNavigate()
  const handleSubmit = async (form: FormValues) => {
    const { email, password, name } = form
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(user, {
      displayName: name,
    })
    const newUser = {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
    }

    await setDoc(doc(collection(store, COLLECTION.USER), user.uid), newUser)
    navigate('/')
  }

  return (
    <div>
      <Form handleSubmit={handleSubmit} />
    </div>
  )
}

export default SignupPage
