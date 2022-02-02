import { GraphQLObjectType } from 'graphql';

import ApproveMutation from '../mutations/ApproveMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    approve: ApproveMutation,
  },
});
