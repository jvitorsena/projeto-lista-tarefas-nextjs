import Table from "../components/tarefas/table.tsx"

export default function Home(props) {
  return (
    <>
      <Table data={props.data} />
    </>
  )
}

export async function getServerSideProps() {
  const reponse = await fetch('http://localhost:8000/tarefas')
  const data =  await reponse.json()
  // console.log(data)

  return { props: {data}}
}