import { MonsterService } from "../src/domain/services/monster";
import { MonsterRepository } from "../src/domain/repositories/monster";
import { expect } from "chai";
import { MonsterData } from "../src/domain/dtos/monster";

describe("Monster Service", () => {
  describe("Create Monster", () => {
    it("It Should Be Success", async () => {
      class MockRepository extends MonsterRepository {
        async create(input) {
          return true;
        }
      }
      const monsterRepository = new MockRepository();
      const monsterService = new MonsterService(monsterRepository);
      const data: MonsterData = {
        name: "pikachu",
        category: "pokemon listrik",
        description: "pokemonnya listrik",
        imageUrl: "http://localhost:4000/weoijkwennlm.png",
        stats: {
          hp: 100,
          attack: 200,
          def: 250,
          speed: 300,
        },
        isCatched: false,
        types: [],
      };
      const result = await monsterService.create(data);
      expect(result.error).to.be.false;
      expect(result.data).to.equal("SUCCESS");
    });

    it("Validation Field Name Empty", async () => {
      class MockRepository extends MonsterRepository {
        async create(input) {
          return true;
        }
      }
      const monsterRepository = new MockRepository();
      const monsterService = new MonsterService(monsterRepository);
      const data = {
        name:null,
        category: "pokemon listrik",
        description: "pokemonnya listrik",
        imageUrl: "http://localhost:4000/weoijkwennlm.png",
        stats: {
          hp: 100,
          attack: 200,
          def: 250,
          speed: 300,
        },
        isCatched: false,
        types: [],
      };
      const result = await monsterService.create(data);
      expect(result.error).to.be.true;
      expect(result.message).to.equal("name is a required field");
    });

    it("Validation Field Category Empty", async () => {
      class MockRepository extends MonsterRepository {
        async create(input) {
          return true;
        }
      }
      const monsterRepository = new MockRepository();
      const monsterService = new MonsterService(monsterRepository);
      const data = {
        name:"Pikachu",
        category: null,
        description: "pokemonnya listrik",
        imageUrl: "http://localhost:4000/weoijkwennlm.png",
        stats: {
          hp: 100,
          attack: 200,
          def: 250,
          speed: 300,
        },
        isCatched: false,
        types: [],
      };
      const result = await monsterService.create(data);
      expect(result.error).to.be.true;
      expect(result.message).to.equal("category is a required field");
    });

    it("Validation Field Stats Empty", async () => {
      class MockRepository extends MonsterRepository {
        async create(input) {
          return true;
        }
      }
      const monsterRepository = new MockRepository();
      const monsterService = new MonsterService(monsterRepository);
      const data = {
        name:"Pikachu",
        category: "pokemon listrik",
        description: "",
        imageUrl: "http://localhost:4000/weoijkwennlm.png",
        stats: null,
        isCatched: false,
        types: [],
      };
      const result = await monsterService.create(data);
      expect(result.error).to.be.true;
      expect(result.message).to.equal("stats cannot be null");
    });
    it("Validation Field Type Null", async () => {
      class MockRepository extends MonsterRepository {
        async create(input) {
          return true;
        }
      }
      const monsterRepository = new MockRepository();
      const monsterService = new MonsterService(monsterRepository);
      const data = {
        name:"Pikachu",
        category: "pokemon listrik",
        description: "",
        imageUrl: "http://localhost:4000/weoijkwennlm.png",
        stats: {
          hp: 100,
          attack: 200,
          def: 250,
          speed: 300,
        },
        isCatched: false,
        types: null,
      };
      const result = await monsterService.create(data);
      expect(result.error).to.be.true;
      expect(result.message).to.equal("Pick at least 1 Type");
    });
  });
});
