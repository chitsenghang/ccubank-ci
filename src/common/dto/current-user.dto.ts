export class CurrentUserDto {
  id: number;

  username: string;

  email: string;

  phone: string;

  isActive: boolean;

  isSelfService: boolean;

  permissions: string[];
}
