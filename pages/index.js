import Head from 'next/head'
import NavBar from '../components/NavBar'
import CustomTable from '../components/CustomTable'
import axios from 'axios'
import CustomForm from '../components/CustomForm'
import { useContext, useEffect, useState } from 'react'
import { authContext } from '../context/AuthContext'
import { useRouter } from 'next/router'
import CustomModal from '../components/CustomModal'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)

export default function Home({ actas, areas }) {
  const router = useRouter()
  const { isAuthenticated, user } = useContext(authContext);
  const initialState = {
    area: "",
    tema: "",
    descripcion: "",
    responsabilidades: "",
    funcionario: user.idfuncionario,
  }
  const [loading, setLoading] = useState(true);
  const [infoActa, setInfoActa] = useState(initialState);
  const [infoActaEdit, setInfoActaEdit] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      if (!isAuthenticated) {
        await router.push('/login')
      } else {
        setLoading(false)
      }
    })()
  }, [isAuthenticated, router])

  const columns = [
    {
      field: 'idacta',
      title: 'ID',
    },
    {
      field: 'area',
      title: 'Area encargada',
    },
    {
      field: 'tema',
      title: 'Tema',
    },
    {
      field: 'descripcion',
      title: 'Descripción',
    },
    {
      field: 'funcionario',
      title: 'Funcionario',
    },
    {
      field: 'createdAt',
      title: 'Marca Cronológica',
    },
    {
      field: 'responsabilidades',
      title: 'Responsabilidades',
    }
  ]

  const fields = [
    {
      id: 'area',
      name: 'area',
      label: 'Area encargada',
      value: infoActa.area,
      onChange: (e) => setInfoActa({ ...infoActa, area: e.target.value }),
    },
    {
      id: 'tema',
      name: 'tema',
      label: 'Tema',
      value: infoActa.tema,
      onChange: (e) => setInfoActa({ ...infoActa, tema: e.target.value }),
    },
    {
      id: 'descripcion',
      name: 'descripcion',
      label: 'Descripción',
      value: infoActa.descripcion,
      onChange: (e) => setInfoActa({ ...infoActa, descripcion: e.target.value }),
    },
    {
      id: 'responsabilidades',
      name: 'responsabilidades',
      label: 'Responsabilidades',
      value: infoActa.responsabilidades,
      onChange: (e) => setInfoActa({ ...infoActa, responsabilidades: e.target.value }),
    },
    {
      id: 'funcionario',
      name: 'funcionario',
      label: 'ID Funcionario',
      value: infoActa.funcionario,
      readonly: true,
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/actas/add', infoActa)
      const { data } = response
      if (data.ok) {
        MySwal.fire({
          title: 'Exito',
          text: `${data.message}`,
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(() => {
          router.push('/')
          setInfoActa(initialState)
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
      } else if (response.status === 500) {
        MySwal.fire({
          title: 'Error',
          text: 'Error en el servidor',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    }
  }

  const handleEditModal = async (item) => {
    setInfoActaEdit({})
    setInfoActaEdit(item)
    setShowModal(true)
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(`/api/actas/edit/${infoActaEdit.idacta}`, infoActaEdit)
      const { data } = response
      if (data.ok) {
        MySwal.fire({
          title: 'Exito',
          text: `${data.message}`,
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(() => {
          setInfoActaEdit({})
          setShowModal(false)
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
      } else if (response.status === 500) {
        MySwal.fire({
          title: 'Error',
          text: 'Error en el servidor',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/actas/delete/${id}`)
      const { data } = response
      if (data.ok) {
        MySwal.fire({
          title: 'Exito',
          text: `${data.message}`,
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(() => {
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
      } else if (response.status === 500) {
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
        <title>Inicio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="h-[calc(100vh-64px)] overflow-y-auto">
        <section className="flex flex-col gap-4 max-h-96">
          <CustomTable
            columns={columns}
            data={actas}
            onDelete={handleDelete}
            onUpdate={handleEditModal}
          />
        </section>
        <section className="flex flex-col w-1/2 m-auto my-10">
          <h2 className="text-center text-2xl">Crear Acta</h2>
          <CustomForm
            fields={fields}
            areas={areas}
            onSubmit={handleSubmit}
            btnLabel="Crear Acta"
          />
          <CustomModal
            title={'Actualizar Acta'}
            fields={fields.map(field => {
              if (field.id === 'funcionario') {
                return {
                  ...field,
                  value: infoActaEdit.idfuncionario,
                  onChange: (e) => setInfoActaEdit({ ...infoActaEdit, idfuncionario: e.target.value })
                }
              } else if (field.id === 'area') {
                return {
                  ...field,
                  value: infoActaEdit.idarea,
                  onChange: (e) => setInfoActaEdit({ ...infoActaEdit, idarea: e.target.value })
                }
              } else {
                return {
                  ...field,
                  value: infoActaEdit[field.id],
                  onChange: (e) => setInfoActaEdit({ ...infoActaEdit, [field.id]: e.target.value })
                }
              }
            })}
            areas={areas}
            onUpdate={handleEdit}
            data={infoActaEdit}
            show={showModal}
            onClose={() => {
              setShowModal(false)
              setInfoActaEdit({})
            }}
          />
        </section>
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  
  let actas = []
  let areas = []
  try {
    const response = await axios.get(`${process.env.API_URL}/api/actas`)
    const { data } = response    
    if (data.ok) {
      actas = data.data
    }
  } catch (error) {
    const { response } = error
    console.log(response.data)
  }

  try {
    const response2 = await axios.get(`${process.env.API_URL}/api/areas`)
    const { data: data2 } = response2    
    if (data2.ok) {
      areas = data2.data
    }
  } catch (error) {
    const { response } = error
    console.log(response.data)
  }

  return {
    props: {
      actas,
      areas
    },
  }
}
