import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleUp, X } from 'phosphor-react'
import {
  CloseButton,
  Content,
  Overlay,
  TransactionButton,
  TransactionButtonContainer,
} from './styles'
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionContext } from '../../context/TransactionContext'
import { useContextSelector } from 'use-context-selector'

const ModalFormSchema = z.object({
  description: z.string(),
  amount: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type ModalFormSchemaProps = z.infer<typeof ModalFormSchema>

export function Modal() {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<ModalFormSchemaProps>({
    resolver: zodResolver(ModalFormSchema),
  })

  const addTransaction = useContextSelector(TransactionContext, (context) => {
    return context.addTransaction
  })

  async function handleCreateNewTransaction(data: ModalFormSchemaProps) {
    reset()
    addTransaction(data)
  }

  return (
    <Dialog.Portal>
      <Overlay>
        <Content>
          <Dialog.Title>New Transaction</Dialog.Title>
          <CloseButton>
            <X size={24} />
          </CloseButton>

          <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
            <input
              type="text"
              placeholder="Enter a description"
              required
              {...register('description')}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Enter the amount"
              required
              {...register('amount', { valueAsNumber: true })}
            />
            <input
              type="text"
              placeholder="Enter a category"
              required
              {...register('category')}
            />

            <Controller
              control={control}
              name="type"
              render={(props) => {
                return (
                  <TransactionButtonContainer
                    onValueChange={props.field.onChange}
                    value={props.field.value}
                  >
                    <TransactionButton value="income" variant="income">
                      <ArrowCircleUp size={24} />
                      Income
                    </TransactionButton>
                    <TransactionButton value="outcome" variant="outcome">
                      <ArrowCircleUp size={24} />
                      Outcome
                    </TransactionButton>
                  </TransactionButtonContainer>
                )
              }}
            />
            <button type="submit" disabled={isSubmitting}>
              Register!
            </button>
          </form>
        </Content>
      </Overlay>
    </Dialog.Portal>
  )
}
