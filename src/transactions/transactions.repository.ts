import { EntityRepository, Repository } from 'typeorm'
import { Transaction } from './entities/transaction.entity'

@EntityRepository(Transaction)
export class TransactionsRepository extends Repository<Transaction> {}
