import React, { useEffect, useState } from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button, Close, Field } from 'decentraland-ui'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { Props } from './SendManaModal.types'
import './SendManaModal.css'

const TransactionDetailModal: React.FC<Props> = ({
  name,
  onClose,
  isLoading,
  manaPrice,
  onManaPrice,
  onSendMana
}) => {
  const [isManaPrice, setIsManaPrice] = useState(true)
  const [amount, setAmount] = useState(0)
  const [to, setTo] = useState('')
  const [errors, setErrors] = useState({
    amount: { hasError: false, message: '' },
    to: { hasError: false, message: '' }
  })

  const handleChangeManaPrice = () => {
    setIsManaPrice(!isManaPrice)
  }

  const handleSetAmount = (e: React.FormEvent<HTMLInputElement>) => {
    const intValue = parseInt(e.currentTarget.value, 10)
    if (e.currentTarget.value.length === 0) {
      setAmount(0)
    } else if (!isNaN(intValue)) {
      setAmount(intValue)
    }
  }

  const handleSetTo = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    const isValid = /^[0-9a-fA-Fx]{0,42}$/.test(value)
    if (isValid) {
      setErrors({
        ...errors,
        to: { hasError: false, message: '' }
      })
      setTo(value)
    } else {
      setErrors({
        ...errors,
        to: {
          hasError: true,
          message: t('send_mana_modal.errors.invalid_char')
        }
      })
    }
  }

  const handleSendMana = () => {
    const isValidAddress = /^0x[0-9a-fA-Fx]{40}$/.test(to)
    if (isValidAddress) {
      if (isManaPrice) {
        onSendMana(to, amount)
      } else {
        onSendMana(to, amount / manaPrice)
      }
    } else {
      setErrors({
        ...errors,
        to: {
          hasError: true,
          message: t('send_mana_modal.errors.invalid_address')
        }
      })
    }
  }

  useEffect(() => {
    onManaPrice()
  })

  return (
    <Modal
      name={name}
      className="SendManaModal"
      closeIcon={<Close onClick={onClose} />}
    >
      <Modal.Header>
        <div className="title"> {t('send_mana_modal.send_tokens')} </div>
        <div className="subtitle"> {t('send_mana_modal.subtitle')} </div>
      </Modal.Header>
      <Modal.Content>
        <div className="button-group" style={{ display: 'none' }}>
          <Button
            inverted
            primary
            disabled={!isManaPrice}
            onClick={handleChangeManaPrice}
          >
            {t('send_mana_modal.mana')}
          </Button>
          <Button
            inverted
            primary
            disabled={isManaPrice}
            onClick={handleChangeManaPrice}
          >
            {t('send_mana_modal.usd')}
          </Button>
        </div>
        <div className="price" style={{ display: 'none' }}>
          {isManaPrice
            ? `${t('send_mana_modal.usd')} : ${(amount * manaPrice).toFixed(3)}`
            : `${t('send_mana_modal.mana')}: ${(amount / manaPrice).toFixed(
                3
              )}`}
        </div>
        <Field
          label={t('send_mana_modal.amount_label')}
          placeholder="0"
          value={amount}
          onChange={handleSetAmount}
          className="amount"
          message={errors.amount.message}
          error={errors.amount.hasError}
        />
        <Field
          label={t('send_mana_modal.wallet_label')}
          placeholder="0x0000...0000"
          value={to}
          onChange={handleSetTo}
          className="wallet"
          message={errors.to.message}
          error={errors.to.hasError}
        />
        <Button primary onClick={handleSendMana} loading={isLoading}>
          {t('send_mana_modal.send_tokens')}
        </Button>
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(TransactionDetailModal)
