import { Timestamp } from "firebase/firestore";

export default {
  hashtag_regex: /(#\S+?)(?=#|\s|$)/g,
  thumb_def_size: 640,
  thumb_def_type: "image/jpeg",
  thumb_def_quality: 0.8,
  concepts: [
    {
      id: 0,
      type: "domain",
      name: "睡眠と目覚め",
      desc: "個人の睡眠習慣と快適な目覚めを支援する領域",
    },
    {
      id: 1,
      type: "needs",
      name: "早起きするのが辛い",
      desc: "目覚めが悪く、日中の活動に支障をきたす",
    },
    {
      id: 2,
      type: "needs",
      name: "二度寝をしてしまう",
      desc: "アラームを止めても再度寝てしまい、遅刻につながる",
    },
    {
      id: 3,
      type: "persona",
      name: "多忙なビジネスパーソン",
      desc: "日中は仕事で忙しく、朝の時間を有効活用したいと考えているが、目覚めが悪く困っている",
    },
    {
      id: 4,
      type: "context",
      name: "平日の朝",
      desc: "出勤前で、限られた時間で準備をしなければならない状況",
    },
    {
      id: 5,
      type: "context",
      name: "寝室",
      desc: "スマートフォンが手元にある環境で、快適な目覚めを求めている",
    },
    {
      id: 6,
      type: "seeds",
      name: "スマホアプリ開発",
      desc: "スマートフォンを活用したソフトウェアの開発技術",
    },
    {
      id: 7,
      type: "seeds",
      name: "生体センサー技術",
      desc: "心拍数や動きなどの生体情報を取得する技術",
    },
    {
      id: 8,
      type: "idea",
      name: "スマート睡眠サイクル目覚ましアプリ",
      desc: "ユーザーの睡眠サイクルを検知し、最適なタイミングでアラームを鳴らすスマートフォンアプリ",
    },
    {
      id: 9,
      type: "use_case",
      name: "快適な目覚めを体験する",
      desc: "ユーザーが設定した起床時間範囲内で、眠りの浅いレム睡眠時にアラームが鳴り、快適に目覚める",
    },
    {
      id: 10,
      type: "use_case",
      name: "睡眠状態を可視化する",
      desc: "アプリが記録した睡眠データをグラフで確認し、自身の睡眠の質を把握する",
    },
    {
      id: 11,
      type: "scenario",
      name: "朝の快適な目覚め",
      desc: "ユーザーは就寝前にアプリでアラームを設定する。アプリは睡眠サイクルをモニターし、設定時間の20分前から最も目覚めやすいタイミングで穏やかなアラームを鳴らす。ユーザーは自然に目を覚まし、スッキリとした気分で一日を始めることができる。",
    },
    {
      id: 12,
      type: "function",
      name: "睡眠サイクル検知機能",
      desc: "スマートフォンの加速度センサーなどを利用してユーザーの体動を検出し、睡眠段階を推定する",
    },
    {
      id: 13,
      type: "function",
      name: "スマートアラーム機能",
      desc: "眠りの浅い段階で段階的に音量を上げる、または光を点灯させるなど、穏やかな方法でユーザーを目覚めさせる",
    },
    {
      id: 14,
      type: "function",
      name: "睡眠データ記録・表示機能",
      desc: "毎日の睡眠時間、睡眠サイクル、目覚めの質などを記録し、グラフや統計で表示する",
    },
    {
      id: 15,
      type: "product",
      name: "スッキリめざまし",
      desc: "快適な目覚めと質の高い睡眠体験を提供するスマートフォンアプリ",
    },
    {
      id: 16,
      type: "customer_journey",
      name: "スッキリめざまし導入と定着の旅",
      desc: "ユーザーが朝の目覚めに関する課題を感じ、アプリストアで「目覚まし」と検索。スッキリめざましを発見し、評価を確認後ダウンロード。初日は効果を半信半疑で使うが、翌朝の快適な目覚めに感動。その後、毎日利用する中で睡眠データを確認し、自身の睡眠習慣を改善していく。",
    },
  ],
  type_desc: {
    domain: "プロダクトが存在する特定の知識分野や活動領域。",
    needs: "ユーザーが抱える課題や満たされていない欲求。",
    persona: "ターゲット顧客層を具体化した仮想ユーザー像。",
    context: "ユーザーがプロダクトを利用する際の具体的な状況や背景。",
    seeds: "企業が持つ独自の技術、ノウハウ、リソースなど。",
    idea: "ニーズとシーズ、ペルソナ、コンテキストが結合して生まれる解決策の着想。",
    use_case: "プロダクトを通じてユーザーが達成したい具体的な目的や機能。",
    scenario: "特定のユースケースが、特定の状況下で時系列にどのように進行するかを記述したもの。",
    function: "プロダクトが提供する具体的な能力や動作。",
    product: "ニーズを解決し、ユースケースやシナリオを実現するための具体的な成果物。",
    customer_journey: "顧客がプロダクトやサービスと接するライフサイクル全体をマッピングしたもの。",
  },
  testData: [
    {
      id: "needs_0",
      title: "畑を守りたい",
      type: "needs",
      desc: "スライムの被害から農作物を守り、安定した収穫を得たい。",
      star: 2,
    },
    {
      id: "needs_1",
      title: "スライムを安全に排除したい",
      type: "needs",
      desc: "スライムを刺激して分裂させたりせず、安全な方法で退治したい。",
      star: 3,
    },
    {
      id: "needs_2",
      title: "作業の負担を減らしたい",
      type: "needs",
      desc: "毎晩見回りをする労力や、荒らされた畑を修復する手間をなくしたい。",
      star: 1,
    },
    {
      id: "needs_3",
      title: "スライムを資源として活用したい",
      type: "needs",
      desc: "ただの害獣ではなく、薬や肥料など、何かに役立てたい。",
      star: 3,
    },
    {
      id: "needs_4",
      title: "安心して眠りたい",
      type: "needs",
      desc: "夜中に畑が荒らされる心配をせず、ゆっくり休みたい。",
      star: 2,
    },
    {
      id: "seeds_0",
      title: "岩塩の結晶",
      type: "seeds",
      desc: "村の近くの洞窟で採れる、スライムに触れると一時的に固まらせる効果がある結晶。",
      star: 2,
    },
    {
      id: "seeds_1",
      title: "特定の植物",
      type: "seeds",
      desc: "畑の近くに自生している、スライムが嫌う強い匂いを発する植物。",
      star: 1,
    },
    {
      id: "seeds_2",
      title: "炎の魔法",
      type: "seeds",
      desc: "勇者が使える初級魔法。スライムの水分を蒸発させる効果がある。",
      star: 2,
    },
    {
      id: "seeds_3",
      title: "古い錬金術の知識",
      type: "seeds",
      desc: "村の図書館に眠る古文書に記された、スライムの体液を中和するレシピ。",
      star: 3,
    },
    {
      id: "seeds_4",
      title: "スライムの天敵",
      type: "seeds",
      desc: "スライムを捕食する習性を持つ、硬い甲羅を持つ巨大なカエル。",
      star: 2,
    },
    {
      id: "persona_0",
      title: "勇者リオン",
      type: "persona",
      desc: "正義感が強く、困っている人を助けることを使命とする。剣術と初歩的な魔法が使える。",
      star: 2,
    },
    {
      id: "persona_1",
      title: "農夫エルム",
      type: "persona",
      desc: "代々続く農家の青年。力仕事は得意だが、魔法や戦闘の知識はない。家族の生活を守ることに必死。",
      star: 1,
    },
    {
      id: "persona_2",
      title: "行商人ベラ",
      type: "persona",
      desc: "スライムの出る危険な道を往来する商人。戦闘を避け、安全かつ効率的に移動することを優先する。",
      star: 3,
    },
    {
      id: "persona_3",
      title: "賢者ゼノン",
      type: "persona",
      desc: "魔法や生態系に詳しい学者。スライムの生態を研究し、根本的な解決策を探求している。",
      star: 1,
    },
    {
      id: "persona_4",
      title: "村長ボルドー",
      type: "persona",
      desc: "村のリーダー。住民の安全と村の経済を安定させることが使命。費用対効果を重視する。",
      star: 1,
    },
    {
      id: "context_0",
      title: "スライムが畑を荒らす",
      type: "context",
      desc: "スライムが夜中に出没し、畑をめちゃくちゃにしてしまう。",
      star: 2,
    },
    {
      id: "context_1",
      title: "物理攻撃が効きにくい",
      type: "context",
      desc: "スライムは弾力のある体で、剣や槍などの物理攻撃をほとんど弾いてしまう。",
      star: 3,
    },
    {
      id: "context_2",
      title: "環境への悪影響",
      type: "context",
      desc: "むやみにスライムを倒すと、分解された体液が土壌を汚染し、作物が育たなくなる。",
      star: 3,
    },
    {
      id: "context_3",
      title: "水路が汚染されている",
      type: "context",
      desc: "スライムの体液で村の水路が汚染され、飲料水として使えなくなってきている。",
      star: 2,
    },
    {
      id: "context_4",
      title: "スライムの個体数が増加している",
      type: "context",
      desc: "数年前からスライムの個体数が異常に増え、対処が困難になっている。",
      star: 2,
    },
    {
      id: "problem_0",
      title: "農夫エルムは夜間の畑のスライムに悩んでいる",
      type: "problem",
      desc: "夜間に活動するスライムによって畑の作物が荒らされ、エルムは毎晩見回りを強いられている。",
      star: 1,
    },
    {
      id: "problem_1",
      title: "物理攻撃が効かないスライムの排除が困難",
      type: "problem",
      desc: "剣や槍といった一般的な武器が通じないため、スライムを効率的に倒す方法がない。",
      star: 1,
    },
    {
      id: "problem_2",
      title: "スライムの体液が環境を破壊する",
      type: "problem",
      desc: "スライムを倒すと土壌が汚染され、畑が使えなくなるという新たな問題が発生する。",
      star: 2,
    },
    {
      id: "problem_3",
      title: "スライムの発生源が不明",
      type: "problem",
      desc: "どこからスライムが現れるのか、なぜ個体数が増えたのかが分からず、根本的な解決策が立てられない。",
      star: 2,
    },
    {
      id: "problem_4",
      title: "村全体で統一された対策がない",
      type: "problem",
      desc: "各農夫がバラバラに対処しているため、村全体のスライム問題を解決できていない。",
      star: 3,
    },
    {
      id: "idea_0",
      title: "岩塩バリアの設置",
      type: "idea",
      desc: "畑の周囲に岩塩のブロックを並べ、スライムが嫌がる結界を作る。",
      star: 2,
    },
    {
      id: "idea_1",
      title: "天敵誘引作戦",
      type: "idea",
      desc: "スライムを食べるカエルを畑に放ち、自然の力で個体数を減らす。",
      star: 2,
    },
    {
      id: "idea_2",
      title: "塩水スプリンクラー",
      type: "idea",
      desc: "岩塩を溶かした水を畑に散布する装置を作り、夜間に自動でスライムを無力化する。",
      star: 3,
    },
    {
      id: "idea_3",
      title: "スライム結晶化魔法",
      type: "idea",
      desc: "スライムを倒すのではなく、無害な岩塩の結晶に変える魔法を開発する。",
      star: 2,
    },
    {
      id: "idea_4",
      title: "スライム忌避剤の開発",
      type: "idea",
      desc: "スライムが嫌う植物を元に、畑の土壌に混ぜることでスライムを寄せ付けない忌避剤を作る。",
      star: 2,
    },
  ],
  fragments: {
    needs: {
      name: "ニーズ",
      desc: "ユーザーが抱える課題や欲求",
    },
    seeds: {
      name: "シーズ",
      desc: "ユーザーの持つ技術や知識、資源",
    },
    persona: {
      name: "ペルソナ",
      desc: "具体化した仮想ユーザー像",
    },
    context: {
      name: "コンテクスト",
      desc: "ユーザーの具体的な状況や背景",
    },
    problem: {
      name: "プロブレム",
      desc: "ニーズとシーズ、ペルソナ、コンテキストが結合して生まれる解決すべき問題",
    },
    idea: {
      name: "アイデア",
      desc: "プロブレムを解決できるもの",
    },
  }
};
const operations = [
  {
    category: "operation",
    id: "0",
    data: {
      itemInfo: {
        name: "+",
        desc: "足します",
      },
    },
  },
  {
    category: "operation",
    id: "1",
    data: {
      itemInfo: {
        name: "-",
        desc: "引きます",
      },
    },
  },
  {
    category: "operation",
    id: "2",
    data: {
      itemInfo: {
        name: "×",
        desc: "掛けます",
      },
    },
  },
  {
    category: "operation",
    id: "3",
    data: {
      itemInfo: {
        name: "÷",
        desc: "割ります",
      },
    },
  },
  {
    category: "operation",
    id: "4",
    data: {
      itemInfo: {
        name: "=",
        desc: "等しくなります",
      },
    },
  },
  {
    category: "operation",
    id: "5",
    data: {
      itemInfo: {
        name: "(",
        desc: "左側です",
      },
    },
  },
  {
    category: "operation",
    id: "6",
    data: {
      itemInfo: {
        name: ")",
        desc: "右側です",
      },
    },
  },
];
const variables = [
  {
    category: "variable",
    id: "0",
    data: {
      itemInfo: {
        name: "x",
        desc: "変数です",
      },
    },
  },
  {
    category: "variable",
    id: "1",
    data: {
      itemInfo: {
        name: "y",
        desc: "変数です",
      },
    },
  },
];
const terms_test = [
  {
    category: "term",
    id: "0",
    data: {
      itemInfo: {
        type: "pains",
        name: "掃除中吸引力がすぐに落ちる",
        desc: "掃除機を使ってて、ゴミがたまるにつれて吸引力が落ちるのが嫌",
      },
      uploadInfo: {
        userId: "てすと",
        createdAt: Timestamp.fromDate(new Date("2025-07-16T10:00:00Z")),
      },
    },
  },
  {
    category: "term",
    id: "1",
    data: {
      itemInfo: {
        type: "pains",
        name: "掃除機のコードに引っかかる",
        desc: "ちょっと方向変えるだけで掃除機のコードに引っかかるのどうにかしてほしい",
      },
      uploadInfo: {
        userId: "b",
        createdAt: Timestamp.fromDate(new Date("2025-07-14T10:00:00Z")),
      },
    },
  },
  {
    category: "term",
    id: "2",
    data: {
      itemInfo: {
        type: "needs",
        name: "掃除をストレスなくやりたい",
        desc: "部屋はきれいになっても心はストレスであふれそうです",
      },
      uploadInfo: {
        userId: "c",
        createdAt: Timestamp.fromDate(new Date("2025-07-12T10:00:00Z")),
      },
    },
  },
  {
    category: "term",
    id: "3",
    data: {
      itemInfo: {
        type: "wants",
        name: "吸引力が持続するコードレス掃除機が欲しい",
        desc: "あるといいですよね",
      },
      uploadInfo: {
        userId: "d",
        createdAt: Timestamp.fromDate(new Date("2025-07-17T04:00:00Z")),
      },
    },
  },
  {
    category: "term",
    id: "4",
    data: {
      itemInfo: {
        type: "seeds",
        name: "サイクロン技術",
        desc: "遠心力を利用してゴミと空気を分離する仕組みです",
      },
      uploadInfo: {
        userId: "e",
        createdAt: Timestamp.fromDate(new Date("2025-07-12T02:00:00Z")),
      },
    },
  },
  {
    category: "term",
    id: "5",
    data: {
      itemInfo: {
        type: "seeds",
        name: "小型高出力モーター",
        desc: "ちっちゃいけどパワフルなモーターです",
      },
      uploadInfo: {
        userId: "f",
        createdAt: Timestamp.fromDate(new Date("2025-07-13T10:00:00Z")),
      },
    },
  },
  {
    category: "term",
    id: "6",
    data: {
      itemInfo: {
        type: "ideas",
        name: "コードレスクリーナー",
        desc: "サイクロン技術と小型モーター技術を用いた次世代の掃除機です。コードレスを実現しつつパワフルで持続する吸引力を提供します。",
      },
      uploadInfo: {
        userId: "g",
        createdAt: Timestamp.fromDate(new Date("2025-07-17T11:00:00Z")),
      },
    },
  },
];
const formulas_test = [
  {
    category: "fomula",
    id: "0",
    data: {
      itemInfo: {
        type: "equality",
        name: "次世代掃除機",
        desc: "コードレスを実現しつつ吸引力持続ほしい",
      },
      formulaInfo: [terms_test[0], operations[0], terms_test[1], operations[4], terms_test[3]],
      uploadInfo: {
        userId: "h",
        createdAt: Timestamp.fromDate(new Date("2025-07-17T13:00:00Z")),
      },
    },
  },
  {
    category: "fomula",
    id: "1",
    data: {
      itemInfo: {
        type: "equality",
        name: "次世代掃除機",
        desc: "サイクロン技術と小型高出力モーターで実現します",
      },
      formulaInfo: [
        terms_test[3],
        operations[2],
        operations[5],
        terms_test[4],
        operations[0],
        terms_test[5],
        operations[6],
        operations[4],
        terms_test[6],
      ],
      uploadInfo: {
        userId: "h",
        createdAt: Timestamp.fromDate(new Date("2025-07-17T14:00:00Z")),
      },
    },
  },
  {
    category: "fomula",
    id: "2",
    data: {
      itemInfo: {
        type: "equation",
        name: "次世代掃除機",
        desc: "何か足りない",
      },
      formulaInfo: [terms_test[3], operations[2], variables[0], operations[4], terms_test[6]],
      uploadInfo: {
        userId: "h",
        createdAt: Timestamp.fromDate(new Date("2025-07-17T14:00:00Z")),
      },
    },
  },
];

export { operations, terms_test, formulas_test };
