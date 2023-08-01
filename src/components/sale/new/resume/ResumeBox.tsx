import { useNewSaleContext } from '@/contexts/NewSaleContext'
import { currencyFormatter } from '@/utils/formatter'

import ProcedureItem from './ProcedureItem'

enum PaymentType {
  MONEY = 'money',
  PIX = 'pix',
  DEBIT = 'debit',
  CREDIT = 'credit',
}

export default function ResumeBox() {
  const { sale } = useNewSaleContext()

  function hasProtocol() {
    if (!sale.protocolName) {
      return false
    }

    if (!sale.protocolDesc) {
      return false
    }

    return true
  }

  function hasAnyProcedure() {
    return sale.procedures.length > 0
  }

  function hasPaymentType() {
    return sale.paymentType
  }

  const handleSaveSale = () => {
    if (hasProtocol() && hasAnyProcedure() && hasPaymentType()) {
      console.log(sale)
    } else {
      console.log('Has errors')
    }
  }

  const getPaymentMethod = () => {
    if (sale?.paymentType === PaymentType.MONEY) {
      return 'Dinheiro'
    } else if (sale?.paymentType === PaymentType.PIX) {
      return 'Pix'
    } else if (sale?.paymentType === PaymentType.DEBIT) {
      return 'Débito'
    } else if (sale?.paymentType === PaymentType.CREDIT) {
      return 'Crédito'
    }
  }

  const getSubtotal = (value: number, discount: number) => {
    // const valueNum = parseFloat(value)
    // const discountNum = parseFloat(discount)
    // return valueNum - (valueNum * discountNum) / 100
    return value - (value * discount) / 100
  }

  const calculateDiscount = (value: number, discount: number) => {
    // const valueNum = parseFloat(value)
    // const discountNum = parseFloat(discount)
    // return (valueNum * discountNum) / 100
    return (value * discount) / 100
  }

  const getDiscount = () => {
    const valueWithDiscount = sale?.procedures.map((item) =>
      calculateDiscount(item.value, item.discount),
    )
    return valueWithDiscount?.reduce((acc, cur) => acc + cur, 0)
  }

  const getTotalValue = () => {
    const valueWithDiscount = sale?.procedures.map((item) =>
      getSubtotal(item.value, item.discount),
    )
    return valueWithDiscount?.reduce((acc, cur) => acc + cur, 0)
  }

  return (
    <div className="bg-white rounded w-full p-5 h-fit">
      <h1 className="text-lg font py-3">Resumo da venda</h1>
      <div className="flex flex-col">
        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center h-5 gap-1">
              <span className="text-gray-400 text-sm">Protocolo:</span>
              <span>{sale?.protocolName}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-400 text-sm w-fit">
                Descrição do protocolo:
              </span>
              <p className="line-clamp-3">{sale?.protocolDesc}</p>
            </div>
            <div className="flex h-5">
              <span className="text-gray-400 text-sm">Procedimentos:</span>
            </div>
          </div>
          <div className="flex items-center gap-1 w-fit">
            <span className="text-gray-400 text-sm w-full">
              Forma de pagamento:
            </span>
            <span className="w-16 flex justify-center">
              {getPaymentMethod()}
            </span>
          </div>
        </div>
        <div>
          {sale?.procedures &&
            sale?.procedures.map((procedure, index) => (
              <ProcedureItem key={index} procedure={procedure} />
            ))}
        </div>
        <div className="flex flex-col p-5 gap-2">
          <div className="flex justify-between">
            <span className="text-gray-400 text-sm">Desconto</span>
            <span className="text-gray-400 text-sm">
              {currencyFormatter.format(getDiscount())}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold">
              {currencyFormatter.format(getTotalValue())}
            </span>
          </div>
        </div>
        <button
          onClick={handleSaveSale}
          className="px-10 py-3 font-bold border border-info rounded text-info hover:bg-info hover:text-white transition duration-200"
        >
          Finalizar venda
        </button>
      </div>
    </div>
  )
}
