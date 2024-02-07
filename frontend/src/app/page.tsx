import { Link } from "@radix-ui/themes";

export default async function Home() {
  // Fetch data from the backend server
  const response = await fetch(`${process.env.NEXT_APP_BACKEND_URL}/patients`, {
    method: 'GET'
  });

  if (!response.ok){
    throw new Error('Error')
  }

  const patients = await response.json()

  return (
    <>
      <header>
        <h1 className="text-2xl">Todos</h1>
        {patients.map((patient: any) => <div>{patient.firstName}</div>)}
        
        <Link href="/login">Login</Link>
      </header>
    </>
  );
}
