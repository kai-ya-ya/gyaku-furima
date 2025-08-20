export enum type {
  NEEDS,
  SEEDS,
  PERSONA,
  CONTEXT,
  CHALLENGE,
  IDEA,
}

export enum star {
    STAR_1,
    STAR_2,
    STAR_3,
}

export class Fragment {
  id: string
  type: type
  title: string
  desc: string
  star: star

  constructor(id: string, type: type, title: string, desc: string, star: star) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.desc = desc;
    this.star = star;
  }
}
