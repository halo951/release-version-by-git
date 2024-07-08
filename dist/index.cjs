'use strict';

const semver = require('semver');
const SimpleGit = require('simple-git');
const assert = require('assert');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const semver__default = /*#__PURE__*/_interopDefaultCompat(semver);
const SimpleGit__default = /*#__PURE__*/_interopDefaultCompat(SimpleGit);
const assert__default = /*#__PURE__*/_interopDefaultCompat(assert);

const version = "1.0.0";

const getGitInfo = async () => {
  try {
    const git = SimpleGit__default(process.cwd());
    const { current: branch } = await git.branch();
    const log = await git.log();
    assert__default(log.latest, "\u5E94\u8BE5\u6709 git log");
    const hash = log.latest.hash.slice(0, 4);
    return { branch, hash };
  } catch (error) {
    return void 0;
  }
};
const generateVersion = async () => {
  const ver = semver__default.parse(version);
  const { major, minor, patch } = ver;
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

exports.getVersion = getVersion;
