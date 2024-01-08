'use client'
import RadioButton from '@/components/form/inputs/RadioButton'
import { useNewSaleContext } from '@/contexts/NewSaleContext'
import { PaymentTypeEnum } from '@/enum/PaymentTypeEnum'
import { Banknote, CreditCard, Landmark, SmartphoneNfc } from 'lucide-react'
import { useState } from 'react'

export default function PaymentCard() {
  const { sale, updateSale } = useNewSaleContext()

  const [moneyButtonClicked, setMoneyButtonClicked] = useState(false)
  const [pixButtonClicked, setPixButtonClicked] = useState(false)
  const [debitButtonClicked, setDebitButtonClicked] = useState(false)
  const [creditButtonClicked, setCreditButtonClicked] = useState(false)

  const setPaymentMethod = (type: string) => {
    const saleCopy = { ...sale }
    saleCopy.paymentType = type
    updateSale(saleCopy)
  }

  const handlePaymentMethod = (type: string) => {
    if (type === PaymentTypeEnum.MONEY && moneyButtonClicked === false) {
      setMoneyButtonClicked(!moneyButtonClicked)
      setPixButtonClicked(false)
      setDebitButtonClicked(false)
      setCreditButtonClicked(false)
      setPaymentMethod(type)
    } else if (type === PaymentTypeEnum.PIX && pixButtonClicked === false) {
      setMoneyButtonClicked(false)
      setPixButtonClicked(!pixButtonClicked)
      setDebitButtonClicked(false)
      setCreditButtonClicked(false)
      setPaymentMethod(type)
    } else if (type === PaymentTypeEnum.DEBIT && debitButtonClicked === false) {
      setMoneyButtonClicked(false)
      setPixButtonClicked(false)
      setDebitButtonClicked(!debitButtonClicked)
      setCreditButtonClicked(false)
      setPaymentMethod(type)
    } else if (
      type === PaymentTypeEnum.CREDIT &&
      creditButtonClicked === false
    ) {
      setMoneyButtonClicked(false)
      setPixButtonClicked(false)
      setDebitButtonClicked(false)
      setCreditButtonClicked(!creditButtonClicked)
      setPaymentMethod(type)
    }
  }

  return (
    <div className="bg-white rounded p-5 flex flex-col gap-3">
      <h2>Forma de pagamento</h2>
      <div className="flex gap-5 w-full">
        <RadioButton
          onClick={() => handlePaymentMethod(PaymentTypeEnum.MONEY)}
          isClicked={moneyButtonClicked}
        >
          <Banknote />
          {PaymentTypeEnum.MONEY}
        </RadioButton>
        <RadioButton
          onClick={() => handlePaymentMethod(PaymentTypeEnum.PIX)}
          isClicked={pixButtonClicked}
        >
          <SmartphoneNfc />
          {PaymentTypeEnum.PIX}
        </RadioButton>
        <RadioButton
          onClick={() => handlePaymentMethod(PaymentTypeEnum.DEBIT)}
          isClicked={debitButtonClicked}
        >
          <Landmark />
          {PaymentTypeEnum.DEBIT}
        </RadioButton>
        <RadioButton
          onClick={() => handlePaymentMethod(PaymentTypeEnum.CREDIT)}
          isClicked={creditButtonClicked}
        >
          <CreditCard />
          {PaymentTypeEnum.CREDIT}
        </RadioButton>
      </div>
    </div>
  )
}
