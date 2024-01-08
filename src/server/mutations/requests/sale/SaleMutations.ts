import { gql } from 'graphql-request'

export const UPDATE_PROTOCOL = gql`
  mutation UpdateSale($id: String!, $sale: UpdateSaleInput!) {
    updateSale(id: $id, sale: $sale) {
      createdAt
      id
      protocolDesc
      protocolName
      saleItems {
        discount
        id
        value
        sessions {
          id
          initDate
          obs
          finalDate
          saleItem {
            discount
            id
            sessionsNum
            value
            procedure {
              id
              name
              price
            }
          }
        }
        procedure {
          id
          name
          price
        }
        sessionsNum
      }
    }
  }
`

export const CREATE_SALE = gql`
  mutation CreateSale($createSaleInput: CreateSaleInput!) {
    createSale(createSaleInput: $createSaleInput) {
      client {
        name
      }
      createdAt
      id
      paymentType
      protocols {
        protocolName
        protocolDesc
        saleItems {
          value
          discount
          sessionsNum
          procedure {
            name
            color
          }
        }
      }
    }
  }
`
