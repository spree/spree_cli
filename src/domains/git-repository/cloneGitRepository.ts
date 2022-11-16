import { CliUx } from '@oclif/core';
import * as fs from 'fs';
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';

type Options = {
  dir: string;
  gitRepositoryURL: string;
  gitRef: string;
};

/** Clones git repository to the project directory displaying a progress bar. */
const cloneGitRepository = async (options: Options): Promise<void> => {
  const { dir, gitRepositoryURL, gitRef } = options;

  const bar = CliUx.ux.progress({
    fps: 64,
    format: `Cloning ${options.gitRepositoryURL} | {bar} | {percentage}%`,
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591'
  });

  bar.start();

  await git.clone({
    fs,
    http,
    dir,
    url: gitRepositoryURL,
    ref: gitRef,
    singleBranch: true,
    onProgress(progress) {
      bar.update(progress.loaded);

      if (progress.total !== undefined) {
        bar.setTotal(progress.total);
      }
    }
  });

  bar.stop();
};

export default cloneGitRepository;
