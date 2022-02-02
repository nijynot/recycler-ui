import { GraphQLObjectType } from 'graphql';

import ApproveMutation from '../mutations/ApproveMutation';
import MintMutation from '../mutations/MintMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    approve: ApproveMutation,
    mint: MintMutation,
  },
});
