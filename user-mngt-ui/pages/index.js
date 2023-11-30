import { getSession } from "next-auth/react";
import Head from "next/head";
import AddUser from "../components/AddUser";
import Login from "../components/Login";
import Navbar from "../components/Navbar";
import UserList from "../components/UserList";
import Dashboard from "../components/Dashboard";
import AddDepartment from "../components/AddDepartment";
import DepartmentList from "../components/DepartmentList";

export default function Home({ session }) {
  if (!session) return <Login />;
  return (
    <div>
      <Head>
        <title>User management App</title>
      </Head>
      <Navbar />

      <main>
        <AddUser />
        <AddDepartment />
        <UserList />

        <DepartmentList />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
