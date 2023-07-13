import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface Filme {
  title: string;
  id: number;
  poster_path: string;
  overview: string;
  trailer_id: string;
  curtirFilme: boolean;
}

@Component({
  selector: 'app-lista-filmes',
  templateUrl: './lista-filmes.component.html',
  styleUrls: ['./lista-filmes.component.css']
})
export class ListaFilmesComponent implements OnInit {
  filmes: Filme[] = [];
  paginaAtual = 1;
  totalPaginas!: number;

  constructor(private http: HttpClient, private router: Router) { }

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

  curtirFilme(filme: Filme) {
    const index = this.filmes.findIndex(f => f.id === filme.id);
    this.filmes[index].curtirFilme = true;
    console.log('Id do filme:', filme.id)
    console.log('Filme curtido:', filme);

    // Obtenha o token JWT do armazenamento local (por exemplo, LocalStorage ou sessionStorage)
    const token = localStorage.getItem('jwt'); // Substitua pelo método correto para obter o token
    console.log('Token JWT:', token);

    // Verifique se o token JWT está disponível
    if (token) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

      // Salvando no backend
      const filmeId = filme.id;
      this.http.post<any>('http://localhost:3000/movies/' + filmeId + '/like', {}, { headers }).subscribe(
        response => {
          console.log('Filme curtido com sucesso!');
        },
        error => {
          console.error('Erro ao curtir o filme:', error);
        }
      );
    } else {
      console.error('Token JWT não encontrado. Usuário não autenticado.');
      alert('Você precisa estar autenticado para curtir um filme.');
    }
  }
}
