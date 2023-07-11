import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Filme {
  title: string;
  poster_path: string;
  overview: string;
}

@Component({
  selector: 'app-lista-filmes',
  templateUrl: './lista-filmes.component.html',
  styleUrls: ['./lista-filmes.component.css']
})
export class ListaFilmesComponent implements OnInit {
  filmes: Filme[] = [];
  paginaAtual = 1;
  totalPaginas!: number; // Atribuição de valor padrão com "!"

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.carregarFilmes();
  }

  carregarFilmes() {
    this.http.get<any>('https://api.themoviedb.org/3/discover/movie', {
      params: {
        api_key: 'ac5afd43078071e91af4565d776850ed',
        region: 'BR',
        sort_by: 'popularity.desc',
        language: 'pt-BR',
        page: this.paginaAtual.toString()
      }
    }).subscribe(response => {
      this.filmes = response.results;
      this.totalPaginas = response.total_pages;
    });
  }

  proximaPagina() {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.carregarFilmes();
    }
  }

  paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.carregarFilmes();
    }
  }
}
