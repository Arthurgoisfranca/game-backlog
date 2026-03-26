import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  // Nosso "banco de dados" em memória
  private games: Game[] = [];
  private idCounter = 1;

  create(createGameDto: CreateGameDto) {
    const newGame: Game = {
      id: this.idCounter++,
      title: createGameDto.title,
      platform: createGameDto.platform,
      isCompleted: false, // Todo jogo novo começa como não finalizado
    };
    
    this.games.push(newGame);
    return newGame;
  }

  findAll() {
    return this.games;
  }

  findOne(id: number) {
    const game = this.games.find(g => g.id === id);
    if (!game) {
      throw new NotFoundException(`Jogo com ID ${id} não encontrado.`);
    }
    return game;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    const gameIndex = this.games.findIndex(g => g.id === id);
    
    if (gameIndex === -1) {
      throw new NotFoundException(`Jogo com ID ${id} não encontrado.`);
    }

    // Atualiza apenas os campos enviados
    this.games[gameIndex] = {
      ...this.games[gameIndex],
      ...updateGameDto,
    };

    return this.games[gameIndex];
  }

  remove(id: number) {
    const gameIndex = this.games.findIndex(g => g.id === id);
    if (gameIndex === -1) {
      throw new NotFoundException(`Jogo com ID ${id} não encontrado.`);
    }

    const removedGame = this.games[gameIndex];
    this.games.splice(gameIndex, 1);
    return removedGame;
  }
}