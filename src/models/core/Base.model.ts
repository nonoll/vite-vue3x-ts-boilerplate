export interface BaseModelImpl<T = unknown, U = unknown, V = unknown> {
  fromVo(vo: T, optional?: unknown | any): any | V;
  toVo(vo: unknown, optional?: unknown | any): U;
}

export abstract class BaseModel<T, U, V> implements BaseModelImpl<T, U, V> {
  /**
   * request 모델 관리
   * @protected
   * @type {U}
   * @memberof BaseModel
   */
  protected vo: U = {} as U;
  /**
   * 화면 렌더링 관련 모델 관리
   * @protected
   * @type {V}
   * @memberof BaseModel
   */
  protected viewModel: V = {} as V;

  constructor(vo?: T) {
    if (vo) {
      this.fromVo(vo);
    }
  }

  /**
   * response data 가공 시점
   * @abstract
   * @param {T} vo
   * @return {*}  {unknown}
   * @memberof BaseModel
   */
  abstract fromVo(vo: T, optional?: unknown | any): any;

  /**
   * request 데이터 기준, 모델 반환
   * @abstract
   * @param {unknown} vo
   * @return {*}  {U}
   * @memberof BaseModel
   */
  abstract toVo(payload: unknown, optional?: unknown | any): U;
}
