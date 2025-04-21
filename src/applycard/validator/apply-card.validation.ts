import { SubCardTypeEnum } from '../enum/card-type.enum';
import { ResourceNotFoundException } from '../../common/exceptions';

export const applyCardValidation = (
  subCardType: SubCardTypeEnum,
  alreadyHaveAccount: boolean,
  enterAccountLinkWithCard: string
): void => {
  const isDebitCard: boolean = subCardType === SubCardTypeEnum.DEBIT;
  const missingAccountLink: boolean = !enterAccountLinkWithCard?.trim();
  if (isDebitCard && alreadyHaveAccount && missingAccountLink) {
    throw new ResourceNotFoundException(
      'Account link is required applying for a debit card.'
    );
  }
};
