import { t, s, c } from "@res";
import { useContext } from "react";
import { GameContext } from "@contexts/GameContext";

function genFragments(type, num = 1) {
  return Array.from({ length: num }, (_, index) => genFragment(type));
}

function genFragmentsComplete() {
  const { ALL, ...allTypes } = c.fragment.type;
  return Object.values(allTypes).map((type) => genFragment(type));
}

function genFragment(type) {
  const { ALL, ...allTypes } = c.fragment.type;
  const newFragmentId = crypto.randomUUID();
  const newFragmentType =
    type || allTypes[Object.keys(allTypes)[Math.floor(Math.random() * Object.keys(c.fragment.type).length)]];
  const newFragmentStar = Math.floor(1 + Math.random() * 3);

  return {
    id: `${newFragmentType}_${newFragmentId}`,
    title: `${c.fragment.info[newFragmentType].name}_${newFragmentId.slice(0, 5)}`,
    type: newFragmentType,
    desc: `${c.fragment.info[newFragmentType].name}とは、「${c.fragment.info[newFragmentType].desc}」です`,
    star: newFragmentStar,
  };
}

function genMessages(type, inputs) {
  switch (type) {
    case c.message.type.TALK: {
      return [
        {
          id: crypto.randomUUID(),
          role: c.message.role.SYSTEM,
          content: `${inputs[0]}「${inputs[1]}」`,
        },
      ];
    }
    case c.message.type.USER_ACTION: {
      return [
        {
          id: crypto.randomUUID(),
          role: c.message.role.USER,
          content: `${inputs[0]}`,
        },
      ];
    }
    case c.message.type.FREE_ACTION: {
      return [
        {
          id: crypto.randomUUID(),
          role: c.message.role.SYSTEM,
          content: `${inputs[0]}`,
        },
      ];
    }
    case c.message.type.GET_FRAGMENTS: {
      return Array.from({ length: inputs.length }, (_, index) => {
        return {
          id: crypto.randomUUID(),
          role: c.message.role.SYSTEM,
          content: `新しいフラグメント「${inputs[index]}」を手に入れた`,
        };
      });
    }
    case c.message.type.ENCHANT_MERGE: {
      return [
        {
          id: crypto.randomUUID(),
          role: c.message.role.SYSTEM,
          content: `「${inputs[0]}」「${inputs[1]}」「${inputs[2]}」「${inputs[3]}」を合成した`,
        },
        {
          id: crypto.randomUUID(),
          role: c.message.role.SYSTEM,
          content: `新しいフラグメント「${inputs[4]}」を手に入れた`,
        },
      ];
    }
    case c.action.type.ENCHANT_SCAMPER.S:
    case c.action.type.ENCHANT_SCAMPER.C:
    case c.action.type.ENCHANT_SCAMPER.A:
    case c.action.type.ENCHANT_SCAMPER.M:
    case c.action.type.ENCHANT_SCAMPER.P:
    case c.action.type.ENCHANT_SCAMPER.E:
    case c.action.type.ENCHANT_SCAMPER.R:
      return [
        {
          id: crypto.randomUUID(),
          role: c.message.role.SYSTEM,
          content: `「${inputs[0]}」を変換した`,
        },
        {
          id: crypto.randomUUID(),
          role: c.message.role.SYSTEM,
          content: `新しいフラグメント「${inputs[1]}」を手に入れた`,
        },
      ];
    default: {
      return [
        {
          id: crypto.randomUUID(),
          role: c.message.role.SYSTEM,
          content: `DEFAULT`,
        },
      ];
    }
  }
}

export default function (action) {
  console.log(`api_debug: ${action.type}`);
  console.log(action.value);
  const state = action.state; //

  switch (action.type) {
    case c.action.type.INIT_GAME: {
      return {
        status: c.status.SUCCESS,
        data: {
          gameId: crypto.randomUUID(),
          player: { name: "てすと" },
          fragments: c.testData,
          messages: [],
          progress: "Discover",
          stage: {
            place: "宿屋",
            day: 1,
            hour: 8,
          },
          messageWindow: [],
          result_merge: null,
          result_scamper: null,
        },
      };
    }
    case c.action.type.DEBUG_COMPLETE_FRAGMENTS: {
      const newFragments = genFragmentsComplete();
      const newMessages = [
        ...genMessages(c.message.type.USER_ACTION, [action.value]),
        ...genMessages(c.message.type.FREE_ACTION, [`周辺を探索した。`]),
        ...genMessages(c.message.type.TALK, [`頼もしい人`, `今だけお試しでフラグメントのセットをプレゼント！`]),
        ...genMessages(
          c.message.type.GET_FRAGMENTS,
          newFragments.map((fragment) => fragment.title)
        ),
      ];
      return {
        status: c.status.SUCCESS,
        data: {
          fragments: [...state.fragments, ...newFragments],
          messages: [...state.messages, ...newMessages],
          messageWindow: newMessages,
        },
      };
    }
    case c.action.type.DEBUG_RANDOM_FRAGMENTS: {
      const newFragments = genFragments(null, Math.floor(Math.random() * 3) + 1);
      const newMessages = [
        ...genMessages(c.message.type.USER_ACTION, [action.value]),
        ...genMessages(c.message.type.FREE_ACTION, [`周辺を探索した。`]),
        ...genMessages(c.message.type.TALK, [`優しい人`, `これ、あげます。大事に使ってくださいね。`]),
        ...genMessages(
          c.message.type.GET_FRAGMENTS,
          newFragments.map((fragment) => fragment.title)
        ),
      ];
      return {
        status: c.status.SUCCESS,
        data: {
          fragments: [...state.fragments, ...newFragments],
          messages: [...state.messages, ...newMessages],
          messageWindow: newMessages,
        },
      };
    }
    case c.action.type.DEBUG_RANDOM_FRAGMENTS: {
      const newFragments = genFragments(null, Math.floor(Math.random() * 3) + 1);
      const newMessages = [
        ...genMessages(c.message.type.USER_ACTION, [action.value]),
        ...genMessages(c.message.type.FREE_ACTION, [`周辺を探索した。`]),
        ...genMessages(c.message.type.TALK, [`優しい人`, `これ、あげます。大事に使ってくださいね。`]),
        ...genMessages(
          c.message.type.GET_FRAGMENTS,
          newFragments.map((fragment) => fragment.title)
        ),
      ];
      return {
        status: c.status.SUCCESS,
        data: {
          fragments: [...state.fragments, ...newFragments],
          messages: [...state.messages, ...newMessages],
          messageWindow: newMessages,
        },
      };
    }
    case c.action.type.ENCHANT_MERGE: {
      const newFragments = genFragments(c.fragment.type.CHALLENGE, 1);
      const newMessages = genMessages(action.type, [
        ...Object.values(action.value).map((slotItem) => slotItem.fragment.title),
        ...newFragments.map((fragment) => fragment.title),
      ]);
      return {
        status: c.status.SUCCESS,
        data: {
          fragments: [...state.fragments, ...newFragments],
          messages: [...state.messages, ...newMessages],
          messageWindow: newMessages,
          result_merge: newFragments[0],
        },
      };
    }
    case c.action.type.ENCHANT_SCAMPER.S:
    case c.action.type.ENCHANT_SCAMPER.C:
    case c.action.type.ENCHANT_SCAMPER.A:
    case c.action.type.ENCHANT_SCAMPER.M:
    case c.action.type.ENCHANT_SCAMPER.P:
    case c.action.type.ENCHANT_SCAMPER.E:
    case c.action.type.ENCHANT_SCAMPER.R: {
      const newFragments = genFragments(null, 1);
      const newMessages = genMessages(action.type, [
        ...Object.values(action.value).map((slotItem) => slotItem.fragment.title),
        ...newFragments.map((fragment) => fragment.title),
      ]);
      return {
        status: c.status.SUCCESS,
        data: {
          fragments: [...state.fragments, ...newFragments],
          messages: [...state.messages, ...newMessages],
          messageWindow: newMessages,
          result_scamper: newFragments[0],
        },
      };
    }
    default:
      return { status: c.status.FAILED, reason: "invalid action", data: null };
  }
}
