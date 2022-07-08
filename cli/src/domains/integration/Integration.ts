import type { Template } from '../module';

type Integration = Template & {
    preSpreeBuildScript?: string;
};

export default Integration;
