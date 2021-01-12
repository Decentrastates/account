import React from 'react'
import { Props } from './AccountTransaction.types'
import './AccountTransaction.css'
import { TransactionStatus, TransactionType } from '../../AccountCard.types'

const AccountTransaction = ({ amount, type, status, description }: Props) => (
  <div className="AccountTransaction">
    <div className="type">
      <div
        className={
          type === TransactionType.DEPOSIT
            ? 'in-transaction-logo'
            : type === TransactionType.WITHDRAWAL
            ? 'out-transaction-logo'
            : status === TransactionStatus.PENDING
            ? 'pending-transaction-logo'
            : ''
        }
      />
    </div>
    <div className="DescriptionStatus">
      <div> {description} </div>
      <div> {status} </div>
    </div>
    <div> {amount} </div>
  </div>
)

export default React.memo(AccountTransaction)
