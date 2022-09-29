import { ReactNode, useCallback, useState } from 'react'
import { createContext } from 'use-context-selector'
import { Api } from '../services/axios'

export type Transaction = {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  amount: number
  createdAt: string
}

interface NewTransactionProps {
  description: string
  type: 'income' | 'outcome'
  category: string
  amount: number
}

interface TransactionContextProps {
  transactions: Transaction[]
  fetchTransactions: (param?: string) => void
  addTransaction: (param: NewTransactionProps) => void
}

interface TransactionProviderProps {
  children: ReactNode
}

export const TransactionContext = createContext({} as TransactionContextProps)

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    await Api.get('transactions', {
      params: {
        q: query,
        _sort: 'createdAT',
        _order: 'desc',
      },
    }).then((response) => setTransactions(response.data))
  }, [])

  /* useCallback memoriza uma função e guarda-a mesmo quando algum componente que depende dela muda (não re-renderiza a função) */
  /*  useMemo "guarda" variáveis e o React só re-renderiza ela quando alguma dependência dela mudar */
  /* memo() "guarda" components e o React só os re-renderiza se alguma prop ou estado dele mudar  */
  const addTransaction = useCallback(async (data: NewTransactionProps) => {
    const requestData = {
      ...data,
      createdAt: new Date(),
    }
    const response: Transaction = await Api.post(
      'transactions',
      requestData,
    ).then((response) => response.data)

    setTransactions((prevState) => {
      return [...prevState, response]
    })
  }, [])

  return (
    <TransactionContext.Provider
      value={{ transactions, fetchTransactions, addTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
