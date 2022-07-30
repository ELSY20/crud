import Head from 'next/head'
import NavBar from '../components/NavBar'
import axios from 'axios'
import CustomForm from '../components/CustomForm'
import { useContext, useEffect, useState } from 'react'
import { Button } from 'flowbite-react'
import { useRouter } from 'next/router'
import { authContext } from '../context/AuthContext'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)


const initialState = {
  correo: "",
  contrasena: "",
}

export default function Login() {
  const router = useRouter()

  const [infoLogin, setInfoLogin] = useState(initialState)
  const { login } = useContext(authContext);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      let user = JSON.parse(localStorage.getItem('session'))
      if (user) {
        login(user)
        await router.push('/')
      }
      setLoading(false)
    })()
  }, [])

  const fields = [
    {
      id: 'correo',
      name: 'correo',
      label: 'Correo',
      value: infoLogin.correo,
      onChange: (e) => setInfoLogin({ ...infoLogin, correo: e.target.value }),
      placeholder: 'Ingrese su correo',
      type: 'email',
    },
    {
      id: 'contrasena',
      name: 'contrasena',
      label: 'Contraseña',
      value: infoLogin.contrasena,
      onChange: (e) => setInfoLogin({ ...infoLogin, contrasena: e.target.value }),
      type: 'password',
      placeholder: 'Ingrese su contraseña',
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/auth/inicio-sesion', infoLogin)
      const { data } = response
      if (data.ok) {
        MySwal.fire({
          title: 'Bienvenido',
          text: `Hola ${data.data.nombre}`,
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(() => {
          login(data.data)
          localStorage.setItem('session', JSON.stringify(data.data))
          router.push('/')
        })
      }
    } catch (error) {
      const { response } = error
      if (response.status >= 400 && response.status < 500) {
        MySwal.fire({
          title: 'Error',
          text: response.data.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }else if (response.status === 500) {
        MySwal.fire({
          title: 'Error',
          text: 'Error en el servidor',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="h-[calc(100vh-64px)] overflow-y-auto">
        <section className="flex flex-col w-1/2 m-auto my-10">
          <h2 className="text-center text-2xl">Iniciar Sesion</h2>
          <CustomForm
            fields={fields}
            onSubmit={handleSubmit}
            btnLabel="Iniciar Sesion"
          />
          <Button
            size="xs"
            type="button"
            onClick={() => router.push('/register')}
          >
            Registrarse
          </Button>
        </section>
      </main>
    </>
  )
}
