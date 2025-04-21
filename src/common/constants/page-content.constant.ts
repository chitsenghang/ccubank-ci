import { PageContentTypeEnum } from '../enums/page-content-type.enum';
import { StandardBankingForeignExchangeDto } from '../../pagecontent/dto/contents/standard-banking-foreign-exchange.dto';
import { CompanyInformationDto } from '../../pagecontent/dto/contents/company-information.dto';

export const contentDtoMap: Record<PageContentTypeEnum, any> = {
  [PageContentTypeEnum.STANDARD_BANKING_FOREIGN_EXCHANGE]:
    StandardBankingForeignExchangeDto,
  [PageContentTypeEnum.COMPANY_INFORMATION]: CompanyInformationDto
};
const basePageContentApiDoc = {
  id: 1,
  languageId: 1,
  componentId: undefined,
  ordering: 1
};
export const pageContentApiDoc = {
  standardBankingForeignExchange: {
    value: {
      pageContentDto: [
        {
          ...basePageContentApiDoc,
          pageCode: PageContentTypeEnum.STANDARD_BANKING_FOREIGN_EXCHANGE,
          content: {
            currencyName: 'USD/KHR',
            cashRate: { ccuBuy: 4000, ccuSell: 4000 },
            noneCashRate: { ccuBuy: 4000, ccuSell: 4000 }
          }
        }
      ]
    }
  },
  companyInformation: {
    value: {
      pageContentDto: [
        {
          ...basePageContentApiDoc,
          pageCode: PageContentTypeEnum.COMPANY_INFORMATION,
          content: {
            offices: [
              {
                name: 'Head Office',
                location:
                  'No.15, Preah Monivong Blvd, Sangkat Boeung Trabek, Khan Chamkarmorn, Phnom Penh, Cambodia',
                mapURL: ''
              },
              {
                name: 'Prampir Meakkakra Branch',
                location:
                  'Khan Prampir Meakkakra, located at Building No. GS07 & 08, Preah Sihanouk Blvd., Phum 7, Sangkat Veal Vong, Khan Prampir Meakkakra, Phnom Penh, Cambodia.',
                mapURL: ''
              }
            ],
            socialMedias: [
              {
                name: 'facebook',
                logo: 'https://localhost/fb.png',
                link: 'https://facebook.com/ccu'
              },
              {
                name: 'telegram',
                logo: 'https://localhost/telegram.png',
                link: 'https://telgram.com/ccu'
              }
            ],
            contactInfo: {
              phone: '+855 23 900 777',
              email: 'info@ccubank.com.kh'
            },
            scanHere: 'https://localhost/scanHere.png',
            logoBigSize: 'https://localhost/logo.png',
            logoSmallSize: 'https://localhost/logo.png'
          }
        }
      ]
    }
  }
};
