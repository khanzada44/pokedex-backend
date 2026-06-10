const express = require("express");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");

const data = {
  trainers: [
    {
      id: 1,
      name: "Ash Ketchum",
      badge_count: 8,
      region: "Kanto",
      avatar_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/1.png",
      rank: "Champion",
    },
    {
      id: 2,
      name: "Misty Waterflower",
      badge_count: 5,
      region: "Kanto",
      avatar_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/2.png",
      rank: "Gym Leader",
    },
    {
      id: 3,
      name: "Brock Harrison",
      badge_count: 6,
      region: "Kanto",
      avatar_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/3.png",
      rank: "Gym Leader",
    },
  ],

  teams: [
    {
      id: 1,
      trainer_id: 1,
      name: "Kanto Starters",
      pokemon_ids: [25, 6, 9, 3, 131, 143],
      created_at: "2024-01-15T10:00:00Z",
    },
    {
      id: 2,
      trainer_id: 1,
      name: "Johto Squad",
      pokemon_ids: [157, 181, 214, 248, 197, 169],
      created_at: "2024-03-20T14:30:00Z",
    },
    {
      id: 3,
      trainer_id: 2,
      name: "Water Specialists",
      pokemon_ids: [121, 130, 134, 73, 91, 99],
      created_at: "2024-02-10T09:00:00Z",
    },
    {
      id: 4,
      trainer_id: 3,
      name: "Rock Solid",
      pokemon_ids: [76, 95, 142, 141, 139, 248],
      created_at: "2024-04-05T16:45:00Z",
    },
  ],

  battles: [
    {
      id: 1,
      trainer_id: 1,
      opponent_name: "Gary Oak",
      team_id: 1,
      result: "win",
      date: "2024-06-01",
      score_trainer: 3,
      score_opponent: 1,
    },
    {
      id: 2,
      trainer_id: 1,
      opponent_name: "Cynthia",
      team_id: 2,
      result: "loss",
      date: "2024-06-15",
      score_trainer: 1,
      score_opponent: 3,
    },
    {
      id: 3,
      trainer_id: 1,
      opponent_name: "Lance",
      team_id: 1,
      result: "win",
      date: "2024-07-01",
      score_trainer: 3,
      score_opponent: 2,
    },
    {
      id: 4,
      trainer_id: 2,
      opponent_name: "Lorelei",
      team_id: 3,
      result: "win",
      date: "2024-07-10",
      score_trainer: 3,
      score_opponent: 0,
    },
    {
      id: 5,
      trainer_id: 1,
      opponent_name: "Red",
      team_id: 2,
      result: "loss",
      date: "2024-08-01",
      score_trainer: 2,
      score_opponent: 3,
    },
    {
      id: 6,
      trainer_id: 3,
      opponent_name: "Giovanni",
      team_id: 4,
      result: "win",
      date: "2024-08-20",
      score_trainer: 3,
      score_opponent: 1,
    },
    {
      id: 7,
      trainer_id: 1,
      opponent_name: "Blue",
      team_id: 1,
      result: "win",
      date: "2024-09-05",
      score_trainer: 3,
      score_opponent: 2,
    },
    {
      id: 8,
      trainer_id: 2,
      opponent_name: "Wallace",
      team_id: 3,
      result: "loss",
      date: "2024-09-18",
      score_trainer: 1,
      score_opponent: 3,
    },
    {
      id: 9,
      trainer_id: 1,
      opponent_name: "Steven Stone",
      team_id: 2,
      result: "win",
      date: "2024-10-01",
      score_trainer: 3,
      score_opponent: 1,
    },
    {
      id: 10,
      trainer_id: 1,
      opponent_name: "Diantha",
      team_id: 1,
      result: "win",
      date: "2024-10-20",
      score_trainer: 3,
      score_opponent: 0,
    },
  ],

  battle_log: [
    {
      id: 1,
      battle_id: 1,
      timestamp: "2024-06-01T10:01:00Z",
      message: "Pikachu used Thunderbolt! It's super effective!",
      severity: "success",
    },
    {
      id: 2,
      battle_id: 1,
      timestamp: "2024-06-01T10:02:00Z",
      message: "Opponent's Blastoise fainted!",
      severity: "info",
    },
    {
      id: 3,
      battle_id: 2,
      timestamp: "2024-06-15T14:05:00Z",
      message: "Garchomp used Earthquake! Critical hit!",
      severity: "danger",
    },
    {
      id: 4,
      battle_id: 2,
      timestamp: "2024-06-15T14:06:00Z",
      message: "Typhlosion fainted!",
      severity: "danger",
    },
    {
      id: 5,
      battle_id: 3,
      timestamp: "2024-07-01T11:00:00Z",
      message: "Charizard used Flare Blitz!",
      severity: "success",
    },
  ],
};

const typeDefs = gql`
  type Trainer {
    id: ID!
    name: String
    badge_count: Int
    region: String
    avatar_url: String
    rank: String
  }

  type Team {
    id: ID!
    trainer_id: ID
    name: String
    pokemon_ids: [Int]
    created_at: String
  }

  type Battle {
    id: ID!
    trainer_id: ID
    opponent_name: String
    team_id: ID
    result: String
    date: String
    score_trainer: Int
    score_opponent: Int
  }

  type BattleLog {
    id: ID!
    battle_id: ID
    timestamp: String
    message: String
    severity: String
  }

  type Query {
    allTrainers: [Trainer]
    allTeams: [Team]
    allBattles: [Battle]
    allBattle_logs: [BattleLog]
  }

  type Mutation {
    createTeam(
      name: String!
      trainer_id: ID!
      pokemon_ids: [Int]!
      created_at: String!
    ): Team

    updateTeam(
      id: ID!
      pokemon_ids: [Int]!
    ): Team

    removeTeam(id: ID!): Team

    createBattle(
      trainer_id: ID!
      opponent_name: String!
      team_id: ID!
      result: String!
      date: String!
      score_trainer: Int!
      score_opponent: Int!
    ): Battle

    updateTrainer(
      id: ID!
      name: String
      region: String
      badge_count: Int
    ): Trainer
  }
`;

const resolvers = {
  Query: {
    allTrainers: () => data.trainers,
    allTeams: () => data.teams,
    allBattles: () => data.battles,
    allBattle_logs: () => data.battle_log,
  },
  Mutation: {
    createTeam: (_, args) => {
      const team = {
        id: String(Date.now()),
        name: args.name,
        trainer_id: String(args.trainer_id),
        pokemon_ids: args.pokemon_ids,
        created_at: args.created_at,
      };
      data.teams.push(team);
      return team;
    },

    updateTeam: (_, { id, pokemon_ids }) => {
      const team = data.teams.find(t => t.id === String(id));
      if (team) team.pokemon_ids = pokemon_ids;
      return team ?? null;
    },

    removeTeam: (_, { id }) => {
      const idx = data.teams.findIndex(t => t.id === String(id));
      if (idx !== -1) {
        const removed = data.teams[idx];
        data.teams.splice(idx, 1);
        return removed;
      }
      return null;
    },

    createBattle: (_, args) => {
      const battle = {
        id: String(Date.now()),
        trainer_id: String(args.trainer_id),
        opponent_name: args.opponent_name,
        team_id: String(args.team_id),
        result: args.result,
        date: args.date,
        score_trainer: args.score_trainer,
        score_opponent: args.score_opponent,
      };
      data.battles.push(battle);
      return battle;
    },

    updateTrainer: (_, { id, ...changes }) => {
      const trainer = data.trainers.find(t => t.id === String(id));
      if (trainer) Object.assign(trainer, changes);
      return trainer ?? null;
    },
  },
};

async function startServer() {
  const app = express();

  app.use(cors({ origin: "http://localhost:4200", credentials: true }));

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql", cors: false });

  app.get("/health", (_, res) => res.json({ status: "OK" }));

  app.listen(4000, () => {
    console.log("✅ Server running on http://localhost:4000/graphql");
  });
}

startServer();