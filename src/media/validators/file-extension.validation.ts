import { Injectable, PipeTransform } from '@nestjs/common';
import { ALLOW_FILE_EXTENSION } from '../../common/constants/media/regex.constant';
import { ResourceConflictException } from '../../common/exceptions/conflict-resource.exception';

@Injectable()
export class FileExtensionValidationPipe implements PipeTransform {
  async transform(value: string): Promise<string> {
    const extension: string = value.split('.').pop();
    if (!ALLOW_FILE_EXTENSION.test(extension)) {
      throw new ResourceConflictException(
        'file extension',
        `file extension ${extension} is not supported!`
      );
    }

    return value;
  }
}
