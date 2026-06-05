// Banco de perguntas (curado em PT) e montagem do quiz — lógica pura.
//
// Convenção: em cada pergunta, options[0] é SEMPRE a resposta correta.
// O embaralhamento acontece só na hora de montar a partida.

export interface Category {
  id: string;
  label: string;
  emoji: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  { id: "geral", label: "Conhecimentos Gerais", emoji: "🧠", color: "#6366f1" },
  { id: "ciencia", label: "Ciência", emoji: "🔬", color: "#10b981" },
  { id: "historia", label: "História", emoji: "🏛️", color: "#f59e0b" },
  { id: "geografia", label: "Geografia", emoji: "🌎", color: "#0ea5e9" },
  { id: "esportes", label: "Esportes", emoji: "⚽", color: "#ef4444" },
  { id: "entretenimento", label: "Entretenimento", emoji: "🎬", color: "#ec4899" },
];

export function categoryOf(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

interface RawQuestion {
  category: string;
  q: string;
  /** A primeira opção é a correta. */
  options: [string, string, string, string];
}

const BANK: RawQuestion[] = [
  // --- Conhecimentos Gerais ---
  { category: "geral", q: "Qual é o maior planeta do Sistema Solar?", options: ["Júpiter", "Saturno", "Netuno", "Terra"] },
  { category: "geral", q: "Qual metal é líquido à temperatura ambiente?", options: ["Mercúrio", "Ferro", "Ouro", "Chumbo"] },
  { category: "geral", q: "Qual é o oceano mais extenso do planeta?", options: ["Pacífico", "Atlântico", "Índico", "Ártico"] },
  { category: "geral", q: "Quantos minutos tem um dia?", options: ["1440", "1200", "1000", "1600"] },
  { category: "geral", q: "Qual idioma tem mais falantes nativos no mundo?", options: ["Mandarim", "Inglês", "Espanhol", "Hindi"] },
  { category: "geral", q: "Qual gás as plantas absorvem na fotossíntese?", options: ["Gás carbônico", "Oxigênio", "Nitrogênio", "Hidrogênio"] },
  { category: "geral", q: "Quantos lados tem um hexágono?", options: ["6", "5", "7", "8"] },
  { category: "geral", q: "Qual é a moeda oficial do Japão?", options: ["Iene", "Yuan", "Won", "Baht"] },

  // --- Ciência ---
  { category: "ciencia", q: "Qual é o símbolo químico do ouro?", options: ["Au", "Ag", "Gd", "Or"] },
  { category: "ciencia", q: "Quantos ossos tem o corpo humano adulto?", options: ["206", "201", "212", "198"] },
  { category: "ciencia", q: "Qual órgão bombeia o sangue pelo corpo?", options: ["Coração", "Pulmão", "Fígado", "Rim"] },
  { category: "ciencia", q: "Qual é o maior órgão do corpo humano?", options: ["Pele", "Fígado", "Intestino", "Cérebro"] },
  { category: "ciencia", q: "Qual partícula do átomo tem carga negativa?", options: ["Elétron", "Próton", "Nêutron", "Fóton"] },
  { category: "ciencia", q: "Qual cientista propôs a teoria da relatividade?", options: ["Einstein", "Newton", "Galileu", "Darwin"] },
  { category: "ciencia", q: "Qual planeta é conhecido como 'planeta vermelho'?", options: ["Marte", "Vênus", "Júpiter", "Mercúrio"] },
  { category: "ciencia", q: "Qual é, aproximadamente, a velocidade da luz no vácuo?", options: ["300.000 km/s", "150.000 km/s", "30.000 km/s", "1.000 km/s"] },

  // --- História ---
  { category: "historia", q: "Em que ano os portugueses chegaram ao Brasil?", options: ["1500", "1492", "1498", "1502"] },
  { category: "historia", q: "Quem foi o primeiro presidente do Brasil?", options: ["Deodoro da Fonseca", "Getúlio Vargas", "Prudente de Morais", "Floriano Peixoto"] },
  { category: "historia", q: "Em que ano caiu o Muro de Berlim?", options: ["1989", "1991", "1985", "1979"] },
  { category: "historia", q: "Quem proclamou a Independência do Brasil?", options: ["Dom Pedro I", "Dom João VI", "Tiradentes", "Dom Pedro II"] },
  { category: "historia", q: "Em que ano terminou a Segunda Guerra Mundial?", options: ["1945", "1939", "1918", "1950"] },
  { category: "historia", q: "Qual civilização construiu as pirâmides de Gizé?", options: ["Egípcios", "Maias", "Astecas", "Romanos"] },
  { category: "historia", q: "Em que século ocorreu a Revolução Francesa?", options: ["Século XVIII", "Século XVII", "Século XIX", "Século XVI"] },
  { category: "historia", q: "Qual país lançou o primeiro satélite artificial, o Sputnik?", options: ["União Soviética", "Estados Unidos", "China", "Alemanha"] },

  // --- Geografia ---
  { category: "geografia", q: "Qual é a capital da Austrália?", options: ["Camberra", "Sydney", "Melbourne", "Perth"] },
  { category: "geografia", q: "Qual é o maior rio do mundo em volume de água?", options: ["Amazonas", "Nilo", "Yangtzé", "Mississippi"] },
  { category: "geografia", q: "Qual é o menor país do mundo em área?", options: ["Vaticano", "Mônaco", "Nauru", "San Marino"] },
  { category: "geografia", q: "Qual é a capital do Canadá?", options: ["Ottawa", "Toronto", "Vancouver", "Montreal"] },
  { category: "geografia", q: "Qual é o maior deserto quente do mundo?", options: ["Saara", "Gobi", "Atacama", "Kalahari"] },
  { category: "geografia", q: "Em que continente fica o Egito?", options: ["África", "Ásia", "Europa", "Oceania"] },
  { category: "geografia", q: "Quantos estados o Brasil possui (sem contar o Distrito Federal)?", options: ["26", "27", "25", "24"] },
  { category: "geografia", q: "Qual cordilheira é a mais extensa do mundo?", options: ["Andes", "Himalaia", "Alpes", "Rochosas"] },

  // --- Esportes ---
  { category: "esportes", q: "Quantos jogadores um time de futebol tem em campo?", options: ["11", "10", "9", "12"] },
  { category: "esportes", q: "De quantos em quantos anos ocorrem os Jogos Olímpicos de verão?", options: ["4", "2", "3", "5"] },
  { category: "esportes", q: "Qual país mais venceu Copas do Mundo de futebol?", options: ["Brasil", "Alemanha", "Itália", "Argentina"] },
  { category: "esportes", q: "Quantos pontos vale uma cesta de longa distância (de 3) no basquete?", options: ["3", "2", "1", "4"] },
  { category: "esportes", q: "Quantos jogadores cada equipe tem em quadra no vôlei?", options: ["6", "5", "7", "11"] },
  { category: "esportes", q: "Quantos buracos tem um campo oficial de golfe?", options: ["18", "9", "12", "24"] },
  { category: "esportes", q: "Em que país surgiram os Jogos Olímpicos?", options: ["Grécia", "Itália", "Egito", "França"] },
  { category: "esportes", q: "Em qual esporte se usa a 'cesta'?", options: ["Basquete", "Vôlei", "Tênis", "Handebol"] },

  // --- Entretenimento ---
  { category: "entretenimento", q: "Quem dirigiu o filme 'Titanic' (1997)?", options: ["James Cameron", "Steven Spielberg", "Christopher Nolan", "Ridley Scott"] },
  { category: "entretenimento", q: "Qual banda lançou o álbum 'Abbey Road'?", options: ["The Beatles", "Rolling Stones", "Queen", "Pink Floyd"] },
  { category: "entretenimento", q: "Quem escreveu 'Dom Casmurro'?", options: ["Machado de Assis", "José de Alencar", "Jorge Amado", "Clarice Lispector"] },
  { category: "entretenimento", q: "Quantas cordas tem um violão tradicional?", options: ["6", "4", "5", "7"] },
  { category: "entretenimento", q: "Em qual cidade se passa a série 'Friends'?", options: ["Nova York", "Los Angeles", "Chicago", "Boston"] },
  { category: "entretenimento", q: "Quem pintou a 'Mona Lisa'?", options: ["Leonardo da Vinci", "Michelangelo", "Van Gogh", "Picasso"] },
  { category: "entretenimento", q: "Qual instrumento tem teclas pretas e brancas?", options: ["Piano", "Violino", "Flauta", "Bateria"] },
  { category: "entretenimento", q: "Qual é o sobrenome do bruxo protagonista dos livros de J.K. Rowling?", options: ["Potter", "Weasley", "Granger", "Malfoy"] },
];

export interface QuizQuestion {
  category: string;
  q: string;
  options: string[];
  /** Índice da resposta correta DEPOIS de embaralhar. */
  correctIndex: number;
}

/** Embaralha um array (Fisher–Yates). */
function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Monta uma partida: filtra pela categoria (ou "todas"), embaralha as
 * perguntas e as alternativas, e devolve `count` perguntas prontas.
 */
export function buildQuiz(categoryId: string, count: number): QuizQuestion[] {
  const pool = categoryId === "todas" ? BANK : BANK.filter((q) => q.category === categoryId);

  return shuffle(pool)
    .slice(0, count)
    .map((raw) => {
      const correct = raw.options[0];
      const options = shuffle(raw.options);
      return {
        category: raw.category,
        q: raw.q,
        options,
        correctIndex: options.indexOf(correct),
      };
    });
}

/** Quantas perguntas existem numa categoria (ou no total). */
export function availableCount(categoryId: string): number {
  return categoryId === "todas" ? BANK.length : BANK.filter((q) => q.category === categoryId).length;
}

/** Mensagem de acordo com o aproveitamento (0–1). */
export function scoreMessage(ratio: number): string {
  if (ratio === 1) return "Perfeito! Gabaritou! 🏆";
  if (ratio >= 0.7) return "Muito bem! Mandou bem demais. 🎉";
  if (ratio >= 0.4) return "Nada mal! Dá pra melhorar. 💪";
  return "Bora estudar e tentar de novo! 📚";
}
