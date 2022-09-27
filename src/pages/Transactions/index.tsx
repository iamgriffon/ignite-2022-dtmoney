import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { TransactionsTable } from "../../components/TransactionTable";

export default function Transactions(){
  return (
    <>
      <Header />
      <Summary />
      <TransactionsTable />
    </>
  )
}