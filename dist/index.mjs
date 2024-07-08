import semver from 'semver';
import SimpleGit from 'simple-git';
import assert from 'assert';

const version = "1.0.1";

const getGitInfo = async () => {
  try {
    const git = SimpleGit(process.cwd());
    const { current: branch } = await git.branch();
    const log = await git.log();
    assert(log.latest, "\u5E94\u8BE5\u6709 git log");
    const hash = log.latest.hash.slice(0, 4);
    return { branch, hash };
  } catch (error) {
    return void 0;
  }
};
const generateVersion = async () => {
  const ver = semver.parse(version);
  const { major, minor, patch } = ver;
  if (process.env.CI_COMMIT_BRANCH && process.env.CI_COMMIT_SHORT_SHA) {
    const { CI_COMMIT_BRANCH, CI_COMMIT_SHORT_SHA } = process.env;
    return `${major}.${minor}.${patch}-${CI_COMMIT_BRANCH}.${CI_COMMIT_SHORT_SHA}`;
  }
  const info = await getGitInfo();
  if (info) {
    const { branch, hash } = info;
    return `${major}.${minor}.${patch}-${branch}.${hash}`;
  } else {
    return `${major}.${minor}.${patch}`;
  }
};
const getVersion = async () => {
  return await generateVersion();
};

export { getVersion };
