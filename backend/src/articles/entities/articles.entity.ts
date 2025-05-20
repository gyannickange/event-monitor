import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['slug'])
export class Articles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb')
  source: { id: string; name: string; };

  @Column({ nullable: true })
  @Column()
  author: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  @Column()
  description: string;

  @Column({ nullable: true })
  @Column()
  url: string;

  @Column({ nullable: true })
  @Column()
  urlToImage: string;

  @Column()
  publishedAt: string;

  @Column()
  content: string;

  @Column({ default: 'world' })
  category: string;
}
