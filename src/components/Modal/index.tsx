import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import { CloseButton, Content, Overlay } from "./styles";

export function Modal() {
  return (
    <Dialog.Portal>
      <Overlay>
        <Content>
          <Dialog.Title>New Transaction</Dialog.Title>
          <CloseButton><X size={24} /></CloseButton>

          <form action="#">
            <input type="text" placeholder="Enter a description" />
            <input type="number" placeholder="Enter the amount" />
            <input type="text" placeholder="Enter a category" />
            <button type="submit">
              Register!
            </button>
          </form>
        </Content>
      </Overlay>
    </Dialog.Portal>
  )
}