import { Controller, Post, Param, UseGuards, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';
// import { JwtAuthGuard } from './jwt-auth.guard';
import { Movie } from './entities/movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Post(':id/like')
  // @UseGuards(JwtAuthGuard)
  async likeMovie(@Param('id') movieId: string): Promise<Movie> {
    return this.moviesService.likeMovie(movieId);
  }
}
