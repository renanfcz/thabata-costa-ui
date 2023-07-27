'use client'
import RadioButton from '@/components/form/RadioButton'
import { useNewSaleContext } from '@/contexts/NewSaleContext'
import { Banknote, CreditCard, Landmark, SmartphoneNfc } from 'lucide-react'
import { useState } from 'react'

export default function PaymentCard() {
  const { sale, updateSale } = useNewSaleContext()

  const [moneyButtonClicked, setMoneyButtonClicked] = useState(false)
  const [pixButtonClicked, setPixButtonClicked] = useState(false)
  const [debitButtonClicked, setDebitButtonClicked] = useState(false)
  const [creditButtonClicked, setCreditButtonClicked] = useState(false)

  const setPaymentMethod = (method: number) => {
    const saleCopy = { ...sale }
    saleCopy.paymentMethod = method
    updateSale(saleCopy)
  }

  const handlePaymentMethod = (buttonNumber: number) => {
    if (buttonNumber === 1) {
      setMoneyButtonClicked(!moneyButtonClicked)
      setPixButtonClicked(false)
      setDebitButtonClicked(false)
      setCreditButtonClicked(false)
      setPaymentMethod(1)
    } else if (buttonNumber === 2) {
      setMoneyButtonClicked(false)
      setPixButtonClicked(!pixButtonClicked)
      setDebitButtonClicked(false)
      setCreditButtonClicked(false)
      setPaymentMethod(2)
    } else if (buttonNumber === 3) {
      setMoneyButtonClicked(false)
      setPixButtonClicked(false)
      setDebitButtonClicked(!debitButtonClicked)
      setCreditButtonClicked(false)
      setPaymentMethod(3)
    } else if (buttonNumber === 4) {
      setMoneyButtonClicked(false)
      setPixButtonClicked(false)
      setDebitButtonClicked(false)
      setCreditButtonClicked(!creditButtonClicked)
      setPaymentMethod(4)
    }
  }

  return (
    <div className="bg-white rounded p-5 flex flex-col gap-3">
      <h2>Forma de pagamento</h2>
      <div className="flex gap-5 w-full">
        <RadioButton
          onClick={() => handlePaymentMethod(1)}
          isClicked={moneyButtonClicked}
        >
          <Banknote />
          Dinheiro
        </RadioButton>
        <RadioButton
          onClick={() => handlePaymentMethod(2)}
          isClicked={pixButtonClicked}
        >
          <SmartphoneNfc />
          Pix
        </RadioButton>
        <RadioButton
          onClick={() => handlePaymentMethod(3)}
          isClicked={debitButtonClicked}
        >
          <Landmark />
          Débito
        </RadioButton>
        <RadioButton
          onClick={() => handlePaymentMethod(4)}
          isClicked={creditButtonClicked}
        >
          <CreditCard />
          Crédito
        </RadioButton>
      </div>
    </div>
  )
}
