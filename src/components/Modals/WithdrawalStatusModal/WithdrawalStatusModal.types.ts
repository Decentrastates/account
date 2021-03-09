import { Dispatch } from 'redux'
import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'
import { Withdrawal } from '../../../modules/mana/types'
import { finishWithdrawalRequest } from '../../../modules/mana/actions'

export type Props = ModalProps & {
  isLoading: boolean
  withdrawals: Withdrawal[]
  onFinishWithdrawal: typeof finishWithdrawalRequest
}

export type State = {}

export type MapState = Props
export type MapDispatch = Dispatch
export type MapDispatchProps = Pick<Props, 'onFinishWithdrawal'>
