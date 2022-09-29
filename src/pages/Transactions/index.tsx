import { useEffect, useMemo } from 'react'
import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionsTable } from '../../components/TransactionTable'
import { TransactionContext } from '../../context/TransactionContext'

export default function Transactions() {
  const { fetchTransactions, transactions } = useContextSelector(
    TransactionContext,
    (context) => {
      return {
        transactions: context.transactions,
        fetchTransactions: context.fetchTransactions,
      }
    },
  )

  // This will calculate summary stuff based on the fetched data, then pass it as a prop
  const summary = useMemo(() => {
    const summary = transactions.reduce(
      (accumulator, transaction) => {
        if (transaction.type === 'income') {
          accumulator.income += transaction.amount
          accumulator.total += transaction.amount
        } else {
          accumulator.outcome += transaction.amount
          accumulator.total -= accumulator.outcome
        }
        return accumulator
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )
    return summary
  }, [transactions])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <>
      <Header />
      <Summary data={summary} />
      <TransactionsTable data={transactions} />
    </>
  )
}
