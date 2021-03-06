import { GET_LIST, GET_ONE, CREATE, UPDATE } from 'ra-core';
import { ALL_TYPES } from 'ra-data-graphql';

import {buildSchema, introspectionFromSchema} from 'graphql';

const fs = require('fs');
const path = require('path');


export default () => {
    const options = {
        operationNames: {
            [GET_LIST]: resource => `allContacts`,
            [GET_ONE]: resource => `Contact`,
            [CREATE]: resource => `createContact`,
            [UPDATE]: resource => `updateContact`,
        }
    }

    const rawSchema = fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8',
    );

    const gqlSchema = buildSchema(rawSchema)
    const introspection = introspectionFromSchema(gqlSchema)
    const schema = introspection.__schema;

    const queries = schema.types.reduce((acc, type) => {
        if (
            type.name !== schema.queryType.name &&
            type.name !== schema.mutationType.name
        )
            return acc;

        return [...acc, ...type.fields];
    }, []);

    const types = schema.types.filter(
        type =>
            type.name !== schema.queryType.name &&
            type.name !== schema.mutationType.name
    );

    const isResource = type =>
        queries.some(
            query => query.name === options.operationNames[GET_LIST](type)
        ) &&
        queries.some(
            query => query.name === options.operationNames[GET_ONE](type)
        );

    const buildResource = type =>
        ALL_TYPES.reduce(
            (acc, aorFetchType) => ({
                ...acc,
                [aorFetchType]: queries.find(
                    query =>
                        options.operationNames[aorFetchType] &&
                        query.name ===
                        options.operationNames[aorFetchType](type)
                ),
            }),
            { type }
        );

    const potentialResources = types.filter(isResource);
    const filteredResources = potentialResources;
    const resources = filteredResources.map(buildResource);

    return {
        types,
        queries,
        resources,
        schema,
    };
};
