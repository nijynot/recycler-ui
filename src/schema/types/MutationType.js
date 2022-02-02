import { GraphQLObjectType } from 'graphql';

import ApproveMutation from '../mutations/ApproveMutation';
import DepositMutation from '../mutations/DepositMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    approve: ApproveMutation,
    deposit: DepositMutation,
  },
});
