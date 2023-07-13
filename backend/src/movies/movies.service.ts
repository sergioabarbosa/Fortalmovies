import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './entities/movie.entity';
import { Types } from 'mongoose';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel('Movie') private readonly movieModel: Model<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieModel.find().exec();
  }

  async likeMovie(movieId: string): Promise<Movie> {
    if (!Types.ObjectId.isValid(movieId)) {
      throw new Error('movieId inválido');
    }

    const movie = await this.movieModel.findById(movieId);
    if (!movie) {
      throw new Error('Filme não encontrado');
    }

    movie.likes += 1;
    return movie.save();
  }
}
