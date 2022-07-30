import { Button, Dropdown, Label, TextInput } from "flowbite-react";

export default function CustomForm({ fields, areas, onSubmit, btnLabel }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        {
          fields.map((field) => {
            if (field.id === 'area') {
              return (
                <div key={field.id}>
                  <Label htmlFor={field.id}>{field.label}</Label>
                  <select id={field.id} name={field.name} onChange={field.onChange} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="">Seleccione una opción</option>
                    { areas &&
                      areas.map((area) => {
                        return (
                          <option key={area.idarea} value={area.idarea}>{area.nombre}</option>
                        )
                      }
                      )
                    }
                  </select>
                </div>
              );
            }else{
              return (
              <div key={field.id}>
                <div className="mb-2 block">
                  <Label
                    htmlFor={field.id}
                    value={field.label}
                  />
                </div>
                <TextInput
                  id={field.id}
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  type={field.type || 'text'}
                  placeholder={field.placeholder || ''}
                  readOnly={field.readonly || false}
                />
              </div>
            )
            }
          })
        }
        <div className="flex justify-center">
          <Button color="success" type="submit">
            {btnLabel}
          </Button>
        </div>
      </div>
    </form>
  )
}