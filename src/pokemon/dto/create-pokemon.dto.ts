import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator"

export class CreatePokemonDto {
    
    @IsInt()
    @IsPositive()
    @Min(1)
    no:number

    @MinLength(2)
    @IsString()
    name:string
}
