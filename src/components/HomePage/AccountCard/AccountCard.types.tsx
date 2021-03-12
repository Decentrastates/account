import { Network } from '@dcl/schemas'
import { Dispatch } from 'redux'
import { Transaction } from '../../../modules/mana/types'
import { OpenModalAction } from '../../../modules/modal/actions'

export type Props = {
  network: Network
  title: string
  amount: number
  transactions: Transaction[]
  onSeeAll: (transactions: Transaction[]) => void
}

export type MapStateProps = Pick<Props, 'amount'>
export type MapDispatchProps = Pick<Props, 'onSeeAll'>
export type MapDispatch = Dispatch<OpenModalAction>
export type OwnProps = Pick<Props, 'network'>
