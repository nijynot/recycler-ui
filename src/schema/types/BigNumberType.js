import { BigNumber } from '@ethersproject/bignumber';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export default new GraphQLScalarType({
  name: 'BigNumber',
  serialize: (value) => {
    // return value.toString();
    return value;
  },
  parseValue: (value) => {
    return BigNumber.from(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.String) {
      return BigNumber.from(ast.value);
    } else {
      return null;
    }
  }
});
