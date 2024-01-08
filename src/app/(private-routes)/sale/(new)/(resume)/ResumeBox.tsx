import { useNewSaleContext } from '@/contexts/NewSaleContext'
import { PaymentTypeEnum } from '@/enum/PaymentTypeEnum'
import { graphqlClient } from '@/server/graphql-client'
import { CREATE_SALE } from '@/server/mutations/requests/sale/SaleMutations'
import { ResponseCreateSale } from '@/server/mutations/responses/SaleResponses'
import { currencyFormatter } from '@/utils/formatter'
import { toast } from 'react-toastify'

import ProtocolItem from './ProtocolItem'

export default function ResumeBox() {
  const { sale, updateSale } = useNewSaleContext()

  function hasProtocol() {
    if (sale?.protocols) {
      return true
    }

    toast.error('Adicione pelo menos um protocolo.', {
      autoClose: 5000,
    })

    return false
  }

  function hasClient() {
    if (sale?.clientId) {
      return true
    }
    toast.error('Selecione um Cliente.', {
      autoClose: 5000,
    })
    return false
  }

  function hasPaymentType() {
    if (sale?.paymentType) {
      return true
    }

    toast.error('Selecione método de pagamento.', {
      autoClose: 5000,
    })
    return false
  }

  function resetForm() {
    updateSale({
      clientId: '',
      protocols: [],
      paymentType: undefined,
    })
  }

  const handleSaveSale = async () => {
    if (hasClient() && hasProtocol() && hasPaymentType()) {
      const loading = toast.loading('Salvando...')
      try {
        await graphqlClient.request<ResponseCreateSale>(CREATE_SALE, {
          createSaleInput: {
            clientId: sale?.clientId,
            protocols: sale?.protocols,
            paymentType: PaymentTypeEnum.getKey(sale?.paymentType),
          },
        })
        toast.update(loading, {
          render: 'Venda salva com sucesso!',
          type: 'success',
          isLoading: false,
          autoClose: 5000,
        })
        resetForm()
      } catch (error: any) {
        toast.update(loading, {
          render: error.response.errors[0].message,
          type: 'error',
          isLoading: false,
          autoClose: 5000,
        })
      }
    }
  }

  const getSubtotal = (value: number, discount: number) => {
    return value - (value * discount) / 100
  }

  const calculateDiscount = (value: number, discount: number) => {
    return (value * discount) / 100
  }

  const getDiscount = () => {
    const saleItems = sale?.protocols?.flatMap((protocol) => protocol.saleItems)
    const valueWithDiscount = saleItems?.map((item) =>
      calculateDiscount(item.value, item.discount),
    )
    return valueWithDiscount?.reduce((acc, cur) => acc + cur, 0) || 0
  }

  const getTotalValue = () => {
    const saleItems = sale?.protocols?.flatMap((protocol) => protocol.saleItems)
    const valueWithDiscount = saleItems?.map((item) =>
      getSubtotal(item.value, item.discount),
    )
    return valueWithDiscount?.reduce((acc, cur) => acc + cur, 0) || 0
  }

  return (
    <div className="bg-white rounded w-full p-5 h-fit">
      <h1 className="text-lg font py-3">Resumo da venda</h1>
      <div className="flex flex-col">
        <div className="flex w-full justify-between">
          <div className="flex w-full justify-end gap-2">
            <span>Forma de pagamento: </span>
            <span className="w-16 font-bold">
              {sale?.paymentType ? sale?.paymentType.toString() : ''}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {sale?.protocols &&
            sale?.protocols?.map((protocol, index) => (
              <ProtocolItem
                key={index}
                protocol={protocol}
                protocolIndex={index}
              />
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
