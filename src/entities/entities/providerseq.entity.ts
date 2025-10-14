import { Entity, PrimaryColumn } from 'typeorm';

@Entity('provider_seq', { schema: 'ies9021_coco' })
export class ProviderSeq {
  @PrimaryColumn('bigint', { name: 'next_val' })
  nextVal: string;
}
