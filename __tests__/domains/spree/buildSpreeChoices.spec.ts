import { buildSpreeChoices } from '../../../src/domains/spree';
import type { Spree, SpreeChoice } from '../../../src/domains/spree';
import { setupI18Next } from '../../../src/infrastructures/i18next';

describe('buildSpreeChoices | unit tests', () => {
  const templates: Spree[] = [
    {
      name: 'Spree 4.5 Dockerized',
      version: 'docker',
      recommendedForPlatforms: ['linux', 'windows']
    },
    {
      name: 'Spree 4.5 Hybrid',
      version: 'hybrid',
      recommendedForPlatforms: ['darwin']
    },
    {
      name: 'Spree 5.0 Beta',
      version: 'docker',
      beta: true
    }
  ];

  beforeAll(async () => {
    await setupI18Next();
  });

  it('prioritizes hybrid template when platform is darwin', () => {
    const options = {
      includeBeta: true,
      platform: 'darwin'
    };
    const result = buildSpreeChoices(templates, options);

    expect(result).toHaveLength(3);
    expect((result[0] as SpreeChoice).name).toEqual('Spree 4.5 Hybrid (Recommended)');
    expect((result[1] as SpreeChoice).name).toEqual('Spree 4.5 Dockerized');
    expect((result[2] as SpreeChoice).name).toEqual('Spree 5.0 Beta');
  });

  it('prioritizes docker template when platform is linux', () => {
    const options = {
      includeBeta: true,
      platform: 'linux'
    };
    const result = buildSpreeChoices(templates, options);

    expect(result).toHaveLength(3);
    expect((result[0] as SpreeChoice).name).toEqual('Spree 4.5 Dockerized (Recommended)');
    expect((result[1] as SpreeChoice).name).toEqual('Spree 4.5 Hybrid');
    expect((result[2] as SpreeChoice).name).toEqual('Spree 5.0 Beta');
  });

  it('removes beta from the results when filterBeta set to false', () => {
    const options = {
      includeBeta: false,
      platform: 'darwin'
    };
    const result = buildSpreeChoices(templates, options);

    expect(result).toHaveLength(2);
    expect((result[0] as SpreeChoice).name).toEqual('Spree 4.5 Hybrid (Recommended)');
    expect((result[1] as SpreeChoice).name).toEqual('Spree 4.5 Dockerized');
  });
});
