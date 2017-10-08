# gatsby-transformer-yaml-netlify

Parses YAML files. Supports a data layout that is compatible with netlify-cms.

## DEPRECATION WARNING

This behavior was [added to gatsby](https://github.com/gatsbyjs/gatsby/pull/2324).
If you cannot upgrade you can still use this plugin by installing it via npm or
cloning it into a `plugins/` folder as described in the [docs](https://www.gatsbyjs.org/docs/plugins/#locally-defined-plugins).

## Prerequisites

You must be using a version of node that supports object rest/spread (e.g v8.6.0).

## Install

`npm install --save gatsby-transformer-yaml-netlify@alpha`

## How to use

```javascript
// In your gatsby-config.js
plugins: [
  `gatsby-transformer-yaml-netlify`,
]
```

## Parsing algorithm

If you have a data layout like so:

```
data/
    takers/
        a-taker.yml  // value: a
        b-taker.yml  // value: b
    leavers/
        a-leaver.yml // value: a
        b-leaver.yml // value: b
```

Then four nodes will be created:

```javascript
[
  {
    value: 'a',
    type: 'TakersYaml'
  },
  {
    value: 'b',
    type: 'TakersYaml'
  },
  {
    value: 'a',
    type: 'LeaversYaml'
  },
  {
    value: 'b',
    type: 'LeaversYaml'
  }
]
```

## How to query

You'd be able to query your takers like:

```graphql
{
  allTakersYaml {
    edges {
      node {
        value
      }
    }
  }
}
```

And your leavers like:

```graphql
{
  allLeaversYaml {
    edges {
      node {
        value
      }
    }
  }
}
```
