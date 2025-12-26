export interface Card {
  id: number;
  title: string;
  description?: string;
  cost: number;
  fullDescription?: string;
  image?: string;
}

export class AmountCard {
  id!: number;
  title!: string;
  description!: string;
  fullDescription!: string;
  cost!: number;
  count!: number;
  image!: string;

  constructor(data: Partial<Card>) {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      fullDescription: data.fullDescription,
      cost: data.cost,
      count: 1,
      image: data.image,
    } as AmountCard;
  }
}
