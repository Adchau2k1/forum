import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss'

export default defineConfig({
    theme: {
        colors: {
            primary: '#22e1b9',
            textColor: '#333',
        },
        boxShadow: {
            pretty: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.01) 0px 3px 6px',
            full: 'rgba(67, 71, 85, 0.1) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em',
        },
    },
    presets: [presetUno(), presetAttributify(), presetIcons(), presetTypography()],
    transformers: [transformerDirectives(), transformerVariantGroup()],
})
