import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'O título é obrigatório.' })
  @IsString({ message: 'O título deve ser uma string.' })
  title: string;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string.' })
  description: string;

  @IsOptional()
  @IsBoolean({ message: 'O status de conclusão deve ser um valor booleano.' })
  completed: boolean;
}