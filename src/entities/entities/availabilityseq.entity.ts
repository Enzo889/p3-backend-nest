import { Entity, PrimaryColumn } from 'typeorm';

@Entity('availability_seq', { schema: 'ies9021_coco' })
export class AvailabilitySeq {
  @PrimaryColumn('bigint', { name: 'next_val' })
  nextVal: string;
}
