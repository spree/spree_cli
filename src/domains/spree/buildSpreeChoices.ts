import { t } from 'i18next';
import type { UserOptions, Spree, SpreeChoice } from '.';


const filterTemplates = (templates: Spree[], includeBeta: Boolean) => {
  if (includeBeta) return templates;

  return templates.filter((e) => !e.beta);
};

export const buildSpreeChoices = (templates: Spree[], options: UserOptions) => {
  const { includeBeta, platform } = options;
  const filteredTemplates = filterTemplates(templates, includeBeta);

  const choices = filteredTemplates.map((template) => ({
    name: template.name,
    value: template
  }));

  const recommendedChoiceIndex = choices.findIndex((e) => e.value.recommendedForPlatforms?.includes(platform));
  if (recommendedChoiceIndex !== -1) {
    const recommendedChoice = choices[recommendedChoiceIndex] as SpreeChoice;
    recommendedChoice.name += ` (${t('domain.spree.recommended')})`;
    choices.splice(recommendedChoiceIndex, 1);
    choices.unshift(recommendedChoice);
  }

  return choices;
};

export default buildSpreeChoices;
