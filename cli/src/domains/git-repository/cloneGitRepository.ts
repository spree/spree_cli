import { CliUx } from '@oclif/core';
import * as fs from 'fs';
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';

type Options = {
  dir: string;
  gitRepositoryURL: string;
};

/** Clones git repository to the project directory displaying a progress bar. */
const cloneGitRepository = async (options: Options): Promise<void> => {
  const { dir, gitRepositoryURL } = options;

  const bar = CliUx.ux.progress({
    fps: 64,
    format: `Cloning ${options.gitRepositoryURL} | {bar} | {percentage}%`
  });

  bar.start();

  await git.clone({
    fs,
    http,
    dir,
    url: gitRepositoryURL,
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
