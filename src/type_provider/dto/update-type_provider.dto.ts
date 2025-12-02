import { PartialType } from '@nestjs/swagger';
import { CreateTypeProviderDto } from './create-type_provider.dto';

export class UpdateTypeProviderDto extends PartialType(CreateTypeProviderDto) {}
