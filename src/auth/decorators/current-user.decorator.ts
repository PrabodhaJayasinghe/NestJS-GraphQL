import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(ctx); // GqlExecutionContext is a utility class that helps to extract the GraphQL-specific execution context from the generic ExecutionContext.
    const context = gqlContext.getContext<{ req: { user: any } }>();
    return context.req.user as { id: string; username: string; email: string };
  },
);
