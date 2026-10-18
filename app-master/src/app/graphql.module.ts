import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {environment} from '../environments/environment';
import {onError} from 'apollo-link-error';
import {ToastService} from './shared/services/toast.service';
import {GraphqlErrorsService} from './hk-forms/state/graphql-errors/graphql-errors.service';
import {ApolloLink} from 'apollo-link';
import {createHttpLink} from 'apollo-link-http';

@NgModule({
  imports: [HttpClientModule],
  exports: [HttpClientModule, ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (
        toast: ToastService,
        graphqlErrors: GraphqlErrorsService,
      ) => {
        const httpApolloLink = createHttpLink();
        const endpointLink = new ApolloLink((operation, forward) => {
          operation.setContext({uri: environment.graphql});
          return forward(operation);
        });

        // const jwtAuth = setContext(async (_, {headers}) => {
        //   const token = await storage.get('token');
        //   return {
        //     headers: {
        //       ...headers,
        //       authorization: token ? `Bearer ${token}` : null,
        //     }
        //   };
        // });

        const errorLink = onError(({graphQLErrors, networkError, forward, operation, response}) => {
          // console.debug('gql error', {graphQLErrors, networkError, forward, operation, response});

          if (graphQLErrors) {
            graphQLErrors
              .map(({extensions}) => {
                if (extensions && ! extensions.validation) {
                  extensions = extensions.extensions;
                }

                try {
                  if (extensions && extensions.validation && extensions.validation.errors) {
                    const validationErrors = extensions.validation.errors;

                    graphqlErrors.setErrors(operation.operationName, validationErrors);

                    const firstErrorKey = Object.keys(validationErrors)[0];
                    toast.error(validationErrors[firstErrorKey][0].message);
                  }
                } catch (e) {
                  // console.debug('gql parse message exception', e);
                }
              });
          }

          if (networkError) {
            toast.error('No se pudo conectar con el servidor GraphQL configurado.');
            console.log(`[Network error]: ${networkError}`);
          }
        });

        return {
          link: ApolloLink.from([
            // jwtAuth,
            errorLink,
            endpointLink,
            httpApolloLink
          ]),
          cache: new InMemoryCache({}),
          defaultOptions: {
            watchQuery: {
              errorPolicy: 'all'
            },
            query: {
              errorPolicy: 'all',
            },
          }
        };
      },
      deps: [ToastService, GraphqlErrorsService],
    },
  ],
})
export class GraphQLModule { }
