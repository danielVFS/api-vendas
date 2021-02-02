import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import Costumer from '@modules/costumers/typeorm/entities/Costumer';
import OrdersProducts from '@modules/orders/typeorm/entities/OrdersProducts';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Costumer)
  @JoinColumn({ name: 'costumer_id' })
  costumer: Costumer;

  @OneToMany(() => OrdersProducts, order_products => order_products.order, {
    cascade: true,
  })
  order_products: OrdersProducts[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export default Order;
