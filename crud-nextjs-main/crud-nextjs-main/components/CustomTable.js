import { Table, Dropdown } from "flowbite-react";

export default function CustomTable({data, columns, onDelete, onUpdate}) {
  return(
    <Table>
      <Table.Head>
        {columns && columns.map((column, index) => (
          <Table.HeadCell key={index}>{column.title}</Table.HeadCell>
        ))}
        <Table.HeadCell>Actions</Table.HeadCell>        
      </Table.Head>
      <Table.Body>
        {data && data.map((row) => (
          <Table.Row key={row.idacta}>
            {columns.map((column, index) => {
                if(column.field === "funcionario"){
                  return <Table.Cell key={index}>{row.funcionario.nombre}</Table.Cell>
                }else if(column.field === "area"){
                  return <Table.Cell key={index}>{row.area.nombre}</Table.Cell>
                }else if(column.field === "createdAt"){
                  return <Table.Cell key={index}>{new Date(row.createdAt).toLocaleString()}</Table.Cell>
                }else{
                  return <Table.Cell key={index}>{row[column.field]}</Table.Cell>
                }                
            })}
            <Table.Cell>
              <Dropdown>
                <Dropdown.Item onClick={() => onUpdate(row)}>Editar</Dropdown.Item>
                <Dropdown.Item onClick={() => onDelete(row.idacta)}>Eliminar</Dropdown.Item>
              </Dropdown>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}