import { GraphQLObjectType } from 'graphql';

import ApproveMutation from '../mutations/ApproveMutation';
import MintMutation from '../mutations/MintMutation';
import BurnMutation from '../mutations/BurnMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    approve: ApproveMutation,
    mint: MintMutation,
    burn: BurnMutation,
  },
});
