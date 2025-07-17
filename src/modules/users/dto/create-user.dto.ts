export class CreateUserDto {
  username: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  passwordHash: string;
}
