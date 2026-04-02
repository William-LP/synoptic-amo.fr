import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
    'drag-drop-content-types-strapi5': {
        enabled: true,
    },
});

export default config;
