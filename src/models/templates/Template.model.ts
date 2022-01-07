import { BaseModel } from '@/models/core';
import * as Types from './Template.types';

// eslint-disable-next-line prettier/prettier
export class Template extends BaseModel<Types.Vo, Types.ExportVo, Types.View> {
  // response 데이터 가공시 - sanitize prefix
  // static 은 경우에 따라 구성
  static sanitizeName(vo: Types.Vo): string {
    return vo.name;
  }

  // response data 가공 시점
  fromVo(vo: Types.Vo): Types.View {
    return {
      name: Template.sanitizeName(vo)
    }
  }

  // request 데이터 기준, 모델 반환
  toVo(): Types.ExportVo {
    throw new Error('Method not implemented.');
  }
}
