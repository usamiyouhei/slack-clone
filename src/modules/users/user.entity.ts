export class User{
  id!: string;
  name!: string;
  email!: string;
  thumbnailURL?: string;
  constructor(data: User) {
    Object.assign(this, data)
  }
}