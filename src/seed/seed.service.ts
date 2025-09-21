import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { IPoekemon, IResult } from './interfaces/index.interfaces';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly pokemonService: PokemonService,
    private readonly http: AxiosAdapter
  ) { }



  async execute(size: string) {
    try {
      await this.pokemonModel.deleteMany()
      const url = "https://pokeapi.co/api/v2/pokemon?limit=" + size
      const data = await this.http.get<IPoekemon>(url)
      const pokemonInsert: { name: string, no: number }[] = []
      data.results.map((item: IResult) => {
        const separate = item.url.split("/")
        const no: number = +separate[separate.length - 2]
        pokemonInsert.push({ name: item.name, no })

      })
      await this.pokemonModel.insertMany(pokemonInsert)
      return "seed execute success";
    } catch (error) {
      throw new InternalServerErrorException("error: " + error.message)
    }
  }


}
