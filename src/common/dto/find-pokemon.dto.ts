import { IsInt, IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from "class-validator"

export class FindPokemonDto {

    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Min(1)
    limit?: number

    @IsOptional()
    @IsNumber()
    @IsPositive()
    offset?: number
}