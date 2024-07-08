import semver from 'semver'
import SimpleGit from 'simple-git'
import assert from 'assert'

import * as pkg from '../package.json'

const getGitInfo = async (): Promise<{ branch: string; hash: string } | undefined> => {
    try {
        const git = SimpleGit(process.cwd())
        const { current: branch } = await git.branch()
        const log = await git.log()
        assert(log.latest, '应该有 git log')
        const hash: string = log.latest.hash.slice(0, 4)
        return { branch, hash }
    } catch (error) {
        return undefined
    }
}
/** 生成版本号 */
const generateVersion = async (): Promise<string> => {
    const ver = semver.parse(pkg.version)!
    const { major, minor, patch } = ver
    if (process.env.CI_COMMIT_BRANCH && process.env.CI_COMMIT_SHORT_SHA) {
        const { CI_COMMIT_BRANCH, CI_COMMIT_SHORT_SHA } = process.env
        return `${major}.${minor}.${patch}-${CI_COMMIT_BRANCH}.${CI_COMMIT_SHORT_SHA}`
    }
    const info = await getGitInfo()
    if (info) {
        const { branch, hash } = info
        return `${major}.${minor}.${patch}-${branch}.${hash}`
    } else {
        return `${major}.${minor}.${patch}`
    }
}

/** 获取版本号 */
export const getVersion = async (): Promise<string> => {
    return await generateVersion()
}
