import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import Link from "next/link";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";

export default function NavBar() {

  const { isAuthenticated, logout } = useContext(authContext);

  return (
    <Navbar
      style={{
        backgroundColor: "yellow",
        height: "64px",
        alignContent: "center",
      }}
    >
      <Navbar.Brand>
        <span className="self-center whitespace-nowrap text-4xl font-semibold dark:text-white">
          Actas
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {
          isAuthenticated && (
            <Button
              color="failure"
              onClick={()=>{
                logout()
                localStorage.removeItem('session')
              }}
            >
              Cerrar sesión
            </Button>
          )
        }
      </Navbar.Collapse>
    </Navbar>
  )
}