import { Express } from 'express';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundException } from '../../common/exceptions';
import { ResourceConflictException } from '../../common/exceptions/conflict-resource.exception';

@Injectable()
export class MediaValidation {
  validationFileNotFound = (file: Express.Multer.File): void => {
    if (!file) {
      throw new ResourceNotFoundException(`Please add your attachment file(s)`);
    }
  };

  validateFileSize = (fileSize: number): number => {
    let defaultSize: number = 1;
    defaultSize = defaultSize * 1048576;
    if (fileSize > defaultSize) {
      throw new ResourceConflictException(
        'file size',
        'file size reached the limit!'
      );
    }
    return fileSize;
  };
}
