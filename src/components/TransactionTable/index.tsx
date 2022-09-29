import { Transaction } from '../../context/TransactionContext'
import { SearchBox } from '../../pages/Transactions/components/SearchBox'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import {
  NotFoundTableRow,
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable as Table,
} from './styles'

interface TransactionsTableProps {
  data: Transaction[]
}

export function TransactionsTable({ data }: TransactionsTableProps) {
  return (
    <TransactionsContainer>
      <SearchBox />
      <Table>
        <tbody>
          {data.length ? (
            data.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight color={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.amount)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <NotFoundTableRow>
                Sorry, no results were found for your search
              </NotFoundTableRow>
            </tr>
          )}
        </tbody>
      </Table>
    </TransactionsContainer>
  )
}
