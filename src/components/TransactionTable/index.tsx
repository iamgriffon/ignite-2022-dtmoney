import { SearchBox } from "../../pages/Transactions/components/SearchBox";
import { PriceHighlight, TransactionsContainer, TransactionsTable as Table} from "./styles";

export function TransactionsTable() {
  return (
    <TransactionsContainer>
      <SearchBox />
    <Table>
      <tbody>
        <tr>
          <td width="50%">Desenvolvimento de Site</td>
          <td>
            <PriceHighlight color='income'>
              R$ 12.000,00
            </PriceHighlight>
          </td>
          <td>Venda</td>
          <td>13/04/2022</td>
        </tr>
        <tr>
          <td width="50%">Corre</td>
          <td>
            <PriceHighlight color='outcome'>
             - R$ 120,00
            </PriceHighlight>
          </td>
          <td>Compra</td>
          <td>16/04/2022</td>
        </tr>
        <tr>
          <td width="50%">Desenvolvimento de Site</td>
          <td>
            <PriceHighlight color='income'>
              R$ 12.000,00
            </PriceHighlight>
          </td>
          <td>Venda</td>
          <td>13/04/2022</td>
        </tr>
        <tr>
          <td width="50%">Corre</td>
          <td>
            <PriceHighlight color='outcome'>
               - R$ 120,00
            </PriceHighlight>
          </td>
          <td>Compra</td>
          <td>16/04/2022</td>
        </tr>
      </tbody>
    </Table>
    </TransactionsContainer>
  )
}