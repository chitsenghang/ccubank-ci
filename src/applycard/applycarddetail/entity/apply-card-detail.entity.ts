import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApplyCard } from '../../entity/apply-card.entity';

@Entity()
export class ApplyCardDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cardId: number;

  @ManyToOne(() => ApplyCard)
  applyCard: ApplyCard;
}
