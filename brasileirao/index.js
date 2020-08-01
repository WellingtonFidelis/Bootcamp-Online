import { time } from 'console';
import { promises as fs } from 'fs';

const times = [];

async function init() {
  try {
    const response = await fs.readFile('2003.json');
    const data = JSON.parse(response);
    // console.log(data);

    // inicializando o array de times
    data[0].partidas.forEach((partida) => {
      times.push({ time: partida.mandante, pontuacao: 0 });
      times.push({ time: partida.visitante, pontuacao: 0 });
    });

    //console.log(times);

    // preenchendo a pontuação dos time no array
    data.forEach((rodada) => {
      rodada.partidas.forEach((partida) => {
        const timeMandante = times.find(
          (item) => item.time === partida.mandante
        );
        const timeVisitante = times.find(
          (item) => item.time === partida.visitante
        );

        if (partida.placar_mandante > partida.placar_visitante) {
          // mandante
          // timeMandante.pontuacao = timeMandante.pontuacao + 3;
          timeMandante.pontuacao += 3;
        } else if (partida.placar_visitante > partida.placar_mandante) {
          // visitante
          timeVisitante.pontuacao += 3;
        } else {
          // empate
          timeMandante.pontuacao += 1;
          timeVisitante.pontuacao += 1;
        }
      });
    });

    /*
    times.sort((a, b) => {
      if (a.pontuacao < b.pontuacao) {
        return 1;
      }
      if (a.pontuacao > b.pontuacao) {
        return -1;
      }
      return 0;
    });
    */

    times.sort((a, b) => {
      return b.pontuacao - a.pontuacao;
    });

    //console.log(times);

    await salvaTimes();

    let timeMaiorNome = '';
    let timeMenorNome = times[0].time;

    times.forEach((item) => {
      // know the bigger name
      if (item.time.length > timeMaiorNome.length) {
        timeMaiorNome = item.time;
      }
      // know the less name
      if (item.time.length < timeMenorNome.length) {
        timeMenorNome = item.time;
      }
    });

    console.log(timeMaiorNome);
    console.log(timeMenorNome);
  } catch (err) {
    console.log(err);
  }
}

async function salvaTimes() {
  await fs.writeFile('times.json', JSON.stringify(times, null, 2));
}

init();
