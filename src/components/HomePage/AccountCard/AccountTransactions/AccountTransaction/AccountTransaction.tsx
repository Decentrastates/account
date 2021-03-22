import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Props } from './AccountTransaction.types'
import './AccountTransaction.css'
import {
  Deposit,
  DepositStatus,
  Transfer,
  TransferStatus,
  TransactionStatus,
  TransactionType,
  Withdrawal,
  WithdrawalStatus,
} from '../../../../../modules/mana/types'
import { getStatusMessage } from '../../../../../modules/mana/utils'

const AccountTransaction = ({
  transaction,
  onTransactionDetail,
  onPendingWithDrawal,
}: Props) => {
  const { type, status } = transaction

  const isPending = () => {
    if (type === TransactionType.WITHDRAWAL) {
      if (
        data.status === WithdrawalStatus.CHECKPOINT ||
        data.status === WithdrawalStatus.PENDING
      ) {
        return true
      }
    } else if (type === TransactionType.DEPOSIT) {
      if (data.status === DepositStatus.PENDING) {
        return true
      }
    } else if (type === TransactionType.TRANSFER) {
      if (data.status === TransferStatus.PENDING) {
        return true
      }
    }
    return false
  }

  const shortening = (address: string): string =>
    address ? `${address.slice(0, 4)}...${address.slice(-4)}` : ''

  let data: any
  let description = ''
  if (type === TransactionType.DEPOSIT) {
    description = t('transaction_description.deposit')
    data = transaction.data as Deposit
  } else if (type === TransactionType.WITHDRAWAL) {
    description = t('transaction_description.withdrawal')
    data = transaction.data as Withdrawal
  } else if (type === TransactionType.BUY) {
    description = t('transaction_description.buy')
  } else if (type === TransactionType.TRANSFER) {
    data = transaction.data as Transfer
    description = `${t('transaction_description.send')} ${shortening(data.to)}`
  }

  let transactionLogo = ''
  if (isPending()) {
    transactionLogo = 'pending-transaction-logo'
  } else if (type === TransactionType.DEPOSIT || type === TransactionType.BUY) {
    transactionLogo = 'in-transaction-logo'
  } else if (
    type === TransactionType.WITHDRAWAL ||
    type === TransactionType.TRANSFER
  ) {
    transactionLogo = 'out-transaction-logo'
  } else if (status === TransactionStatus.REJECTED) {
    transactionLogo = 'rejected-transaction-logo'
  }

  const handleDetailModal = () => {
    if (
      type === TransactionType.WITHDRAWAL &&
      (data.status === WithdrawalStatus.PENDING ||
        data.status === WithdrawalStatus.CHECKPOINT)
    ) {
      onPendingWithDrawal(data.hash)
    } else {
      onTransactionDetail(description, transaction)
    }
  }

  return (
    <div className="AccountTransaction" onClick={handleDetailModal}>
      <div className="type">
        <div className={`transaction-logo ${transactionLogo}`} />
      </div>
      <div className="DescriptionStatus">
        <div> {description} </div>
        <div> {getStatusMessage(type, data.status)} </div>
      </div>
      <div className="amount"> {data?.amount} </div>
    </div>
  )
}

export default React.memo(AccountTransaction)
