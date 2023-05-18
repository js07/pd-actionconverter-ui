const code = `  const config = {
    url: \`https://api.github.com/repos/\${params.owner}/\${params.repo}\`,
    headers: {
      Authorization: \`Bearer \${auths.github.oauth_access_token}\`,
    }
  }
  return await require("@pipedreamhq/platform").axios(this, config)`

const paramsSchema = `{
  "type": "object",
  "properties": {
    "owner": {
      "type": "string",
      "description": "Name of repository owner."
    },
    "repo": {
      "type": "string",
      "description": "Name of repository."
    }
  },
  "required": [
    "owner",
    "repo"
  ]
}`

export default {
  code,
  paramsSchema
}
