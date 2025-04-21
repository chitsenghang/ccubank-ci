import {
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint({
  name: 'validateDuplicateIdInPageContentDto',
  async: false
})
export class ValidateDuplicateIdInPageContent
  implements ValidatorConstraintInterface
{
  private duplicates: number[] = [];

  validate(pageContentDto: any): boolean {
    if (!Array.isArray(pageContentDto)) {
      return false;
    }
    const ids: number[] = pageContentDto.map((dto) => dto.id);
    const checkIds = new Set<number>();
    this.duplicates = ids.filter((id): boolean => {
      if (checkIds.has(id)) {
        return true;
      }
      checkIds.add(id);
      return false;
    });

    return this.duplicates.length === 0;
  }

  defaultMessage(): string {
    return `Duplicate id ${this.duplicates} in page content`;
  }
}
