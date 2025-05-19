import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb')
  source: { id: string; name: string; };

  @Column()
  author: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column()
  urlToImage: string;

  @Column()
  publishedAt: string;

  @Column()
  content: string;

  @Column({ default: 'CRIME' })
  category: string;
}
