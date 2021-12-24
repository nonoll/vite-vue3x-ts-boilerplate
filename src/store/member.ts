import {getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';

import {PERMISSION_TYPES} from '@/constants/permission.constants';
import rootStore from '@/store';

@Module({dynamic: true, store: rootStore, namespaced: true, name: 'memberStore'})
class MemberStore extends VuexModule {
  userPermission: PERMISSION_TYPES = PERMISSION_TYPES.USER;

  @Mutation
  setPermission(permission: PERMISSION_TYPES) {
    this.userPermission = permission;
    // this.userPermission = this.userPermission | permission;
  }
}

export default getModule(MemberStore);
