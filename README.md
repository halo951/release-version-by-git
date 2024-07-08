# git release version

## About

generate public release version from git info. designed in accordance with semantic versioning

## Usage

in `vite.config.ts`

```typescript
import { getVersion } from 'release-version-by-git'
import { defineConfig, UserConfig } from 'vite'

export default defineConfig(async (env): Promise<UserConfig> => {
    const version = await getVersion()
    return {}
})
```

## Rules

1. if has git info, then generate version by git info and `package.json`
    1. style: `${major}.${minor}.${patch}-${branch}.${hash}`, `major`、 `minor`、`patch` from `pkg.version`
2. if don't has git info, then copy from `package.json` version.
