#!/usr/bin/env node
import * as program from 'commander';
import fetch from 'node-fetch'
import { introspectionQuery } from 'graphql/utilities/introspectionQuery';
import { Schema, Args, Field, Type } from './gqlSchemaType';
import { buildClientSchema } from 'graphql/utilities/buildClientSchema';
import { printSchema } from 'graphql/utilities/schemaPrinter';
import { createWriteStream } from 'fs';

const { version } = require('../package.json');

const command = program
  .version(version)
  .option('-u, --url [url]', 'url')
  .option('-h, --header [headers]', 'add header')
  .option('-f, --file [file]', 'file path')
  .parse(process.argv)

const headers = {
  'Content-Type': 'application/json',
  // [command.header.split('=')[0]]: command.header.split('=')[1]
};

async function main() {
  const response = await fetch(command.url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ query: introspectionQuery }),
  })

  const { data, errors } = await response.json()

  if (errors) console.error(errors);
  parseJsonSchema(data.__schema);
}

function parseJsonSchema(schema: Schema) {
  const text = `
  /* tslint:disable */
  // This file was automatically generated and should not be edited.

  ${schema.types.map(type => {
    switch (type.kind) {
      case 'OBJECT': {
        return convertObjectType(type)
      }
      case 'SCALAR': {
        return convertScalar(type);
      }
      case 'ENUM': {
        return convertEnum(type);
      }
      case 'INPUT_OBJECT': {
        return parseInputField(type);
      }
    }
  }).join(' ')}
`
  const file = createWriteStream(command.file);
  file.write(text);
  file.end();
}

function convertObjectType(type: Type) {
  return `
export interface ${type.name} {
${type.fields ? type.fields.map(field =>
    `
  ${field.name}${field.args && field.args.length ? `: (params: {${field.args.map(generateArgs).join('')}}) => ${field.type.name}` : generateNestedTypes(field as Args)}
`
  ).join(' ') : ''}
}
`
}

function convertScalar(type: Type) {
  return `
export type ${type.name} = ${SCALAR_TYPE[type.name]};

  `
}

function convertEnum(type: Type) {
  return `
export enum ${type.name} {
  ${type.enumValues.map(ev =>
    `${ev.description ? `// ${ev.description}` : ''}
    ${ev.name} = '${ev.name}'`
  )}
}
  `
}

function parseInputField(type: Type) {
  return `export interface ${type.name} {${type.inputFields.map(args => generateArgs(args)).join('')}}`
}

function generateArgs(args: Args) {
  return `${args.description ? `// ${args.description}` : ''}
  ${args.name} ${generateNestedTypes(args)}`;
}

function generateNestedTypes(args: Args) {
  switch (args.type.kind) {
    case 'NON_NULL': {
      if (args.type.ofType && args.type.ofType.kind === 'LIST') {
        return `: ${args.type.ofType.ofType.name}[];`;
      } else {
        return `: ${args.type.ofType.name};`;
      }
    }
    case 'LIST': {
      return `: ${args.type.ofType.name}[];`
    }
    default: {
      return `?: ${args.type.name};`
    }
  }
}

function deduceType(field: Field) {
  return `${field.type.kind === 'NON_NULL' ? '' : '?'}: ${field.type.kind === 'NON_NULL' ? field.type.ofType.name : field.type.name}; ${field.description ? `// ${field.description}` : ''}`
}

const SCALAR_TYPE = {
  ID: 'string',
  String: 'string',
  Boolean: 'boolean',
  DateTime: 'string',
  Int: 'number',
  Date: 'string',
  Float: 'number',
};

main().catch(e => console.log(e))
