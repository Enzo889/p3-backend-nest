import { Entity, PrimaryColumn } from 'typeorm';

@Entity('hour_seq', { schema: 'ies9021_coco' })
export class HourSeq {
  @PrimaryColumn('bigint', { name: 'next_val' })
  nextVal: string;
}
