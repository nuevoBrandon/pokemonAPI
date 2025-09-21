import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { FindPokemonDto } from '../common/dto/find-pokemon.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) { }

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      const pokemon = createPokemonDto
      pokemon.name = createPokemonDto.name.toLocaleLowerCase()
      pokemon.no = createPokemonDto.no
      const result = await this.pokemonModel.create(pokemon)
      return result;
    } catch (error) {
      return this.HandleExceptionError(error)
    }
  }

  async findAll(
    param:FindPokemonDto
  ) {
    try {
      const {limit= 10,offset= 0} = param
      const result = await this.pokemonModel.find()
      .limit(limit)
      .skip(offset * limit)
      .sort({
        no:1
      })
      .select("-__v")
      return result
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
  }

  async findOne(id: string) {
    try {
      let result;


      if (!isNaN(+id)) {
        result = await this.pokemonModel.findOne({ no: id })
      }

      if (!result && isValidObjectId(id)) {
        result = await this.pokemonModel.findById(id)
      }

      if (!result) {
        result = await this.pokemonModel.findOne({ name: id.toLocaleLowerCase() })

      }

      if (!result) {
        throw new NotFoundException("No existe el pokemon " + id)
      }

      return result;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon = await this.findOne(id)
      if (updatePokemonDto.name) {
        updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase()
      }

      await pokemon.updateOne(updatePokemonDto, { new: true })
      return { ...pokemon.toJSON(), ...updatePokemonDto };

    } catch (error) {
      return this.HandleExceptionError(error)
    }
  }

  async remove(id: string) {
    try {

      const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id })
      if (deletedCount === 0) {
        throw new BadRequestException("El pokemon no existe en la db " + JSON.stringify(id))
      }

    } catch (error) {
      return this.HandleExceptionError(error)
    }

  }

  private HandleExceptionError(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException("El pokemon existe en la db " + JSON.stringify(error.keyValue))
    }
    console.log(error.message)
    throw new InternalServerErrorException("error: " + error.message)
  }
}
